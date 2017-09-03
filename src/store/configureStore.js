import { createStore, applyMiddleware, compose } from 'redux';
// mport createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

// const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

// const middleware = [loggerMiddleware, sagaMiddleware];

// logger generates too much state changes, due to resize
const middleware = [sagaMiddleware];

export default function configureStore(preloadedState = {}) {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  sagaMiddleware.run(rootSaga);

  return store;
}
