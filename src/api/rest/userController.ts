import http from '../interceptor';

import type { UpdateUserResponse } from 'types/api/user';

export const updateUser = (data: FormData) =>
  http.post<UpdateUserResponse>('updateUser', data);
