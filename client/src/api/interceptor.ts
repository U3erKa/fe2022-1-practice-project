import axios from 'axios';

import { BASE_URL, REFRESH_TOKEN } from 'constants/general';

const httpClient = axios.create({
  baseURL: BASE_URL,
});

let accessToken = null;

httpClient.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => Promise.reject(err),
);

httpClient.interceptors.response.use(
  (response) => {
    if (response?.data?.tokenPair) {
      const { accessToken: newAccessToken, refreshToken } =
        response.data.tokenPair;

      window.localStorage.setItem(REFRESH_TOKEN, refreshToken);
      accessToken = newAccessToken;
    }
    return response;
  },
  async (err) => {
    const oldRefreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (err.response.status === 419 && oldRefreshToken) {
      const {
        data: {
          tokenPair: { accessToken: newAccessToken, refreshToken },
        },
      } = await axios.post(`${BASE_URL}auth/refresh`, {
        refreshToken: oldRefreshToken,
      });

      window.localStorage.setItem(REFRESH_TOKEN, refreshToken);
      accessToken = newAccessToken;

      err.config.headers.Authorization = `Bearer ${accessToken}`;

      return axios.request(err.config);
    }
    return Promise.reject(err);
  },
);

export default httpClient;
