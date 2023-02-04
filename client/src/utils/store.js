import { createAsyncThunk } from '@reduxjs/toolkit';

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

/**
 * Decorate createAsyncThunk by taking out repeating error catching code
 * @param {Object} thunkOptions - options
 * @param {string} thunkOptions.key - thunk typePrefix
 * @param {Function} thunkOptions.thunk - async thunk
 * @returns {AsyncThunk} Async Thunk object with typePrefix key and async function thunk
 */

export const decorateAsyncThunk = ({ key, thunk }) => {
  const asyncThunk = createAsyncThunk(key, async (payload, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return await thunk(payload, thunkAPI);
    } catch (err) {
      return rejectWithValue({
        data: err?.response?.data ?? 'Gateway Timeout',
        status: err?.response?.status ?? 504,
      });
    }
  });
  return asyncThunk;
};

/**
 * Create extra reducers for async thunk
 * @param {Object} extraReducersOptions - options
 * @param {AsyncThunk} extraReducersOptions.thunk - thunk
 * @param {Function} extraReducersOptions.pendingReducer - pending reducer
 * @param {Function} extraReducersOptions.fulfilledReducer - fulfilled reducer
 * @param {Function} extraReducersOptions.rejectedReducer - rejected reducer
 * @returns {Function} Extra reducers for thunk with pending/fulfilled/rejected reducers
 */

export const createExtraReducers =
  ({ thunk, pendingReducer, fulfilledReducer, rejectedReducer }) =>
  (builder) => {
    pendingReducer && builder.addCase(thunk.pending, pendingReducer);
    fulfilledReducer && builder.addCase(thunk.fulfilled, fulfilledReducer);
    rejectedReducer && builder.addCase(thunk.rejected, rejectedReducer);
  };
