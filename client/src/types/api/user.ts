import type { CREATOR, CUSTOMER } from 'constants/general';

export type UpdateUserResponse = UserWithoutPassword;

export type UserWithoutPassword = Omit<
  User,
  'password' | 'accessToken' | 'rating'
>;

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  password: string;
  email: string;
  avatar: string;
  role: typeof CUSTOMER | typeof CREATOR;
  balance: string;
  accessToken: string;
  rating: string;
};
