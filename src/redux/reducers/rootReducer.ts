import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/authFeature/authSlice';
import modal from './features/modalFeature/modalSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  modal,
});

export default rootReducer;
