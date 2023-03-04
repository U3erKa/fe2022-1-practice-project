import * as AuthService from '../services/authService';
import { User } from '../models';
import UserNotFoundError from '../errors/UserNotFoundError';

import type { RequestHandler } from 'express';

export const login: RequestHandler = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    const user = await User.findOne({ where: { email } });

    if (!user || !user.comparePassword(password)) {
      return next(new UserNotFoundError('Invalid login data'));
    }

    const responseData = await AuthService.createSession(user);

    res.send(responseData);
  } catch (error) {
    next(error);
  }
};

export const registration: RequestHandler = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    const responseData = await AuthService.createSession(user);

    res.status(201).send(responseData);
  } catch (error) {
    next(error);
  }
};

export const refresh: RequestHandler = async (req, res, next) => {
  try {
    const { refreshTokenInstance } = req;

    const responseData = await AuthService.refreshSession(refreshTokenInstance);

    res.send(responseData);
  } catch (error) {
    next(error);
  }
};
