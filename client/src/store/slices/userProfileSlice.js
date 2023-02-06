import { createSlice } from '@reduxjs/toolkit';
import { USER_INFO_MODE } from '../../constants';

const USER_PROFILE_SLICE_NAME = 'userProfile';

const initialState = {
  profileViewMode: USER_INFO_MODE,
  isEdit: false,
};

const reducers = {
  changeProfileViewMode: (state, { payload }) => {
    state.profileViewMode = payload;
  },
  changeEditModeOnUserProfile: (state, { payload }) => {
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
