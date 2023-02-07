import { createSlice } from '@reduxjs/toolkit';

import * as authController from 'api/rest/authController';
import { controller } from 'api/ws/socketController';

import {
  decorateAsyncThunk,
  pendingReducer,
  fulfilledReducer,
  rejectedReducer,
} from 'utils/store';
import { AUTH_MODE } from 'constants/general';

const AUTH_SLICE_NAME = 'auth';

const initialState = {
  isFetching: false,
  error: null,
};

export const checkAuth = decorateAsyncThunk({
  key: `${AUTH_SLICE_NAME}/checkAuth`,
  thunk: async ({ data: authInfo, history, authMode }) => {
    const {
      data: { user },
    } =
      authMode === AUTH_MODE.LOGIN
        ? await authController.login(authInfo)
        : await authController.registration(authInfo);

    history.replace('/');
    controller.subscribe(user.id);
    return user;
  },
});

const reducers = {
  clearAuthError: (state) => {
    state.error = null;
  },
  clearAuth: () => initialState,
};

const extraReducers = (builder) => {
  builder.addCase(checkAuth.pending, pendingReducer);
  builder.addCase(checkAuth.fulfilled, fulfilledReducer);
  builder.addCase(checkAuth.rejected, rejectedReducer);
};

const authSlice = createSlice({
  name: `${AUTH_SLICE_NAME}`,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = authSlice;

export const { clearAuthError, clearAuth } = actions;

export default reducer;
