import type { AUTH_MODE } from 'constants/general';
import type { LoginParams, RegisterParams } from './api/auth';
import type { WithNavigate } from './_common';

export type CheckAuth = WithNavigate &
  (
    | {
        data: LoginParams;
        authMode: typeof AUTH_MODE.LOGIN;
      }
    | {
        data: RegisterParams;
        authMode: typeof AUTH_MODE.REGISTER;
      }
  );
