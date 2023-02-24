import { createAsyncThunk } from '@reduxjs/toolkit';

import type {
  AsyncThunk,
  ActionReducerMapBuilder,
  CaseReducer,
  PayloadAction,
} from '@reduxjs/toolkit';

import type {
  AsyncThunkDecorator,
  DefaultState,
  ExtraReducersCreator,
} from 'types/redux';

export const pendingReducer: CaseReducer<DefaultState> = (state) => {
  state.isFetching = true;
  state.error = null;
};

export const fulfilledReducer: CaseReducer<DefaultState> = (state) => {
  state.isFetching = false;
};

export const rejectedReducer: CaseReducer<
  DefaultState,
  PayloadAction<Error>
> = (state, { payload }) => {
  state.isFetching = false;
  state.error = payload;
};

/** Decorate createAsyncThunk by taking out repeating error catching code */
export const decorateAsyncThunk: AsyncThunkDecorator = <
  Return,
  Payload = void,
>({
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
