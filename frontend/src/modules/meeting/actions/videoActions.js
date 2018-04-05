import * as types from '../constants/ActionTypes';

export function localStreamStarted(stream) {
  return {
    type: types.LOCAL_STREAM_STARTED,
    stream
  };
}

export default {
  localStreamStarted
};
