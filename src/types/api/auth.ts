import type { User } from './user';
import type { JWT } from './_common';

export type RefreshParams = string;
export type AuthResponse = {
  user: User;
  tokenPair: { accessToken: JWT; refreshToken: JWT };
};
