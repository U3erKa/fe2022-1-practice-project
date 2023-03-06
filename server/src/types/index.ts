import type { NativeDate } from 'mongoose';
import type { RefreshToken, User } from './models';
import type { TokenData } from './user';

declare global {
  namespace Express {
    interface Request extends RefreshTokenInstance, WithTokenData {}
  }
}

export type WithId<T extends Id = Id, K extends string = 'id'> = {
  [key in K]: T;
};
/** SQL's unique id parameter */
export type Id = string | number;
/** MongoDB's `_id` parameter */
export type _Id = string;

export type UserId = User['id'];

export type OrderPredicate = [string, 'asc' | 'desc' | 'ASC' | 'DESC'][];

export type RefreshTokenInstance = { refreshTokenInstance: RefreshToken };
export type WithTokenData = { tokenData: TokenData };
export type WithTimeStamps = { createdAt: NativeDate; updatedAt: NativeDate };
