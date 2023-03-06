import * as JWTService from '../services/jwtService';
import { RefreshToken } from '../models';
import TokenError from '../errors/TokenError';

import type { RequestHandler } from 'express';

export const checkAccessToken: RequestHandler = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;

    const [tokenType, accessToken] = authorization?.split(' ') ?? [];

    if (!accessToken) {
      return next(new TokenError('Access token is missing'));
    }

    (req.tokenData as any) = await JWTService.verifyAccessToken(accessToken);

    next();
  } catch (error) {
    next(error);
  }
};

export const checkRefreshToken: RequestHandler = async (req, res, next) => {
  try {
    const {
      body: { refreshToken },
    } = req;

    await JWTService.verifyRefreshToken(refreshToken);

    const refreshTokenInstance = await RefreshToken.findOne({
      where: {
        token: refreshToken,
      },
    });

    if (!refreshTokenInstance) {
      return next(new TokenError('Invalid refresh token'));
    }

    req.refreshTokenInstance = refreshTokenInstance;

    next();
  } catch (error) {
    next(error);
  }
};