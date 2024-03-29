import { createSlice, type ActionReducerMapBuilder } from '@reduxjs/toolkit';
import * as contestController from 'api/rest/contestController';
import { decorateAsyncThunk, rejectedReducer } from 'utils/store';
import type { DataForContestParams } from 'types/contest';
import type { DataForContestState } from 'types/slices';

const DATA_FOR_CONTEST_SLICE_NAME = 'dataForContest';

const initialState: DataForContestState = {
  isFetching: true,
  data: null,
  error: null,
};

export const getDataForContest = decorateAsyncThunk({
  key: `${DATA_FOR_CONTEST_SLICE_NAME}/getDataForContest`,
  thunk: async (payload?: DataForContestParams | undefined) => {
    const { data } = await contestController.dataForContest(payload);
    return data;
  },
});

const extraReducers = (
  builder: ActionReducerMapBuilder<DataForContestState>,
) => {
  builder
    .addCase(getDataForContest.pending, (state) => {
      state.isFetching = true;
      state.data = null;
      state.error = null;
    })
    .addCase(getDataForContest.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.data = payload;
    })
    .addCase(getDataForContest.rejected, rejectedReducer);
};

const dataForContestSlice = createSlice({
  name: DATA_FOR_CONTEST_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers,
});

const { reducer } = dataForContestSlice;

export default reducer;
