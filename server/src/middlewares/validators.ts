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

export const validateContestCreation: RequestHandler = (req, res, next) => {
  const promiseArray = [];
  req.body.contests.forEach((el) => {
    promiseArray.push(schems.contestSchem.isValid(el));
  });
  return Promise.all(promiseArray)
    .then((results) => {
      results.forEach((result) => {
        if (!result) {
          return next(new BadRequestError());
        }
      });
      next();
    })
    .catch((err) => {
      next(err);
    });
};
