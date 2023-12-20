import type { JWT } from './_common';
import type { User } from './user';

export type RefreshParams = string;
export type AuthResponse = {
  user: User;
  tokenPair: { accessToken: JWT; refreshToken: JWT };
};
