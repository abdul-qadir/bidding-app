import { createStore, applyMiddleware } from 'redux';
import appReducer from './appReducer';

const logger = store => next => action => next(action);

const appStore = createStore(
  appReducer,
  applyMiddleware(logger) // enhance the store with the logger middleware
);

export default appStore;
