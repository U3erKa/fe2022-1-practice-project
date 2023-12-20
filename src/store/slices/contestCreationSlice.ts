import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SIMILAR_CHOISE } from 'constants/buttonGroup';
import type { SaveContestToStore } from 'types/api/contest';
import type { ContestCreationState, NameMatchesDomain } from 'types/slices';

const CONTEST_SAVING_SLICE_NAME = 'contestCreation';

const initialState: ContestCreationState = {
  contests: {},
  nameMathesDomain: SIMILAR_CHOISE,
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
  changeNameMathesDomain: (
    state: ContestCreationState,
    { payload }: PayloadAction<NameMatchesDomain>,
  ) => {
    state.nameMathesDomain = payload;
  },
  clearContestStore: () => initialState,
};

const contestSavingSlice = createSlice({
  name: CONTEST_SAVING_SLICE_NAME,
  initialState,
  reducers,
});

const { actions, reducer } = contestSavingSlice;

export const { saveContestToStore, changeNameMathesDomain, clearContestStore } =
  actions;

export default reducer;
