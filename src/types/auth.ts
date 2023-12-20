import type { AUTH_MODE } from 'constants/general';
import type { Login, Registration } from 'utils/schemas';
import type { WithNavigate } from './_common';

export type CheckAuth = WithNavigate &
  (
    | { data: Login; authMode: typeof AUTH_MODE.LOGIN }
    | { data: Registration; authMode: typeof AUTH_MODE.REGISTER }
  );
