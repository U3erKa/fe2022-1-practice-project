import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BundleState } from 'types/slices';

const BUNDLE_SLICE_NAME = 'bundle';

const initialState: BundleState = {
  bundle: null,
};

const reducers = {
  updateBundle: (
    state: BundleState,
    { payload }: PayloadAction<BundleState['bundle']>,
  ) => {
    state.bundle = payload;
  },
};

const bundleSlice = createSlice({
  name: BUNDLE_SLICE_NAME,
  initialState,
  reducers,
});

const { actions, reducer } = bundleSlice;

export const { updateBundle } = actions;

export default reducer;
