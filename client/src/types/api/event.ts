import type { InferType } from 'yup';
import type { newEventSchema } from 'utils/validators/validationSchems';
import type { UserId, WithId, WithTimeStamps } from './_common';

export type GetEventsResponse = CreateEventResponse[];

export type CreateEventRequest = InferType<typeof newEventSchema>;
export type CreateEventResponse = WithId<UserId> &
WithTimeStamps & { name: string; date: Date; notify: string };
