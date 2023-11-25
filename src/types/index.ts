import type { Date } from 'mongoose';
import type { RefreshToken, User } from './models';
import type { TokenData } from './user';

export type WithId<T extends Id = Id, K extends string = 'id'> = {
  [key in K]: T;
};
/** SQL's unique id parameter */
export type Id = string | number;
/** MongoDB's `_id` parameter */
export type _Id = string;

export type UserId = User['id'];

export type SortOrder = 'asc' | 'desc' | 'ASC' | 'DESC';
export type OrderPredicate = [string, SortOrder][];

export type RefreshTokenInstance = { refreshTokenInstance: RefreshToken };
export type WithTokenData = { tokenData: TokenData };
export type WithTimeStamps = { createdAt: Date; updatedAt: Date };
