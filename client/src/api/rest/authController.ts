import httpClient from '../interceptor';

export const login = (loginData) => httpClient.post('auth/login', loginData);
export const registration = (registrationData) =>
  httpClient.post('auth/registration', registrationData);
export const refresh = (refreshToken) =>
  httpClient.post('auth/refresh', { refreshToken });
