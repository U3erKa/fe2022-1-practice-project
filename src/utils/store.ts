import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
  AsyncThunkPayloadCreator,
  CaseReducer,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { WithFetch } from 'types/slices';

export const pendingReducer: CaseReducer = <T extends WithFetch>(state: T) => {
  state.isFetching = true;
  state.error = null;
};

export const fulfilledReducer: CaseReducer = <T extends WithFetch>(
  state: T,
) => {
  state.isFetching = false;
};

export const rejectedReducer = <T extends WithFetch>(
  state: T,
  { payload }: PayloadAction<unknown>,
) => {
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
      } catch (err: any) {
        return rejectWithValue({
          data: err?.response?.data ?? 'Gateway Timeout',
          status: err?.response?.status ?? 504,
        });
      }
    },
  );
  return asyncThunk;
};
