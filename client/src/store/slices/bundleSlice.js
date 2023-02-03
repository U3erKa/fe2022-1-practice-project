import { createSlice } from '@reduxjs/toolkit';

const BUNDLE_SLICE_NAME = 'bundle';

const initialState = {
  bundle: null,
};

const reducers = {
  updateBundle: (state, { payload }) => {
    state.bundle = payload;
  },
};

const bundleSlice = createSlice({
  name: `${BUNDLE_SLICE_NAME}`,
  initialState,
  reducers,
});

const { actions, reducer } = bundleSlice;

export const { updateBundle } = actions;

export default reducer;
