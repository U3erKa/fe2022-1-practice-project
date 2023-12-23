import { type ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import * as contestController from 'api/rest/contestController';
import {
  decorateAsyncThunk,
  fulfilledReducer,
  pendingReducer,
  rejectedReducer,
} from 'utils/store';
import type { ContestUpdationState } from 'types/slices';
import { updateStoreAfterUpdateContest } from './contestByIdSlice';

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

const extraReducers = (
  builder: ActionReducerMapBuilder<ContestUpdationState>,
) => {
  builder
    .addCase(updateContest.pending, pendingReducer)
    .addCase(updateContest.fulfilled, fulfilledReducer)
    .addCase(updateContest.rejected, rejectedReducer);
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
