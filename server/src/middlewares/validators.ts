import * as schems from '../validationSchemes/schems';
import BadRequestError from '../errors/BadRequestError';

import type { RequestHandler } from 'express';

export const validateRegistrationData: RequestHandler = async (
  req,
  res,
  next,
) => {
  const validationResult = await schems.registrationSchem.isValid(req.body);
  if (!validationResult) {
    return next(new BadRequestError('Invalid data for registration'));
  } else {
    next();
  }
};

export const validateLogin: RequestHandler = async (req, res, next) => {
  const validationResult = await schems.loginSchem.isValid(req.body);
  if (validationResult) {
    next();
  } else {
    return next(new BadRequestError('Invalid data for login'));
  }
};

export const validateContestCreation: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const promiseArray: Promise<boolean>[] = req.body.contests.map((el) =>
      schems.contestSchem.isValid(el),
    );
    const results = await Promise.all(promiseArray);
    if (results.includes(false)) {
      return next(new BadRequestError('Invalid contest creation data'));
    }
    next();
  } catch (err) {
    next(err);
  }
};

export const validateEvent: RequestHandler = async (req, res, next) => {
  const validationResult = await schems.eventSchem.isValid(req.body);
  if (validationResult) {
    next();
  } else {
    return next(new BadRequestError('Invalid event data'));
  }
};
