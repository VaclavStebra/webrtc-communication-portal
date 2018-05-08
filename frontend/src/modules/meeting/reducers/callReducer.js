import * as types from '../constants/ActionTypes';

const initialState = {
  audioEnabled: true,
  videoEnabled: true
};

export function callReducer(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_VIDEO:
      return {
        audioEnabled: state.audioEnabled,
        videoEnabled: !state.videoEnabled
      };
    case types.TOGGLE_AUDIO:
      return {
        audioEnabled: !state.audioEnabled,
        videoEnabled: state.videoEnabled
      };
    default:
      return state;
  }
}

export default {
  callReducer
};
