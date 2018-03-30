import * as types from '../constants/ActionTypes';

const initialState = [];

function handleAddParticipant(state, action) {
  const data = state.slice();
  const { user } = action;

  const participant = data.find(p => p.id === user.id);

  if (!participant) {
    data.push(user);
  }

  return data;
}

function handleRemoveParticipant(state, action) {
  const data = state.slice();
  const { user } = action;

  return data.filter(p => p.id !== user.id);
}

export function participantsReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_PARTICIPANT:
      return handleAddParticipant(state, action);
    case types.REMOVE_PARTICIPANT:
      return handleRemoveParticipant(state, action);
    default:
      return state;
  }
}

export default {
  participantsReducer
};
