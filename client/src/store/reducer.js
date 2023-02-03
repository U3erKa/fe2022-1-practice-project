import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import dataForContestReducer from './slices/dataForContestSlice';
import paymentReducer from './slices/paymentSlice';
import contestsReducer from './slices/contestsSlice';
import contestCreationReducer from './slices/contestCreationSlice';
import bundleReducer from './slices/bundleSlice';
import contestByIdReducer from './slices/contestByIdSlice';
import contestUpdationReducer from './slices/contestUpdationSlice';
import chatReducer from './slices/chatSlice';
import userProfileReducer from './slices/userProfileSlice';

const rootReducer = combineReducers({
  userStore: userReducer,
  auth: authReducer,
  dataForContest: dataForContestReducer,
  payment: paymentReducer,
  contestByIdStore: contestByIdReducer,
  contestsList: contestsReducer,
  contestCreationStore: contestCreationReducer,
  bundleStore: bundleReducer,
  contestUpdationStore: contestUpdationReducer,
  chatStore: chatReducer,
  userProfile: userProfileReducer,
});

export default rootReducer;
