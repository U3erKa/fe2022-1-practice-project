import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import * as eventController from 'api/rest/eventController';
import {
  decorateAsyncThunk,
  createExtraReducers,
  pendingReducer,
  rejectedReducer,
} from 'utils/store';
import type { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers';
import type {
  CreateEventRequest,
  CreateEventResponse,
  Event,
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
  thunk: async () => {
    const { data } = await eventController.getEvents();
    return data;
  },
});

export const createEvent = decorateAsyncThunk({
  key: `${EVENT_SLICE_NAME}/createEvent`,
  thunk: async (payload: CreateEventRequest) => {
    const { data } = await eventController.createEvent(payload);
    return data;
  },
});

const closestEventFirst = ({ date }: Event, { date: other }: Event) =>
  Date.parse(date) - Date.parse(other);

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
    state.events.sort(closestEventFirst);
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
    state.events.sort(closestEventFirst);
  },
});

const extraReducers = (
  builder: ActionReducerMapBuilder<NoInfer<EventState>>,
) => {
  getEventsExtraReducers(builder);
  createEventExtraReducers(builder);
};

const eventSlice = createSlice({
  name: EVENT_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers,
});

const { reducer } = eventSlice;

export default reducer;
