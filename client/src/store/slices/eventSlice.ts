import * as eventController from 'api/rest/eventController';
import {
  decorateAsyncThunk,
} from 'utils/store';
import type {
  CreateEventRequest,
  EventState,
} from 'types/api/event';

const EVENT_SLICE_NAME = 'event';

const initialState: EventState = {
  isFetching: false,
  error: null,
  events: [],
};

export const getEvents = decorateAsyncThunk({
  key: `${EVENT_SLICE_NAME}/getEvents`,
  thunk: async () => await eventController.getEvents(),
});

export const createEvent = decorateAsyncThunk({
  key: `${EVENT_SLICE_NAME}/createEvent`,
  thunk: async (payload: CreateEventRequest) =>
    await eventController.createEvent(payload),
});

