import {
  type Attributes,
  Op,
  type Transaction,
  type WhereOptions,
} from 'sequelize';
import type { RequestHandler } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Contest, Offer, Rating, Select, User, sequelize } from '../models';
import _sendEmail from '../email';
import ServerError from '../errors/ServerError';
import NotFoundError from '../errors/NotFoundError';
import RightsError from '../errors/RightsError';
import BadRequestError from '../errors/BadRequestError';
import ApplicationError from '../errors/ApplicationError';
import * as contestQueries from './queries/contestQueries';
import * as userQueries from './queries/userQueries';
import * as controller from '../socketInit';
import * as UtilFunctions from '../utils/functions';
import * as CONSTANTS from '../constants';
import type { Offer as _Offer, User as _User } from '../types/models';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const dataForContest: RequestHandler = async (req, res, next) => {
  const {
    body: { characteristic1, characteristic2 },
  } = req;
  const response: Record<string, string[]> = {};

  try {
    const types = [characteristic1, characteristic2, 'industry'].filter(
      Boolean,
    );

    const characteristics = await Select.findAll({
      where: {
        type: {
          [Op.or]: types,
        },
      },
    });
    if (!characteristics) {
      return next(new ServerError());
    }
    characteristics.forEach((characteristic) => {
      if (!response[characteristic.type]) {
        response[characteristic.type] = [];
      }
      response[characteristic.type].push(characteristic.describe);
    });
    res.send(response);
  } catch (err) {
    next(new ServerError('cannot get contest preferences'));
  }
};

export const downloadFile: RequestHandler = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
};

export const updateContest: RequestHandler = async (req, res, next) => {
  const {
    tokenData,
    file,
    body,
    params: { contestId },
  } = req;

  if (file) {
    body.fileName = file.filename;
    body.originalFileName = file.originalname;
  }
  try {
    const updatedContest = await contestQueries.updateContest(body, {
      id: contestId,
      userId: tokenData.userId,
    });
    res.send(updatedContest);
  } catch (e) {
    next(e);
  }
};

export const setNewOffer: RequestHandler = async (req, res, next) => {
  const {
    tokenData,
    file,
    body: { contestType, offerData, contestId, customerId },
  } = req;
  const obj: { [key: string]: unknown } = {};

  if (contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = file?.filename;
    obj.originalFileName = file?.originalname;
  } else {
    obj.text = offerData;
  }
  obj.userId = tokenData.userId;
  obj.contestId = contestId;

  try {
    const result = await contestQueries.createOffer(obj);
    // @ts-expect-error
    delete result.contestId;
    // @ts-expect-error
    delete result.userId;
    controller.getNotificationController().emitEntryCreated(customerId);
    const User = Object.assign({}, tokenData, { id: tokenData.userId });
    res.send(Object.assign({}, result, { User }));
  } catch (e) {
    return next(new ServerError());
  }
};

const rejectOffer = async (
  offerId: number,
  creatorId: number,
  contestId: number,
) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED },
    { id: offerId },
  );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Some of yours offers was rejected',
      contestId,
    );
  return rejectedOffer;
};

const resolveOffer = async (
  contestId: number,
  creatorId: number,
  orderId: number,
  offerId: number,
  priority: number,
  transaction: Transaction,
) => {
  const finishedContest = await contestQueries.updateContest(
    {
      status: sequelize.literal(`
CASE
  WHEN "id"=${contestId} AND "orderId"='${orderId}'
  THEN '${CONSTANTS.CONTEST_STATUS_FINISHED}'
  WHEN "orderId"='${orderId}' AND "priority"=${priority + 1}
  THEN '${CONSTANTS.CONTEST_STATUS_ACTIVE}'
  ELSE '${CONSTANTS.CONTEST_STATUS_PENDING}'
END
      `),
    },
    { orderId },
    transaction,
  );
  await userQueries.updateUser(
    { balance: sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId,
    transaction,
  );
  const updatedOffers = await contestQueries.updateOfferStatus(
    {
      status: sequelize.literal(`
CASE
  WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS_WON}'
  WHEN "status"=${CONSTANTS.OFFER_STATUS_APPROVED} THEN '${CONSTANTS.OFFER_STATUS_REJECTED}'
  ELSE '${CONSTANTS.OFFER_STATUS_DISCARDED}'
END
      `),
    },
    {
      contestId,
    },
    transaction,
  );
  transaction.commit();

  const arrayRoomsId: unknown[] = [];
  updatedOffers.forEach((offer) => {
    if (
      offer.status === CONSTANTS.OFFER_STATUS_REJECTED &&
      creatorId !== offer.userId
    ) {
      arrayRoomsId.push(offer.userId);
    }
  });
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, 'Some of your offers WIN', contestId);
  return updatedOffers[0].dataValues;
};

export const setOfferStatus: RequestHandler = async (req, res, next) => {
  const {
    tokenData: { role },
    body: { command, offerId, creatorId, contestId, orderId, priority },
  } = req;

  if (role === 'customer') {
    if (command === 'reject') {
      try {
        const offer = await rejectOffer(offerId, creatorId, contestId);
        return res.send(offer);
      } catch (err) {
        next(err);
      }
    }
    const transaction = await sequelize.transaction();

    if (command === 'resolve') {
      try {
        const winningOffer = await resolveOffer(
          contestId,
          creatorId,
          orderId,
          offerId,
          priority,
          transaction,
        );
        return res.send(winningOffer);
      } catch (err) {
        transaction.rollback();
        next(err);
      }
    }
  } else if (role === 'moderator') {
    let offer: _Offer;
    if (command === 'approve') {
      try {
        const [_offer] = await contestQueries.updateOfferStatus(
          { status: CONSTANTS.OFFER_STATUS_APPROVED },
          { id: offerId },
        );
        offer = _offer;
        res.send(offer);
      } catch (error) {
        return next(error);
      }
    } else if (command === 'discard') {
      try {
        const [_offer] = await contestQueries.updateOfferStatus(
          { status: CONSTANTS.OFFER_STATUS_DISCARDED },
          { id: offerId },
        );
        offer = _offer;
        res.send(offer);
      } catch (error) {
        return next(error);
      }
    } else {
      return next(new BadRequestError('Invalid command'));
    }

    try {
      const sendEmail = await _sendEmail;
      const user = (await offer.getUser()) as unknown as _User;
      const fullName = `${user.firstName} ${user.lastName}`;
      const offerText = offer.text ?? (offer.originalFileName as string);
      const action =
        command === 'approve'
          ? 'approved it. The offer is visible to customers now!'
          : 'discarded it. Please send appropriate offer next time.';

      const email = await fs.readFile(
        path.resolve(__dirname, '../email/moderatedCreatorOffer.html'),
        'utf8',
      );
      const html = email
        .replaceAll('{{command}}', command)
        .replaceAll('{{fullName}}', fullName)
        .replaceAll('{{offer}}', offerText)
        .replaceAll('{{action}}', action);

      return sendEmail({
        to: `"${fullName}" <${user.email}>`,
        subject: `We decided to ${command} your offer`,
        text: `Hello ${fullName}!
You have sent offer "${offerText}". Our moderator reviewed it and ${action}
Sincerely,
Squadhelp team.`,
        html,
      });
    } catch (error) {
      console.log(error);
    }
  }

  next(new BadRequestError('Invalid command'));
};

export const getOffers: RequestHandler = async (req, res, next) => {
  try {
    const {
      query: { offset: _offset, limit: _limit, isReviewed: _isReviewed },
    } = req;
    const offset = +(_offset ?? 0);
    const limit = +(_limit ?? 8);
    const isReviewed = _isReviewed === 'true';

    const where: WhereOptions<Attributes<_Offer>> = {
      [Op.or]: isReviewed
        ? [
            { status: 'approved' },
            { status: 'discarded' },
            { status: 'won' },
            { status: 'rejected' },
          ]
        : [{ status: 'pending' }],
    };

    const offers = await Offer.findAll({
      limit,
      offset,
      where,
      include: [
        {
          model: Contest,
          required: true,
          attributes: ['contestType'],
        },
        {
          model: User,
          required: true,
          attributes: { exclude: ['password', 'accessToken'] },
        },
      ],
    });

    if (!offers.length) {
      throw new NotFoundError('Offers not found');
    }
    const offersCount = await Offer.count({ where });
    const haveMore = offersCount > offset + offers.length;

    offers.forEach((offer) => {
      // @ts-expect-error
      Object.assign(offer.dataValues, offer.Contest.dataValues);
      // @ts-expect-error
      delete offer.Contest.dataValues;
    });
    res.send({ offers, haveMore });
  } catch (error) {
    if (error instanceof ApplicationError) {
      return next(error);
    }
    next(new ServerError((error as any)?.message ?? 'Could not get offers'));
  }
};
