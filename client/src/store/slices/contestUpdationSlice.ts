import { createSlice } from '@reduxjs/toolkit';

import * as contestController from 'api/rest/contestController';
import { updateStoreAfterUpdateContest } from './contestByIdSlice';

import {
  decorateAsyncThunk,
  pendingReducer,
  fulfilledReducer,
  rejectedReducer,
} from 'utils/store';

import type { ContestUpdationState } from 'types/slices';

const CONTEST_UPDATION_SLICE_NAME = 'contestUpdation';

const initialState: ContestUpdationState = {
  isFetching: true,
  error: null,
};

export const updateContest = decorateAsyncThunk({
  key: CONTEST_UPDATION_SLICE_NAME,
  thunk: async (payload: FormData, { dispatch }) => {
    const { data } = await contestController.updateContest(payload);
    // @ts-ignore
    dispatch(updateStoreAfterUpdateContest(data));
  },
});

const reducers = {
  clearContestUpdationStore: () => initialState,
};

const extraReducers = (builder) => {
  builder.addCase(updateContest.pending, pendingReducer);
  builder.addCase(updateContest.fulfilled, fulfilledReducer);
  builder.addCase(updateContest.rejected, rejectedReducer);
};

const contestUpdationSlice = createSlice({
  name: CONTEST_UPDATION_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = contestUpdationSlice;

export const { clearContestUpdationStore } = actions;

export default reducer;
