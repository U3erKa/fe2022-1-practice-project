import http from 'api/interceptor';
import { ROUTE } from 'constants/general';
import type { NewEvent } from 'utils/schemas';
import type { WithTimeStamps } from 'types/api/_common';
import type { Event } from 'types/models';

export type EventResponse = Event['dataValues'] & WithTimeStamps;

export const getEvents = () => http.get<EventResponse[]>(ROUTE.EVENTS);
export const createEvent = (data: NewEvent) =>
  http.post<EventResponse>(ROUTE.EVENTS, data);
