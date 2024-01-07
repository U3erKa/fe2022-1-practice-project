import {
  type ActionReducerMapBuilder,
  type PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import * as contestController from 'api/rest/contestController';
import {
  CONTEST_STATUS_ACTIVE,
  type CREATOR,
  CUSTOMER,
} from 'constants/general';
import { addNewItems } from 'utils/functions';
import { decorateAsyncThunk, pendingReducer } from 'utils/store';
import type {
  GetActiveContestsParams,
  GetCustomersContestsParams,
} from 'types/contest';
import type { ContestsState } from 'types/slices';

export type GetContestsThunk =
  | { requestData: GetActiveContestsParams; role: typeof CREATOR }
  | { requestData: GetCustomersContestsParams; role: typeof CUSTOMER };

const CONTESTS_SLICE_NAME = 'contests';

const initialState: ContestsState = {
  isFetching: true,
  error: null,
  contests: [],
  customerFilter: CONTEST_STATUS_ACTIVE,
  creatorFilter: {
    awardSort: 'ASC',
    contestId: '' as unknown as number,
    industry: '',
    ownEntries: false,
    typeIndex: 1,
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
  setNewCreatorFilter: (
    state: ContestsState,
    { payload }: PayloadAction<ContestsState['creatorFilter']>,
  ) => ({
    ...initialState,
    creatorFilter: { ...state.creatorFilter, ...payload },
    isFetching: false,
  }),
  setNewCustomerFilter: (
    state: ContestsState,
    { payload }: PayloadAction<ContestsState['customerFilter']>,
  ) => ({
    ...initialState,
    customerFilter: payload,
    isFetching: false,
  }),
};

const extraReducers = (builder: ActionReducerMapBuilder<ContestsState>) => {
  builder
    .addCase(getContests.pending, pendingReducer)
    .addCase(getContests.fulfilled, (state, { payload }) => {
      const { contests, haveMore } = payload;
      state.isFetching = false;
      state.contests = addNewItems(state.contests, contests);
      state.haveMore = haveMore;
    })
    .addCase(getContests.rejected, (state, { payload }) => {
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
