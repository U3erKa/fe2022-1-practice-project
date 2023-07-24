import type { InferType } from 'yup';
import type { DefaultState } from 'types/redux';
import type { newEventSchema } from 'utils/validators/validationSchems';
import type { UserId, WithId, WithTimeStamps } from './_common';

export type GetEventsResponse = CreateEventResponse[];

export type CreateEventRequest = InferType<typeof newEventSchema>;
export type CreateEventResponse = WithId<UserId> & WithTimeStamps & Event;

export type EventState = DefaultState & { events: CreateEventResponse[] };
export type Event = InferType<typeof newEventSchema>;
