import { type ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import * as authController from 'api/rest/authController';
import { notificationController } from 'api/ws/socketController';
import { AUTH_MODE, PAGE } from 'constants/general';
import {
  decorateAsyncThunk,
  fulfilledReducer,
  pendingReducer,
  rejectedReducer,
} from 'utils/store';
import type { CheckAuth } from 'types/auth';
import type { AuthState } from 'types/slices';

const AUTH_SLICE_NAME = 'auth';

const initialState: AuthState = {
  isFetching: false,
  error: null,
};

export const checkAuth = decorateAsyncThunk({
  key: `${AUTH_SLICE_NAME}/checkAuth`,
  thunk: async ({ data: authInfo, navigate, authMode }: CheckAuth) => {
    const {
      data: { user },
    } =
      authMode === AUTH_MODE.LOGIN
        ? await authController.login(authInfo)
        : await authController.registration(authInfo);

    navigate(PAGE.HOME);
    notificationController.subscribe(user.id);
    return user;
  },
});

const reducers = {
  clearAuthError: (state: AuthState) => {
    state.error = null;
  },
  clearAuth: () => initialState,
};

const extraReducers = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(checkAuth.pending, pendingReducer)
    .addCase(checkAuth.fulfilled, fulfilledReducer)
    .addCase(checkAuth.rejected, rejectedReducer);
};

const authSlice = createSlice({
  name: AUTH_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = authSlice;

export const { clearAuthError, clearAuth } = actions;

export default reducer;
