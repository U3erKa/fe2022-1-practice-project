import { createAsyncThunk } from '@reduxjs/toolkit';

import type { AsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { AsyncThunkDecorator, ExtraReducersCreator } from 'types';

export const pendingReducer = (state) => {
  state.isFetching = true;
  state.error = null;
};

export const fulfilledReducer = (state) => {
  state.isFetching = false;
};

export const rejectedReducer = (state, { payload }) => {
  state.isFetching = false;
  state.error = payload;
};

/** Decorate createAsyncThunk by taking out repeating error catching code */
export const decorateAsyncThunk: AsyncThunkDecorator = <Return, Payload>({
  key,
  thunk,
}) => {
  const asyncThunk: AsyncThunk<Return, Payload, {}> = createAsyncThunk(
    key,
    async (payload: Payload, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        return await thunk(payload, thunkAPI);
      } catch (err) {
        return rejectWithValue({
          data: err?.response?.data ?? 'Gateway Timeout',
          status: err?.response?.status ?? 504,
        });
      }
    },
  );
  return asyncThunk;
};

/** Create extra reducers for async thunk */
export const createExtraReducers: ExtraReducersCreator =
  ({ thunk, pendingReducer, fulfilledReducer, rejectedReducer }) =>
  (builder: ActionReducerMapBuilder<any>) => {
    pendingReducer && builder.addCase(thunk.pending, pendingReducer);
    fulfilledReducer && builder.addCase(thunk.fulfilled, fulfilledReducer);
    rejectedReducer && builder.addCase(thunk.rejected, rejectedReducer);
  };