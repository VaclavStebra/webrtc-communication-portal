import { TOGGLE_AUDIO, TOGGLE_SCREENSHARE, TOGGLE_VIDEO } from '../constants/ActionTypes';

import { toggleAudio, toggleVideo, toggleScreenSharing } from '../../../sockets';

export default () => next => (action) => {
  if (action.type === TOGGLE_AUDIO) {
    toggleAudio();
  } else if (action.type === TOGGLE_VIDEO) {
    toggleVideo();
  } else if (action.type === TOGGLE_SCREENSHARE) {
    toggleScreenSharing();
  }

  return next(action);
};
