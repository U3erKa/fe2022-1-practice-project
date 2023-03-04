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
import RightsError from '../errors/RightsError';
import * as contestQueries from './queries/contestQueries';
import * as userQueries from './queries/userQueries';
import * as controller from '../socketInit';
import * as UtilFunctions from '../utils/functions';
import * as CONSTANTS from '../constants';

import type { RequestHandler } from 'express';

export const dataForContest: RequestHandler = async (req, res, next) => {
  const response = {};
  try {
    const {
      body: { characteristic1, characteristic2 },
    } = req;
    console.log(req.body, characteristic1, characteristic2);
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
    console.log(err);
    next(new ServerError('cannot get contest preferences'));
  }
};

/** @type {import('express').RequestHandler} */
export const getContestById = async (
  /** @type {import('express').Request & {tokenData: any}} */ req,
  res,
  next,
) => {
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
              : {},
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

    const contestInfo = contests.get({ plain: true });
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

/** @type {import('express').RequestHandler} */
export const updateContest = async (
  /** @type {import('express').Request & {tokenData: any}} */ req,
  res,
  next,
) => {
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
  const obj = {};
  if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = req.file.filename;
    obj.originalFileName = req.file.originalname;
  } else {
    obj.text = req.body.offerData;
  }
  obj.userId = req.tokenData.userId;
  obj.contestId = req.body.contestId;
  try {
    const result = await contestQueries.createOffer(obj);
    delete result.contestId;
    delete result.userId;
    controller
      .getNotificationController()
      .emitEntryCreated(req.body.customerId);
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });
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
      'Someone of yours offers was rejected',
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
      status: sequelize.literal(`   CASE
            WHEN "id"=${contestId}  AND "orderId"='${orderId}' THEN '${
        CONSTANTS.CONTEST_STATUS_FINISHED
      }'
            WHEN "orderId"='${orderId}' AND "priority"=${priority + 1}  THEN '${
        CONSTANTS.CONTEST_STATUS_ACTIVE
      }'
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
      status: sequelize.literal(` CASE
            WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS_WON}'
            ELSE '${CONSTANTS.OFFER_STATUS_REJECTED}'
            END
    `),
    },
    {
      contestId,
    },
    transaction,
  );
  transaction.commit();
  const arrayRoomsId = [];
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
    .emitChangeOfferStatus(
      arrayRoomsId,
      'Someone of yours offers was rejected',
      contestId,
    );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, 'Someone of your offers WIN', contestId);
  return updatedOffers[0].dataValues;
};

export const setOfferStatus: RequestHandler = async (req, res, next) => {
  let transaction;
  if (req.body.command === 'reject') {
    try {
      const offer = await rejectOffer(
        req.body.offerId,
        req.body.creatorId,
        req.body.contestId,
      );
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (req.body.command === 'resolve') {
    try {
      transaction = await sequelize.transaction();
      const winningOffer = await resolveOffer(
        req.body.contestId,
        req.body.creatorId,
        req.body.orderId,
        req.body.offerId,
        req.body.priority,
        transaction,
      );
      res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  }
};

/** @type {import('express').RequestHandler} */
export const getContests = async (
  /** @type {import('express').Request & {tokenData: any}} */ req,
  res,
  next,
) => {
  const {
    tokenData,
    headers: { status },
    query: {
      offset: _offset,
      limit,
      typeIndex,
      contestId,
      industry,
      awardSort,
      ownEntries: _ownEntries,
    },
  } = req;
  const ownEntries = _ownEntries === 'true';
  const offset = +_offset || 0;

  try {
    let predicates;
    let isRequiredOffer;
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
      where: predicates.where,
      order: predicates.order,
      limit,
      offset,
      include: [
        {
          model: Offer,
          required: isRequiredOffer,
          where: offerFilter,
          attributes: ['id'],
        },
      ],
    });

    const contestsCount = await Contest.count({
      where: predicates.where,
      order: predicates.order,
      offset,
    });

    contests.forEach(
      (contest) =>
        (contest.dataValues.count = contest.dataValues.Offers.length),
    );
    const haveMore = contestsCount > +offset + contests.length;

    res.send({ contests, haveMore });
  } catch (error) {
    next(new ServerError(error.message));
  }
};
