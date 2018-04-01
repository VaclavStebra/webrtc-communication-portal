import * as types from '../constants/ActionTypes';

const initialState = [];

function handleAddChatMessage(state, action) {
  const data = state.slice();

  data.push(action.message);

  return data;
}

export function chatMessagesReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_CHAT_MESSAGE:
      return handleAddChatMessage(state, action);
    default:
      return state;
  }
}

export default {
  chatMessagesReducer
};
