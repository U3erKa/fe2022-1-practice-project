import type { InferType } from 'yup';

import type {
  LoginSchem,
  RegistrationSchem,
} from 'utils/validators/validationSchems';

import type { User } from './user';

export type LoginParams = InferType<typeof LoginSchem>;
export type RegisterParams = InferType<typeof RegistrationSchem>;
export type RefreshParams = string;

export type AuthResponse = {
  user: User;
  tokenPair: { accessToken: string; refreshToken: string };
};
