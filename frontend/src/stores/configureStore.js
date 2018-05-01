import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';

import rootReducer from '../reducers/index';
import tokenStore from '../modules/user/middleware/tokenStore';
import wsMiddleware from '../modules/meeting/middleware/wsMiddleware';

const history = createHistory();
const middleware = routerMiddleware(history);

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  logger,
  tokenStore,
  wsMiddleware,
  middleware
)(createStore);

export default function configureStore() {
  return createStoreWithMiddleware(rootReducer);
}

export { history };
