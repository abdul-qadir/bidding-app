import { combineReducers } from 'redux';
import app from './app';

const todoApp = combineReducers({
  app,
});

export default todoApp;
