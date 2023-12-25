import type { AUTH_MODE } from 'constants/general';
import type { WithNavigate } from './_common';
import type { Login, Registration } from 'utils/validators/validationSchems';

export type CheckAuth = WithNavigate &
  (
    | { data: Login; authMode: typeof AUTH_MODE.LOGIN }
    | { data: Registration; authMode: typeof AUTH_MODE.REGISTER }
  );
