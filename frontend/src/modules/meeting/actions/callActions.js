import * as types from '../constants/ActionTypes';

export function toggleAudio() {
  return {
    type: types.TOGGLE_AUDIO
  };
}

export function toggleVideo() {
  return {
    type: types.TOGGLE_VIDEO
  };
}
