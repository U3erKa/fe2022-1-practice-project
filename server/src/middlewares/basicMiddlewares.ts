import { Contest, Sequelize } from '../models';
import RightsError from '../errors/RightsError';
import ServerError from '../errors/ServerError';
import NotFoundError from '../errors/NotFoundError';
import * as CONSTANTS from '../constants';

import type { RequestHandler } from 'express';
import type { Contest as _Contest } from '../types/models';

export const parseBody: RequestHandler = (req, res, next) => {
  req.body.contests = JSON.parse(req.body.contests);
  let {
    files,
    body: { contests },
  } = req;

  (contests as any[]).forEach((contest) => {
    if (contest.haveFile) {
      const [file] = (files as Express.Multer.File[]).splice(0, 1);
      contest.fileName = file.filename;
      contest.originalFileName = file.originalname;
    }
  });

  next();
};

export const canGetContest: RequestHandler = async (req, res, next) => {
  const {
    tokenData,
    params: { contestId },
  } = req;
  const err = new RightsError();

  let result: number | boolean = [
    CONSTANTS.CUSTOMER,
    CONSTANTS.CREATOR,
  ].includes(tokenData.role);
  if (!result) {
    return next(err);
  }

  try {
    switch (tokenData.role) {
      case CONSTANTS.CUSTOMER: {
        result = await Contest.count({
          where: { id: contestId, userId: tokenData.userId },
        });
        break;
      }
      case CONSTANTS.CREATOR: {
        result = await Contest.count({
          where: {
            id: contestId,
            status: {
              [Sequelize.Op.or]: [
                CONSTANTS.CONTEST_STATUS_ACTIVE,
                CONSTANTS.CONTEST_STATUS_FINISHED,
              ],
            },
          },
        });
        break;
      }
    }

    result ? next() : next(err);
  } catch (e) {
    next(new ServerError((e as Error).message));
  }
};

export const onlyForCreative: RequestHandler = (req, res, next) => {
  if (req.tokenData.role !== CONSTANTS.CREATOR) {
    next(new RightsError());
  } else {
    next();
  }
};

export const onlyForCustomer: RequestHandler = (req, res, next) => {
  if (req.tokenData.role !== CONSTANTS.CUSTOMER) {
    return next(new RightsError('This page is only for customers'));
  } else {
    next();
  }
};

export const onlyForModerator: RequestHandler = (req, res, next) => {
  if (req.tokenData.role !== CONSTANTS.MODERATOR) {
    return next(new RightsError('This page is only for moderators'));
  } else {
    next();
  }
};

export const canSendOffer: RequestHandler = async (req, res, next) => {
  if (req.tokenData.role !== CONSTANTS.CREATOR) {
    return next(new RightsError());
  }
  try {
    const result = await Contest.findOne({
      where: {
        id: req.body.contestId,
      },
      attributes: ['status'],
    });

    if (!result) {
      return next(new NotFoundError('Contest not found'));
    }
    if (
      !(result.get({ plain: true }).status === CONSTANTS.CONTEST_STATUS_ACTIVE)
    ) {
      return next(new RightsError());
    }

    next();
  } catch (e) {
    next(new ServerError());
  }
};

export const onlyForCustomerWhoCreateContest: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const result = await Contest.findOne({
      where: {
        userId: req.tokenData.userId,
        id: req.body.contestId,
        status: CONSTANTS.CONTEST_STATUS_ACTIVE,
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};

export const canUpdateContest: RequestHandler = async (req, res, next) => {
  try {
    const result = Contest.findOne({
      where: {
        userId: req.tokenData.userId,
        id: req.body.contestId,
        status: { [Sequelize.Op.not]: CONSTANTS.CONTEST_STATUS_FINISHED },
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};
