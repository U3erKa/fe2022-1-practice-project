import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bundleReducer from './slices/bundleSlice';
import chatReducer from './slices/chatSlice';
import contestByIdReducer from './slices/contestByIdSlice';
import contestCreationReducer from './slices/contestCreationSlice';
import contestsReducer from './slices/contestsSlice';
import contestUpdationReducer from './slices/contestUpdationSlice';
import dataForContestReducer from './slices/dataForContestSlice';
import eventReducer from './slices/eventSlice';
import paymentReducer from './slices/paymentSlice';
import userProfileReducer from './slices/userProfileSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  bundleStore: bundleReducer,
  chatStore: chatReducer,
  contestByIdStore: contestByIdReducer,
  contestCreationStore: contestCreationReducer,
  contestUpdationStore: contestUpdationReducer,
  contestsList: contestsReducer,
  dataForContest: dataForContestReducer,
  events: eventReducer,
  payment: paymentReducer,
  userProfile: userProfileReducer,
  userStore: userReducer,
});

export default rootReducer;
