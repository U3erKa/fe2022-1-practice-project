import http from '../interceptor';
import type { GetEventsResponse, CreateEventRequest } from 'types/api/event';

export const getEvents = () => http.get<GetEventsResponse>('/events');
export const createEvent = (data: CreateEventRequest) =>
  http.post<GetEventsResponse>('/events', data);
