import { type ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import type { NoInfer } from 'react-redux';
import * as eventController from 'api/rest/eventController';
import { timezoneOffsetInMs } from 'constants/general';
import type { NewEvent } from 'utils/schemas';
import {
  decorateAsyncThunk,
  pendingReducer,
  rejectedReducer,
} from 'utils/store';
import type { EventState } from 'types/slices';

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
    for (const event of data) {
      const date = new Date(Date.parse(event.date) + timezoneOffsetInMs);
      Object.assign(event, { date: date.toString() });
    }
    return data;
  },
});

export const createEvent = decorateAsyncThunk({
  key: `${EVENT_SLICE_NAME}/createEvent`,
  thunk: async (payload: NewEvent) => {
    const { data } = await eventController.createEvent(payload);
    const date = new Date(Date.parse(data.date) + timezoneOffsetInMs);
    Object.assign(data, { date: date.toString() });
    return data;
  },
});

const closestEventFirst = ({ date }: NewEvent, { date: other }: NewEvent) =>
  Date.parse(date) - Date.parse(other);

const getEventsExtraReducers = (
  builder: ActionReducerMapBuilder<EventState>,
) => {
  builder
    .addCase(getEvents.pending, pendingReducer)
    .addCase(getEvents.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.error = null;
      state.events = payload;
      state.events.sort(closestEventFirst);
    })
    .addCase(getEvents.rejected, rejectedReducer);
};

const createEventExtraReducers = (
  builder: ActionReducerMapBuilder<EventState>,
) => {
  builder
    .addCase(createEvent.pending, pendingReducer)
    .addCase(createEvent.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.error = null;
      state.events.push(payload);
      state.events.sort(closestEventFirst);
    })
    .addCase(createEvent.rejected, rejectedReducer);
};

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
