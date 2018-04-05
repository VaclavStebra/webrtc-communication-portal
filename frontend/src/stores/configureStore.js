import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers/index';
import tokenStore from '../modules/user/middleware/tokenStore';
import wsMiddleware from '../modules/meeting/middleware/wsMiddleware';
import webRtcMiddleware from '../modules/meeting/middleware/webRtcMiddleware';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  logger,
  tokenStore,
  wsMiddleware,
  webRtcMiddleware
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default function configureStore() {
  return store;
}
