import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as contestController from 'api/rest/contestController';
import { decorateAsyncThunk, pendingReducer } from 'utils/store';
import { CONTEST_STATUS_ACTIVE, CUSTOMER } from 'constants/general';

import type { GetContestsThunk } from 'types/api/contest';
import type { ContestsState } from 'types/slices';

const CONTESTS_SLICE_NAME = 'contests';

const initialState: ContestsState = {
  isFetching: true,
  error: null,
  contests: [],
  customerFilter: CONTEST_STATUS_ACTIVE,
  creatorFilter: {
    typeIndex: 1,
    contestId: '',
    industry: '',
    awardSort: 'ASC',
    ownEntries: false,
  },
  haveMore: true,
};

export const getContests = decorateAsyncThunk({
  key: `${CONTESTS_SLICE_NAME}/getContests`,
  thunk: async ({ requestData, role }: GetContestsThunk) => {
    const { data } =
      role === CUSTOMER
        ? await contestController.getCustomersContests(requestData)
        : await contestController.getActiveContests(requestData);
    return data;
  },
});

const reducers = {
  clearContestsList: (state: ContestsState) => {
    state.error = null;
    state.contests = [];
  },
  setNewCustomerFilter: (
    state: ContestsState,
    { payload }: PayloadAction<ContestsState['customerFilter']>,
  ) => ({
    ...initialState,
    isFetching: false,
    customerFilter: payload,
  }),
  setNewCreatorFilter: (
    state: ContestsState,
    { payload }: PayloadAction<ContestsState['creatorFilter']>,
  ) => ({
    ...initialState,
    isFetching: false,
    creatorFilter: { ...state.creatorFilter, ...payload },
  }),
};

export type GetContests = {
  contests: ContestsState['contests'];
  haveMore: ContestsState['haveMore'];
};

const extraReducers = (builder) => {
  builder.addCase(getContests.pending, pendingReducer);
  builder.addCase(
    getContests.fulfilled,
    (state: ContestsState, { payload }: PayloadAction<GetContests>) => {
      const newContestIds = payload.contests.map((contest) => contest.id);
      const uniqueContests = state.contests.filter(
        (contest) => !newContestIds.includes(contest.id),
      );

      state.isFetching = false;
      state.contests = [...uniqueContests, ...payload.contests];
      state.haveMore = payload.haveMore;
    },
  );
  builder.addCase(getContests.rejected, (state: ContestsState, { payload }) => {
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
