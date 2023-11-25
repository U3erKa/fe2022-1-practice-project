import http from 'api/interceptor';
import type { NewEvent } from 'utils/schemas';
import type { CreateEventResponse, GetEventsResponse } from 'types/api/event';

export const getEvents = () => http.get<GetEventsResponse>('/events');
export const createEvent = (data: NewEvent) =>
  http.post<CreateEventResponse>('/events', data);
