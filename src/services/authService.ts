import { RefreshToken } from 'models';
import type { RefreshToken as _RefreshToken, User } from 'types/models';
import { generateTokenPair } from './jwtService';

export const sanitizeUserData = ({
  avatar,
  balance,
  displayName,
  email,
  firstName,
  lastName,
  rating,
  role,
  id: userId,
}: User) => ({
  avatar,
  balance,
  displayName,
  email,
  firstName,
  lastName,
  rating,
  role,
  userId,
});

export const createSession = async (user: User) => {
  const tokenPair = await generateTokenPair(sanitizeUserData(user));
  await RefreshToken.create({ token: tokenPair.refreshToken, userId: user.id });

  return { tokenPair, user };
};

export const refreshSession = async (refreshTokenInstance: _RefreshToken) => {
  const user = await refreshTokenInstance.getUser();
  const tokenPair = await generateTokenPair(sanitizeUserData(user));
  await refreshTokenInstance.update({ token: tokenPair.refreshToken });

  return { tokenPair, user };
};
