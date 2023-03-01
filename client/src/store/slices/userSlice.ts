import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as userController from 'api/rest/userController';
import * as authController from 'api/rest/authController';
import { controller } from 'api/ws/socketController';

import { checkAuth } from './authSlice';
import { changeEditModeOnUserProfile } from './userProfileSlice';
import { rejectedReducer } from 'utils/store';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserState } from 'types/slices';
import type { JWT } from 'types/api/_common';

const USER_SLICE_NAME = 'user';

const initialState: UserState = {
  isFetching: false,
  error: null,
  data: null,
};

export const refresh = createAsyncThunk(
  `${USER_SLICE_NAME}/refresh`,
  async (refreshToken: JWT, { rejectWithValue }) => {
    try {
      const {
        data: { user },
      } = await authController.refresh(refreshToken);
      controller.subscribe(user.id);

      return user;
    } catch (err) {
      return rejectWithValue({
        // @ts-expect-error
        data: err?.response?.data ?? 'Gateway Timeout',
        // @ts-expect-error
        status: err?.response?.status ?? 504,
      });
    }
  },
);

export const updateUser = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  async (payload: FormData, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await userController.updateUser(payload);
      dispatch(changeEditModeOnUserProfile(false));
      return data;
    } catch (err) {
      return rejectWithValue({
        // @ts-expect-error
        data: err?.response?.data ?? 'Gateway Timeout',
        // @ts-expect-error
        status: err?.response?.status ?? 504,
      });
    }
  },
);

const reducers = {
  clearUserStore: (state: UserState) => {
    state.error = null;
    state.data = null;
  },
  clearUserError: (state: UserState) => {
    state.error = null;
  },
};

const extraReducers = (builder) => {
  builder.addCase(checkAuth.pending, (state: UserState) => {
    state.isFetching = true;
    state.error = null;
    state.data = null;
  });
  builder.addCase(checkAuth.fulfilled, (state: UserState, { payload }) => {
    state.data = payload;
    state.isFetching = false;
  });
  builder.addCase(checkAuth.rejected, rejectedReducer);

  builder.addCase(refresh.pending, (state: UserState) => {
    state.isFetching = true;
    state.error = null;
    state.data = null;
  });
  builder.addCase(
    refresh.fulfilled,
    (state: UserState, { payload }: PayloadAction<UserState['data']>) => {
      state.data = payload;
      state.isFetching = false;
    },
  );
  builder.addCase(refresh.rejected, rejectedReducer);

  builder.addCase(
    updateUser.fulfilled,
    (state: UserState, { payload }: PayloadAction<UserState['data']>) => {
      // @ts-expect-error
      state.data = { ...state.data, ...payload };
      state.error = null;
    },
  );
  builder.addCase(
    updateUser.rejected,
    (state: UserState, { payload }: PayloadAction<Error>) => {
      state.error = payload;
    },
  );
};

const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = userSlice;

export const { clearUserStore, clearUserError } = actions;

export default reducer;
