import * as types from '../constants/ActionTypes';

export function addChatMessage(message) {
  return {
    type: types.ADD_CHAT_MESSAGE,
    message
  };
}

export default {
  addChatMessage
};
