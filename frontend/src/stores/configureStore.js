import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers/index';
import tokenStore from '../modules/user/middleware/tokenStore';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger, tokenStore)(createStore);

export default function configureStore() {
  return createStoreWithMiddleware(rootReducer);
}
