import type { AxiosResponse } from 'axios';
import type { NavigateFunction } from 'react-router-dom';

import type { AUTH_MODE } from 'constants/general';

export type CheckAuth = {
  data: AxiosResponse<object>;
  navigate: NavigateFunction;
  authMode: keyof typeof AUTH_MODE;
};
