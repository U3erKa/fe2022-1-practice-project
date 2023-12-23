import {
  type ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import * as authController from 'api/rest/authController';
import * as userController from 'api/rest/userController';
import { controller } from 'api/ws/socketController';
import { pendingReducer, rejectedReducer } from 'utils/store';
import type { JWT } from 'types/api/_common';
import type { UserState } from 'types/slices';
import { checkAuth } from './authSlice';
import { changeEditModeOnUserProfile } from './userProfileSlice';

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
    } catch (err: any) {
      return rejectWithValue({
        data: err?.response?.data ?? 'Gateway Timeout',
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
    } catch (err: any) {
      return rejectWithValue({
        data: err?.response?.data ?? 'Gateway Timeout',
        status: err?.response?.status ?? 504,
      });
    }
  },
);

const reducers = {
  clearUserError: (state: UserState) => {
    state.error = null;
  },
  clearUserStore: (state: UserState) => {
    state.error = null;
    state.data = null;
  },
};

const extraReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  builder
    .addCase(checkAuth.pending, (state) => {
      state.isFetching = true;
      state.error = null;
      state.data = null;
    })
    .addCase(checkAuth.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isFetching = false;
    })
    .addCase(checkAuth.rejected, rejectedReducer);

  builder
    .addCase(refresh.pending, (state) => {
      state.isFetching = true;
      state.error = null;
      state.data = null;
    })
    .addCase(refresh.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.data = payload;
    })
    .addCase(refresh.rejected, rejectedReducer);

  builder
    .addCase(updateUser.pending, pendingReducer)
    .addCase(updateUser.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      // @ts-expect-error
      state.data = { ...state.data, ...payload };
      state.error = null;
    })
    .addCase(updateUser.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
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
