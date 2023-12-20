import type { NewEvent } from 'utils/schemas';
import type { DefaultState } from 'types/redux';
import type { UserId, WithId, WithTimeStamps } from './_common';

export type GetEventsResponse = CreateEventResponse[];
export type CreateEventResponse = WithId<UserId> & WithTimeStamps & NewEvent;
export type EventState = DefaultState & { events: CreateEventResponse[] };
