const JWTService = require('./jwtService');
const { RefreshToken } = require('../models');

module.exports.createSession = async (user) => {
  const tokenPair = await JWTService.generateTokenPair({
    firstName: user.firstName,
    userId: user.id,
    role: user.role,
    lastName: user.lastName,
    avatar: user.avatar,
    displayName: user.displayName,
    balance: user.balance,
    email: user.email,
    rating: user.rating,
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
    firstName: user.firstName,
    userId: user.id,
    role: user.role,
    lastName: user.lastName,
    avatar: user.avatar,
    displayName: user.displayName,
    balance: user.balance,
    email: user.email,
    rating: user.rating,
  });

  await refreshTokenInstance.update({ token: tokenPair.refreshToken });

  return { user, tokenPair };
};
