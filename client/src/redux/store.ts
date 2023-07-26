import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas/rootSaga';
import rootReducer from './reducers/rootReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnchanters = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ?? compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnchanters(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);

export default store;
