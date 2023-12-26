import {
  configureStore,
  type ThunkAction,
  type Action,
} from '@reduxjs/toolkit';
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

export type RootStore = typeof reduxStore;
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
