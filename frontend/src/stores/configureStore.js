import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers/index';
import tokenStore from '../modules/user/middleware/tokenStore';
import wsMiddleware from '../modules/meeting/middleware/wsMiddleware';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  logger,
  tokenStore,
  wsMiddleware
)(createStore);

export default function configureStore() {
  return createStoreWithMiddleware(rootReducer);
}
