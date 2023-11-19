import * as AuthService from '../services/authService';
import type { RequestHandler } from 'express';

export const refresh: RequestHandler = async (req, res, next) => {
  try {
    const { refreshTokenInstance } = req;

    const responseData = await AuthService.refreshSession(refreshTokenInstance);

    res.send(responseData);
  } catch (error) {
    next(error);
  }
};
