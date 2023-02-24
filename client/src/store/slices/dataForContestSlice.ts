import { createSlice } from '@reduxjs/toolkit';

import * as contestController from 'api/rest/contestController';
import { DataForContestParams } from 'types/api/contest';
import { DataForContestState } from 'types/slices';
import { decorateAsyncThunk, rejectedReducer } from 'utils/store';

const DATA_FOR_CONTEST_SLICE_NAME = 'dataForContest';

const initialState: DataForContestState = {
  isFetching: true,
  data: null,
  error: null,
};

export const getDataForContest = decorateAsyncThunk({
  key: `${DATA_FOR_CONTEST_SLICE_NAME}/getDataForContest`,
  thunk: async (payload?: DataForContestParams) => {
    const { data } = await contestController.dataForContest(payload);
    return data;
  },
});

const extraReducers = (builder) => {
  builder.addCase(getDataForContest.pending, (state) => {
    state.isFetching = true;
    state.data = null;
    state.error = null;
  });
  builder.addCase(getDataForContest.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.data = payload;
  });
  builder.addCase(getDataForContest.rejected, rejectedReducer);
};

const dataForContestSlice = createSlice({
  name: `${DATA_FOR_CONTEST_SLICE_NAME}`,
  initialState,
  reducers: {},
  extraReducers,
});

const { reducer } = dataForContestSlice;

export default reducer;
