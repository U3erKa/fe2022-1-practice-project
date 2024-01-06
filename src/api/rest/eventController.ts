import http from 'api/interceptor';
import type {
  POST as CreateEventHandler,
  GET as GetEventsHandler,
} from 'app/api/events/route';
import { ROUTE } from 'constants/general';
import type { NewEvent } from 'utils/schemas';
import type { APIHandlerReturn } from 'types/_common';
import type { WithTimeStamps } from 'types/api/_common';
import type { Event } from 'types/models';

export type GetEventsResponse = APIHandlerReturn<typeof GetEventsHandler>;
export type CreateEventResponse = APIHandlerReturn<typeof CreateEventHandler>;

export type EventResponse = Event['dataValues'] & WithTimeStamps;

export const getEvents = () => http.get<GetEventsResponse>(ROUTE.EVENTS);
export const createEvent = (data: NewEvent) =>
  http.post<CreateEventResponse>(ROUTE.EVENTS, data);
