import {
  configureStore,
  type ThunkAction,
  type Action,
} from '@reduxjs/toolkit';
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from 'react-redux';
import { isEqual } from 'radash';
import reducer from './reducer';
import { initSocket } from 'api/ws/socketController';

const store = configureStore({
  reducer: reducer,
});

initSocket(store);

export default store;

export const reduxStore = configureStore({
  reducer,
});

export const useSelector: TypedUseSelectorHook<RootState> = (
  selector,
  equalityFn = isEqual,
) => useReduxSelector(selector, equalityFn as any);

export const useDispatch: () => AppDispatch = useReduxDispatch;

export type RootStore = typeof reduxStore;
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
