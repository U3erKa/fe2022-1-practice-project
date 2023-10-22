import http from '../interceptor';
import type {
  CreateEventRequest,
  CreateEventResponse,
  GetEventsResponse,
} from 'types/api/event';

export const getEvents = () => http.get<GetEventsResponse>('/events');
export const createEvent = (data: CreateEventRequest) =>
  http.post<CreateEventResponse>('/events', data);
