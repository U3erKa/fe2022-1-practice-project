import { createSlice } from '@reduxjs/toolkit';

import { USER_INFO_MODE } from 'constants/general';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserProfileState } from 'types/slices';

const USER_PROFILE_SLICE_NAME = 'userProfile';

const initialState: UserProfileState = {
  profileViewMode: USER_INFO_MODE,
  isEdit: false,
};

const reducers = {
  changeProfileViewMode: (
    state: UserProfileState,
    { payload }: PayloadAction<UserProfileState['profileViewMode']>,
  ) => {
    state.profileViewMode = payload;
  },
  changeEditModeOnUserProfile: (
    state: UserProfileState,
    { payload }: PayloadAction<UserProfileState['isEdit']>,
  ) => {
    state.isEdit = payload;
  },
};

const userProfileSlice = createSlice({
  name: USER_PROFILE_SLICE_NAME,
  initialState,
  reducers,
});

const { actions, reducer } = userProfileSlice;

export const { changeProfileViewMode, changeEditModeOnUserProfile } = actions;

export default reducer;
