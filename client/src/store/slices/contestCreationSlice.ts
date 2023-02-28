import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { SaveContestToStore } from 'types/api/contest';
import type { ContestCreationState } from 'types/slices';

const CONTEST_SAVING_SLICE_NAME = 'contestCreation';

const initialState: ContestCreationState = {
  contests: {},
};

const reducers = {
  saveContestToStore: (
    state: ContestCreationState,
    { payload: { type, info } }: PayloadAction<SaveContestToStore>,
  ) => {
    state.contests = {
      ...state.contests,
      ...{ [type]: info },
    };
  },
  clearContestStore: () => initialState,
};

const contestSavingSlice = createSlice({
  name: CONTEST_SAVING_SLICE_NAME,
  initialState,
  reducers,
});

const { actions, reducer } = contestSavingSlice;

export const { saveContestToStore, clearContestStore } = actions;

export default reducer;
