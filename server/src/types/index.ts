import { TokenData } from './user';

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

export type UserId = Id;

export type OrderPredicate = [string, 'asc' | 'desc' | 'ASC' | 'DESC'][];

export type RefreshTokenInstance = { refreshTokenInstance };
export type WithTokenData = { tokenData: TokenData };
