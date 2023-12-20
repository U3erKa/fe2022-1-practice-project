import http from 'api/interceptor';
import { ROUTE } from 'constants/general';
import type { UpdateUserResponse } from 'types/api/user';

export const updateUser = (data: FormData) =>
  http.post<UpdateUserResponse>(ROUTE.UPDATE_USER, data);
