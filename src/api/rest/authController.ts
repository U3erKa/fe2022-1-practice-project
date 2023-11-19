import httpClient from 'api/interceptor';
import { ROUTE } from 'constants/general';
import type { Login, Registration } from 'utils/schemas';
import type { AuthResponse, RefreshParams } from 'types/api/auth';

export const login = (loginData: Login) =>
  httpClient.post<AuthResponse>(ROUTE.LOGIN, loginData);

export const registration = (registrationData: Registration) =>
  httpClient.post<AuthResponse>(ROUTE.REGISTER, registrationData);

export const refresh = (refreshToken: RefreshParams) =>
  httpClient.post<AuthResponse>(ROUTE.REFRESH, { refreshToken });
