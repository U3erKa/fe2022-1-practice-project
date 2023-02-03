import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { initSocket } from '../api/ws/socketController';

const store = configureStore({
  reducer: rootReducer,
});

initSocket(store);

export default store;
