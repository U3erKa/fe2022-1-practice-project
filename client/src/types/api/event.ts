import type { InferType } from 'yup';
import type { newEventSchema } from 'utils/validators/validationSchems';
import type { UserId, WithId, WithTimeStamps } from './_common';

export type GetEventsResponse = WithId<UserId> &
  WithTimeStamps & { name: string; date: Date; notify: string };

export type CreateEventRequest = InferType<typeof newEventSchema>;
export type CreateEventResponse = GetEventsResponse;
