import { combineReducers } from 'redux';

import { userReducer } from '../modules/user/reducers/userReducer';
import { meetingReducer } from '../modules/meeting/reducers/meetingReducer';
import { participantsReducer } from '../modules/meeting/reducers/participantsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  meeting: meetingReducer,
  participants: participantsReducer
});

export default rootReducer;
