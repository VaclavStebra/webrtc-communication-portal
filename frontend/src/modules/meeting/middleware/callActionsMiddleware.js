import { TOGGLE_AUDIO, TOGGLE_VIDEO } from '../constants/ActionTypes';

import { toggleAudio, toggleVideo } from '../../../sockets';

export default () => next => (action) => {
  if (action.type === TOGGLE_AUDIO) {
    toggleAudio();
  } else if (action.type === TOGGLE_VIDEO) {
    toggleVideo();
  }

  return next(action);
};
