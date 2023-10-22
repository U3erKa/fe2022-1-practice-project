import httpClient from '../interceptor';

import type {
  AuthResponse,
  LoginParams,
  RefreshParams,
  RegisterParams,
} from 'types/api/auth';

export const login = (loginData: LoginParams) =>
  httpClient.post<AuthResponse>('auth/login', loginData);

export const registration = (registrationData: RegisterParams) =>
  httpClient.post<AuthResponse>('auth/registration', registrationData);

export const refresh = (refreshToken: RefreshParams) =>
  httpClient.post<AuthResponse>('auth/refresh', { refreshToken });
