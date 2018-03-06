import { combineReducers } from 'redux';
import { userReducer } from '../modules/user/reducers/userReducer';

const rootReducer = combineReducers({
  user: userReducer
});

export default rootReducer;
