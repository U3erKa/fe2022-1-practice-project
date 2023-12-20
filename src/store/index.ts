import {
  type Action,
  type ThunkAction,
  configureStore,
} from '@reduxjs/toolkit';
import { isEqual } from 'radash';
import {
  type TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import { initSocket } from 'api/ws/socketController';
import reducer from './reducer';

const store = configureStore({
  reducer: reducer,
});

initSocket(store);

export default store;

export const reduxStore = configureStore({
  reducer,
});

export type RootStore = typeof reduxStore;
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
