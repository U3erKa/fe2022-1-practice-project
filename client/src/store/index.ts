import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducer';
import { initSocket } from 'api/ws/socketController';

const store = configureStore({
  reducer: rootReducer,
});

initSocket(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
