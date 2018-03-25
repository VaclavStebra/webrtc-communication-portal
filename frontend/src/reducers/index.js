import { combineReducers } from 'redux';

import { userReducer } from '../modules/user/reducers/userReducer';
import { meetingReducer } from '../modules/meeting/reducers/meetingReducer';

const rootReducer = combineReducers({
  user: userReducer,
  meeting: meetingReducer
});

export default rootReducer;
