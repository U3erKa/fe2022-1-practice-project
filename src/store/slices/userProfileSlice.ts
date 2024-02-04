import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { USER_INFO_MODE } from 'constants/general';
import type { UserProfileState } from 'types/slices';

const USER_PROFILE_SLICE_NAME = 'userProfile';

const initialState: UserProfileState = {
  isEdit: false,
  profileViewMode: USER_INFO_MODE,
};

const reducers = {
  changeEditModeOnUserProfile: (
    state: UserProfileState,
    { payload }: PayloadAction<UserProfileState['isEdit']>,
  ) => {
    state.isEdit = payload;
  },
  changeProfileViewMode: (
    state: UserProfileState,
    { payload }: PayloadAction<UserProfileState['profileViewMode']>,
  ) => {
    state.profileViewMode = payload;
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
