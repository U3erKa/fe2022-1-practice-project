import http from 'api/interceptor';
import type { POST as UpdateUserHandler } from 'app/api/updateUser/route';
import { ROUTE } from 'constants/general';
import type { APIHandlerReturn } from 'types/_common';

export type UpdateUserResponse = APIHandlerReturn<typeof UpdateUserHandler>;

export const updateUser = (data: FormData) =>
  http.post<UpdateUserResponse>(ROUTE.UPDATE_USER, data);
