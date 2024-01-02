import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/authFeature/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
