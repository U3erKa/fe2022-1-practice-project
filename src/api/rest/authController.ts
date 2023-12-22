import httpClient from 'api/interceptor';
import { ROUTE } from 'constants/general';
import type { createSession, refreshSession } from 'services/authService';
import type { Login, Registration } from 'utils/schemas';

export type RefreshParams = string;
export type AuthResponse = Awaited<ReturnType<typeof createSession>>;
export type RefreshResponse = Awaited<ReturnType<typeof refreshSession>>;

export const login = (loginData: Login) =>
  httpClient.post<AuthResponse>(ROUTE.LOGIN, loginData);

export const registration = (registrationData: Registration) =>
  httpClient.post<AuthResponse>(ROUTE.REGISTER, registrationData);

export const refresh = (refreshToken: RefreshParams) =>
  httpClient.post<RefreshResponse>(ROUTE.REFRESH, { refreshToken });
