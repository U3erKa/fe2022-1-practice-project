import { createAsyncThunk } from '@reduxjs/toolkit';

import type {
  ActionReducerMapBuilder,
  AsyncThunkPayloadCreator,
  CaseReducer,
  PayloadAction,
} from '@reduxjs/toolkit';

import type { DefaultState, ExtraReducersCreator } from 'types/redux';

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
export const decorateAsyncThunk = <Return, Payload = void>({
  key,
  thunk,
}: {
  key: string;
  thunk: AsyncThunkPayloadCreator<Promise<Return>, Payload>;
}) => {
  const asyncThunk = createAsyncThunk<Return, Payload>(
    key,
    async (payload, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        return await thunk(payload, thunkAPI);
      } catch (err) {
        return rejectWithValue({
          // @ts-expect-error
          data: err?.response?.data ?? 'Gateway Timeout',
          // @ts-expect-error
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
