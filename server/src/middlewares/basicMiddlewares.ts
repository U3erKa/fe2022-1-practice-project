import { Contest, Sequelize } from '../models';
import RightsError from '../errors/RightsError';
import ServerError from '../errors/ServerError';
import NotFoundError from '../errors/NotFoundError';
import * as CONSTANTS from '../constants';

import type { RequestHandler } from 'express';
import type { Contest as _Contest } from '../types/models';

export const parseBody: RequestHandler = (req, res, next) => {
  let {
    body: { contests },
    files,
  } = req;
  contests = JSON.parse(contests);
  for (let i = 0; i < contests.length; i++) {
    if (contests[i].haveFile) {
      const file = files!.splice(0, 1);
      contests[i].fileName = file[0].filename;
      contests[i].originalFileName = file[0].originalname;
    }
  }
  next();
};

export const canGetContest: RequestHandler = async (req, res, next) => {
  const {
    tokenData,
    params: { contestId },
  } = req;

  let result: _Contest | null = null;
  try {
    switch (tokenData.role) {
      case CONSTANTS.CUSTOMER: {
        result = await Contest.findOne({
          where: { id: contestId, userId: tokenData.userId },
        });
        break;
      }
      case CONSTANTS.CREATOR: {
        result = await Contest.findOne({
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
      default: {
        return next(new RightsError());
      }
    }

    next();
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
