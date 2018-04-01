import * as types from '../constants/ActionTypes';

export function addChatMessage(message) {
  return {
    type: types.ADD_CHAT_MESSAGE,
    message
  };
}

export function sendChatMessage(message) {
  return {
    type: types.SEND_CHAT_MESSAGE,
    message
  };
}
