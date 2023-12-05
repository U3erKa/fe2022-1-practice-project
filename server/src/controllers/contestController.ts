import type { RequestHandler } from 'express';
import _sendEmail from '../email';
import ServerError from '../errors/ServerError';
import * as contestQueries from './queries/contestQueries';
import * as controller from '../socketInit';
import * as CONSTANTS from '../constants';
import type { Offer as _Offer, User as _User } from '../types/models';

export const downloadFile: RequestHandler = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
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
