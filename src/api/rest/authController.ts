import httpClient from '../interceptor';
import type { Login, Registration } from 'utils/validators/validationSchems';
import type { AuthResponse, RefreshParams } from 'types/api/auth';

export const login = (loginData: Login) =>
  httpClient.post<AuthResponse>('auth/login', loginData);

export const registration = (registrationData: Registration) =>
  httpClient.post<AuthResponse>('auth/registration', registrationData);

export const refresh = (refreshToken: RefreshParams) =>
  httpClient.post<AuthResponse>('auth/refresh', { refreshToken });
