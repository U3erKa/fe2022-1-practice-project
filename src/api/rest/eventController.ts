import http from 'api/interceptor';
import { ROUTE } from 'constants/general';
import type { NewEvent } from 'utils/schemas';
import type { CreateEventResponse, GetEventsResponse } from 'types/api/event';

export const getEvents = () => http.get<GetEventsResponse>(ROUTE.EVENTS);
export const createEvent = (data: NewEvent) =>
  http.post<CreateEventResponse>(ROUTE.EVENTS, data);
