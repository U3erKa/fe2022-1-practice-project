import http from 'api/interceptor';
import { ROUTE } from 'constants/general';
import type { updateUser as updateUserQuery } from 'controllers/queries/userQueries';

type UpdateUserResponse = Pick<
  Awaited<ReturnType<typeof updateUserQuery>>,
  | 'avatar'
  | 'balance'
  | 'displayName'
  | 'email'
  | 'firstName'
  | 'id'
  | 'lastName'
  | 'role'
>;

export const updateUser = (data: FormData) =>
  http.post<UpdateUserResponse>(ROUTE.UPDATE_USER, data);
