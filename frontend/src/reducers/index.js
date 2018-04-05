import { combineReducers } from 'redux';

import { userReducer } from '../modules/user/reducers/userReducer';
import { meetingReducer } from '../modules/meeting/reducers/meetingReducer';
import { participantsReducer } from '../modules/meeting/reducers/participantsReducer';
import { chatMessagesReducer } from '../modules/meeting/reducers/chatMessagesReducer';
import { videoReducer } from '../modules/meeting/reducers/videoReducer';

const rootReducer = combineReducers({
  user: userReducer,
  meeting: meetingReducer,
  participants: participantsReducer,
  messages: chatMessagesReducer,
  videoStreams: videoReducer
});

export default rootReducer;
