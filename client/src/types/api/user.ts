import type { JWT, UserId, WithId } from './_common';
import type {
  CASHOUT_MODE,
  CREATOR,
  CUSTOMER,
  USER_INFO_MODE,
} from 'constants/general';

export type UpdateUserResponse = UserWithoutPassword;

export type UserWithoutPassword = Omit<
  User,
  'password' | 'accessToken' | 'rating'
>;

export type UserInOffer = Omit<
  User,
  'password' | 'accessToken' | 'balance' | 'role'
>;

export type ProfileViewMode = typeof USER_INFO_MODE | typeof CASHOUT_MODE;

export type User = WithId<UserId> & {
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
  email: string;
  password: string;
  role: typeof CUSTOMER | typeof CREATOR;
  balance: Card['balance'];
  accessToken: JWT;
  rating: number;
};

export type Card = {
  name: string;
  number: string | number;
  expiry: string | number;
  cvc: string | number;
  balance: string | number;
};
