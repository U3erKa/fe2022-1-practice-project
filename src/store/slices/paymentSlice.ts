import {
  type ActionReducerMapBuilder,
  type PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import * as offerController from 'api/rest/offerController';
import { PAGE, USER_INFO_MODE } from 'constants/general';
import {
  decorateAsyncThunk,
  pendingReducer,
  rejectedReducer,
} from 'utils/store';
import type { WithNavigate } from 'types/_common';
import type { CashOutParams } from 'types/offer';
import type { PaymentState } from 'types/slices';
import { clearContestStore } from './contestCreationSlice';
import { changeProfileViewMode } from './userProfileSlice';
import { updateUser } from './userSlice';

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
    navigate(PAGE.DASHBOARD);
    dispatch(clearContestStore());
  },
});

export const cashOut = decorateAsyncThunk({
  key: `${PAYMENT_SLICE_NAME}/cashOut`,
  thunk: async (payload: CashOutParams, { dispatch }) => {
    const { data } = await offerController.cashOut(payload);
    // @ts-expect-error
    dispatch(updateUser.fulfilled(data));
    dispatch(changeProfileViewMode(USER_INFO_MODE));
  },
});

const reducers = {
  changeFocusOnCard: (
    state: PaymentState,
    { payload }: PayloadAction<PaymentState['focusOnElement']>,
  ) => {
    state.focusOnElement = payload;
  },
  clearPaymentStore: () => initialState,
};

const extraReducers = (builder: ActionReducerMapBuilder<PaymentState>) => {
  builder
    .addCase(pay.pending, pendingReducer)
    .addCase(pay.fulfilled, () => initialState)
    .addCase(pay.rejected, rejectedReducer);

  builder
    .addCase(cashOut.pending, pendingReducer)
    .addCase(cashOut.fulfilled, () => initialState)
    .addCase(cashOut.rejected, rejectedReducer);
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
