const JWTService = require('./jwtService');
const { RefreshToken } = require('../models');

module.exports.createSession = async (user) => {
  const tokenPair = await JWTService.generateTokenPair({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  await RefreshToken.create({
    userId: user.id,
    token: tokenPair.refreshToken,
  });

  return { user, tokenPair };
};

module.exports.refreshSession = async (refreshTokenInstance) => {
  const user = await refreshTokenInstance.getUser();

  const tokenPair = await JWTService.generateTokenPair({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  await refreshTokenInstance.update({ token: tokenPair.refreshToken });

  return { user, tokenPair };
};
