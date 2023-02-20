import { createSlice } from '@reduxjs/toolkit';

import * as contestController from 'api/rest/contestController';
import { decorateAsyncThunk, pendingReducer } from 'utils/store';
import { CONTEST_STATUS_ACTIVE, CUSTOMER } from 'constants/general';

const CONTESTS_SLICE_NAME = 'contests';

const initialState = {
  isFetching: true,
  error: null,
  contests: [],
  customerFilter: CONTEST_STATUS_ACTIVE,
  creatorFilter: {
    typeIndex: 1,
    contestId: '',
    industry: '',
    awardSort: 'asc',
    ownEntries: false,
  },
  haveMore: true,
};

export const getContests = decorateAsyncThunk({
  key: `${CONTESTS_SLICE_NAME}/getContests`,
  thunk: async ({ requestData, role }) => {
    const { data } =
      role === CUSTOMER
        ? await contestController.getCustomersContests(requestData)
        : await contestController.getActiveContests(requestData);
    return data;
  },
});

const reducers = {
  clearContestsList: (state) => {
    state.error = null;
    state.contests = [];
  },
  setNewCustomerFilter: (state, { payload }) => ({
    ...initialState,
    isFetching: false,
    customerFilter: payload,
  }),
  setNewCreatorFilter: (state, { payload }) => ({
    ...initialState,
    isFetching: false,
    creatorFilter: { ...state.creatorFilter, ...payload },
  }),
};

const extraReducers = (builder) => {
  builder.addCase(getContests.pending, pendingReducer);
  builder.addCase(getContests.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.contests = [...state.contests, ...payload.contests];
    state.haveMore = payload.haveMore;
  });
  builder.addCase(getContests.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
    state.contests = [];
  });
};

const contestsSlice = createSlice({
  name: CONTESTS_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = contestsSlice;

export const { clearContestsList, setNewCustomerFilter, setNewCreatorFilter } =
  actions;

export default reducer;
