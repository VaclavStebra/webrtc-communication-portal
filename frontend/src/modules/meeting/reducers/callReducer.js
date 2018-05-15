import * as types from '../constants/ActionTypes';

const initialState = {
  audioEnabled: true,
  videoEnabled: true,
  screenShareEnabled: false
};

export function callReducer(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_VIDEO:
      return {
        audioEnabled: state.audioEnabled,
        videoEnabled: !state.videoEnabled,
        screenShareEnabled: state.screenShareEnabled
      };
    case types.TOGGLE_AUDIO:
      return {
        audioEnabled: !state.audioEnabled,
        videoEnabled: state.videoEnabled,
        screenShareEnabled: state.screenShareEnabled
      };
    case types.TOGGLE_SCREENSHARE:
      return {
        audioEnabled: state.audioEnabled,
        videoEnabled: state.videoEnabled,
        screenShareEnabled: !state.screenShareEnabled
      };
    default:
      return state;
  }
}

export default {
  callReducer
};
