import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from '../reducers/index';

const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

export default function configureStore() {
  return createStoreWithMiddleware(rootReducer);
}
