import type { InferType } from 'yup';

import type {
  LoginSchem,
  RegistrationSchem,
} from 'utils/validators/validationSchems';
import type { CREATOR, CUSTOMER } from 'constants/general';

export type LoginParams = InferType<typeof LoginSchem>;
export type RegisterParams = InferType<typeof RegistrationSchem>;
export type RefreshParams = string;

export type AuthResponse = {
  user: User;
  tokenPair: { accessToken: string; refreshToken: string };
};

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
