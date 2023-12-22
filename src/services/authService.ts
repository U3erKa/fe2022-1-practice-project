import { RefreshToken } from 'models';
import type { User, RefreshToken as _RefreshToken } from 'types/models';
import { generateTokenPair } from './jwtService';

export const createSession = async (user: User) => {
  const tokenPair = await generateTokenPair({
    avatar: user.avatar,
    balance: user.balance,
    displayName: user.displayName,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    rating: user.rating,
    role: user.role,
    userId: user.id,
  });

  await RefreshToken.create({
    token: tokenPair.refreshToken!,
    userId: user.id,
  });

  return { tokenPair, user };
};

export const refreshSession = async (refreshTokenInstance: _RefreshToken) => {
  const user = await refreshTokenInstance.getUser();

  const tokenPair = await generateTokenPair({
    avatar: user.avatar,
    balance: user.balance,
    displayName: user.displayName,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    rating: user.rating,
    role: user.role,
    userId: user.id,
  });

  await refreshTokenInstance.update({ token: tokenPair.refreshToken });

  return { tokenPair, user };
};
