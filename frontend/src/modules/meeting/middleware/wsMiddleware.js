import { SEND_CHAT_MESSAGE } from '../constants/ActionTypes';

export default () => next => (action) => {
  if (action.type === SEND_CHAT_MESSAGE) {
    window.socket.emit('chat message', action.message);
  }

  return next(action);
};
