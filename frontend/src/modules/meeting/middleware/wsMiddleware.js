import { SEND_CHAT_MESSAGE, FILE_UPLOADED } from '../constants/ActionTypes';

export default () => next => (action) => {
  if (action.type === SEND_CHAT_MESSAGE) {
    window.socket.emit('chat message', action.message);
  } else if (action.type === FILE_UPLOADED) {
    window.socket.emit('file uploaded', action.name);
  }

  return next(action);
};
