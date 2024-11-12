import {combineReducers} from '@reduxjs/toolkit';
import {resourceRootReducer} from './resource/slices';

export const rootReducer = combineReducers({
  resource: resourceRootReducer,
});
