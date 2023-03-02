const JWTService = require('../services/jwtService');
const { RefreshToken } = require('../models');
const TokenError = require('../errors/TokenError');

module.exports.checkAccessToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;

    const [tokenType, accessToken] = authorization.split(' ');

    if (!accessToken) {
      return next(new TokenError('Access token is missing'));
    }

    req.tokenData = await JWTService.verifyAccessToken(accessToken);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports.checkRefreshToken = async (req, res, next) => {
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
