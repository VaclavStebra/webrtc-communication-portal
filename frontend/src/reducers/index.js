import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';

import { userReducer } from '../modules/user/reducers/userReducer';
import { meetingReducer } from '../modules/meeting/reducers/meetingReducer';
import { participantsReducer } from '../modules/meeting/reducers/participantsReducer';
import { chatMessagesReducer } from '../modules/meeting/reducers/chatMessagesReducer';
import { uploadedFileReducer } from '../modules/meeting/reducers/uploadedFilesReducer';
import { callReducer } from '../modules/meeting/reducers/callReducer';

const rootReducer = combineReducers({
  user: userReducer,
  meeting: meetingReducer,
  participants: participantsReducer,
  messages: chatMessagesReducer,
  files: uploadedFileReducer,
  callState: callReducer,
  router: routerReducer
});

export default rootReducer;
