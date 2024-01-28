import {
  configureStore,
  type Action,
  type ThunkAction,
} from '@reduxjs/toolkit';
import { initSocket } from 'api/ws/socketController';
import reducer from './reducer';

export const reduxStore = configureStore({
  reducer,
});

initSocket(reduxStore);

export type RootStore = typeof reduxStore;
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
