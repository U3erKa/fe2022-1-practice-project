import httpClient from 'api/interceptor';
import type { POST as LoginHandler } from 'app/api/auth/login/route';
import type { POST as RefreshHandler } from 'app/api/auth/refresh/route';
import type { POST as RegistrationHandler } from 'app/api/auth/registration/route';
import { ROUTE } from 'constants/general';
import type { Login, Registration } from 'utils/schemas';
import type { APIHandlerReturn } from 'types/_common';

export type RefreshParams = string;
export type LoginResponse = APIHandlerReturn<typeof LoginHandler>;
export type RegistrationResponse = APIHandlerReturn<typeof RegistrationHandler>;
export type RefreshResponse = APIHandlerReturn<typeof RefreshHandler>;

export const login = (loginData: Login) =>
  httpClient.post<LoginResponse>(ROUTE.LOGIN, loginData);

export const registration = (registrationData: Registration) =>
  httpClient.post<RegistrationResponse>(ROUTE.REGISTER, registrationData);

export const refresh = (refreshToken: RefreshParams) =>
  httpClient.post<RefreshResponse>(ROUTE.REFRESH, { refreshToken });
