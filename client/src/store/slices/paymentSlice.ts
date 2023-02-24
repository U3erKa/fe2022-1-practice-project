import { createSlice } from '@reduxjs/toolkit';

import * as offerController from 'api/rest/offerController';
import { clearContestStore } from './contestCreationSlice';
import { changeProfileViewMode } from './userProfileSlice';
import { updateUser } from './userSlice';

import {
  decorateAsyncThunk,
  pendingReducer,
  rejectedReducer,
} from 'utils/store';
import { USER_INFO_MODE } from 'constants/general';

import type { PaymentState } from 'types/slices';
import { WithNavigate } from 'types/_common';
import { CashOutParams } from 'types/api/offer';

const PAYMENT_SLICE_NAME = 'payment';

const initialState: PaymentState = {
  isFetching: false,
  error: null,
  focusOnElement: 'number',
};

export const pay = decorateAsyncThunk({
  key: `${PAYMENT_SLICE_NAME}/pay`,
  thunk: async (
    { data, navigate }: WithNavigate & { data: { formData: FormData } },
    { dispatch },
  ) => {
    await offerController.payMent(data);
    navigate('/dashboard', { replace: true });
    dispatch(clearContestStore());
  },
});

export const cashOut = decorateAsyncThunk({
  key: `${PAYMENT_SLICE_NAME}/cashOut`,
  thunk: async (payload: CashOutParams, { dispatch }) => {
    const { data } = await offerController.cashOut(payload);
    dispatch(updateUser.fulfilled(data));
    dispatch(changeProfileViewMode(USER_INFO_MODE));
  },
});

const reducers = {
  changeFocusOnCard: (state: PaymentState, { payload }) => {
    state.focusOnElement = payload;
  },
  clearPaymentStore: () => initialState,
};

const extraReducers = (builder) => {
  builder.addCase(pay.pending, pendingReducer);
  builder.addCase(pay.fulfilled, () => initialState);
  builder.addCase(pay.rejected, rejectedReducer);

  builder.addCase(cashOut.pending, pendingReducer);
  builder.addCase(cashOut.fulfilled, () => initialState);
  builder.addCase(cashOut.rejected, rejectedReducer);
};

const paymentSlice = createSlice({
  name: PAYMENT_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = paymentSlice;

export const { changeFocusOnCard, clearPaymentStore } = actions;

export default reducer;
