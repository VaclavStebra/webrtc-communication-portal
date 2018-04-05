import * as types from '../constants/ActionTypes';

const initialState = {
  local: null,
  others: []
};

function handleLocalStreamStarted(state, action) {
  const others = state.others.slice();

  return {
    local: action.stream,
    others
  };
}

export function videoReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOCAL_STREAM_STARTED:
      return handleLocalStreamStarted(state, action);
    default:
      return state;
  }
}

export default {
  videoReducer
};
