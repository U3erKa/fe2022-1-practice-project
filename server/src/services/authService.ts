import * as JWTService from './jwtService';
import { RefreshToken } from '../models';
import type { RefreshToken as _RefreshToken, User } from '../types/models';

export const createSession = async (user: User) => {
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
    token: tokenPair.refreshToken!,
  });

  return { user, tokenPair };
};

export const refreshSession = async (refreshTokenInstance: _RefreshToken) => {
  const user = (await refreshTokenInstance.getUser()) as unknown as User;

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
