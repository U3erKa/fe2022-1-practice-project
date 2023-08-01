import { Op } from 'sequelize';
import {
  Select,
  Sequelize,
  Rating,
  Contest,
  Offer,
  User,
  sequelize,
} from '../models';
import ServerError from '../errors/ServerError';
import NotFoundError from '../errors/NotFoundError';
import RightsError from '../errors/RightsError';
import ApplicationError from '../errors/ApplicationError';
import * as contestQueries from './queries/contestQueries';
import * as userQueries from './queries/userQueries';
import * as controller from '../socketInit';
import * as UtilFunctions from '../utils/functions';
import * as CONSTANTS from '../constants';
import type { RequestHandler } from 'express';
import type { Offer as _Offer } from '../types/models';

export const dataForContest: RequestHandler = async (req, res, next) => {
  const {
    body: { characteristic1, characteristic2 },
  } = req;
  const response = {};

  try {
    const types = [characteristic1, characteristic2, 'industry'].filter(
      Boolean,
    );

    const characteristics = await Select.findAll({
      where: {
        type: {
          [Sequelize.Op.or]: types,
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

export const getContestById: RequestHandler = async (req, res, next) => {
  const {
    tokenData,
    params: { contestId },
  } = req;

  try {
    const contests = await Contest.findOne({
      where: { id: contestId },
      order: [[Offer, 'id', 'asc']],
      include: [
        {
          model: User,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken'],
          },
        },
        {
          model: Offer,
          required: false,
          where:
            tokenData.role === CONSTANTS.CREATOR
              ? { userId: tokenData.userId }
              : {
                  status: {
                    [Op.and]: [
                      { [Op.ne]: CONSTANTS.OFFER_STATUS_PENDING },
                      { [Op.ne]: CONSTANTS.OFFER_STATUS_DISCARDED },
                    ],
                  },
                },
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: User,
              required: true,
              attributes: {
                exclude: ['password', 'role', 'balance', 'accessToken'],
              },
            },
            {
              model: Rating,
              required: false,
              where: { userId: tokenData.userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });

    if (!contests) {
      return next(new NotFoundError('Contests not found'));
    }

    const contestInfo = contests.get({ plain: true });
    // @ts-expect-error
    contestInfo.Offers.forEach((offer) => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    res.send(contestInfo);
  } catch (e) {
    console.log(e);
    next(new ServerError(JSON.stringify(e)));
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
    // @ts-ignore
    delete result.contestId;
    // @ts-ignore
    delete result.userId;
    controller.getNotificationController().emitEntryCreated(customerId);
    const User = Object.assign({}, tokenData, { id: tokenData.userId });
    res.send(Object.assign({}, result, { User }));
  } catch (e) {
    return next(new ServerError());
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
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
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction,
) => {
  const finishedContest = await contestQueries.updateContestStatus(
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
      // prettier-ignore
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
    body: { command, offerId, creatorId, contestId, orderId, priority },
  } = req;
  if (command === 'reject') {
    try {
      const offer = await rejectOffer(offerId, creatorId, contestId);
      res.send(offer);
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
      res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  }
};

export const getContests: RequestHandler = async (req, res, next) => {
  const {
    tokenData,
    headers: { status },
    query: {
      offset: _offset,
      limit: _limit,
      typeIndex,
      contestId,
      industry,
      awardSort,
      ownEntries: _ownEntries,
    },
  } = req;
  const ownEntries = _ownEntries === 'true';
  const offset = +_offset! ?? 0;
  const limit = +_limit! ?? 0;

  try {
    let predicates: ReturnType<
      | typeof UtilFunctions.createWhereForAllContests
      | typeof UtilFunctions.createWhereForCustomerContests
    >;
    let isRequiredOffer: boolean;
    const offerFilter = {};

    switch (tokenData.role) {
      case CONSTANTS.CREATOR: {
        const sellerParams = {
          typeIndex,
          contestId,
          industry,
          awardSort,
        };

        predicates = UtilFunctions.createWhereForAllContests(sellerParams);
        isRequiredOffer = ownEntries;
        Object.assign(offerFilter, { userId: tokenData.userId });
        break;
      }
      case CONSTANTS.CUSTOMER: {
        const buyerParams = {
          status,
          userId: tokenData.userId,
        };

        predicates = UtilFunctions.createWhereForCustomerContests(buyerParams);
        isRequiredOffer = false;
        break;
      }

      default: {
        next(new RightsError());
      }
    }

    const contests = await Contest.findAll({
      where: predicates!.where,
      order: predicates!.order,
      limit,
      offset,
      include: [
        {
          model: Offer,
          required: isRequiredOffer!,
          where: offerFilter,
          attributes: ['id'],
        },
      ],
    });

    const contestsCount = (await Contest.count({
      where: predicates!.where,
      // @ts-expect-error
      order: predicates!.order,
      offset,
    })) as unknown as number;

    contests.forEach(
      (contest) =>
        // @ts-expect-error
        (contest.dataValues.count = contest.dataValues.Offers.length),
    );
    const haveMore = contestsCount > +offset + contests.length;

    res.send({ contests, haveMore });
  } catch (error) {
    next(new ServerError((error as Error).message));
  }
};

export const getOffers: RequestHandler = async (req, res, next) => {
  try {
    const {
      tokenData,
      query: { offset: _offset, limit: _limit },
    } = req;
    const offset = +_offset! ?? 0;
    const limit = +_limit! ?? 0;

    const offers = await Offer.findAll({ limit, offset });

    if (!offers.length) {
      throw new NotFoundError('Offers not found');
    }
    res.send(offers);
  } catch (error) {
    if (error instanceof ApplicationError) {
      return next(error);
    }
    next(new ServerError((error as any)?.message ?? 'Could not get offers'));
  }
};
