import { combineReducers } from '@reduxjs/toolkit';
import featureReducer from './features/featureTest/slice';

const rootReducer = combineReducers({
  feature: featureReducer,
});

export default rootReducer;
