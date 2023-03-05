import type { User } from './models';

export type TokenData = User['id'] & UserData;

export type UserData = Pick<
  User,
  | 'firstName'
  | 'lastName'
  | 'avatar'
  | 'displayName'
  | 'email'
  | 'balance'
  | 'role'
  | 'rating'
>;
