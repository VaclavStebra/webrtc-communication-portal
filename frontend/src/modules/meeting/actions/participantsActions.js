import * as types from '../constants/ActionTypes';

export function addParticipant(user) {
  return {
    type: types.ADD_PARTICIPANT,
    user
  };
}

export function removeParticipant(user) {
  return {
    type: types.REMOVE_PARTICIPANT,
    user
  };
}
