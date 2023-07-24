  PayloadAction,
import * as eventController from 'api/rest/eventController';
import {
  decorateAsyncThunk,
  createExtraReducers,
  pendingReducer,
  rejectedReducer,
} from 'utils/store';
import type {
  CreateEventRequest,
  CreateEventResponse,
  EventState,
  GetEventsResponse,
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

const getEventsExtraReducers = createExtraReducers({
  thunk: getEvents,
  pendingReducer,
  rejectedReducer,
  fulfilledReducer: (
    state: EventState,
    { payload }: PayloadAction<GetEventsResponse>,
  ) => {
    state.isFetching = false;
    state.error = null;
    state.events = payload;
  },
});

const createEventExtraReducers = createExtraReducers({
  thunk: createEvent,
  pendingReducer,
  rejectedReducer,
  fulfilledReducer: (
    state: EventState,
    { payload }: PayloadAction<CreateEventResponse>,
  ) => {
    state.isFetching = false;
    state.error = null;
    state.events.push(payload);
  },
});

