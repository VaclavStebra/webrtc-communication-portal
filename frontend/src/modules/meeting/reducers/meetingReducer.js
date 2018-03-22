import * as types from '../constants/ActionTypes';

const initialState = {
  data: {
    meetings: []
  },
  uiState: {
    fetchInProgress: false,
    fetchFailure: false,
    createInProgress: false,
    createFailure: false
  }
};

function handleFetchStart(state) {
  const uiState = { ...state.uiState };
  const data = { ...state.data };

  uiState.fetchInProgress = true;
  uiState.fetchFailure = false;

  return {
    data,
    uiState
  };
}

function handleFetchFailure(state) {
  const uiState = { ...state.uiState };
  const data = { ...state.data };

  uiState.fetchInProgress = false;
  uiState.fetchFailure = true;

  return {
    data,
    uiState
  };
}

function handleFetchSuccess(state, action) {
  const uiState = { ...state.uiState };

  uiState.fetchInProgress = false;
  uiState.fetchFailure = false;

  return {
    data: {
      meetings: action.meetings
    },
    uiState
  };
}

function handleCreateStart(state) {
  const uiState = { ...state.uiState };
  const data = { ...state.data };

  uiState.createInProgress = true;
  uiState.createFailure = false;

  return {
    data,
    uiState
  };
}

function handleCreateFailure(state) {
  const uiState = { ...state.uiState };
  const data = { ...state.data };

  uiState.createInProgress = false;
  uiState.createFailure = true;

  return {
    data,
    uiState
  };
}

function handleCreateSuccess(state) {
  const uiState = { ...state.uiState };
  const data = { ...state.data };

  uiState.createInProgress = false;
  uiState.createFailure = false;

  return {
    data,
    uiState
  };
}

export function meetingReducer(state = initialState, action) {
  switch (action.type) {
    case types.MEETINGS_FETCH_START:
      return handleFetchStart(state);
    case types.MEETINGS_FETCH_FAILURE:
      return handleFetchFailure(state);
    case types.MEETINGS_FETCH_SUCCESS:
      return handleFetchSuccess(state, action);
    case types.MEETING_CREATE_START:
      return handleCreateStart(state);
    case types.MEETING_CREATE_FAILURE:
      return handleCreateFailure(state);
    case types.MEETING_CREATE_SUCCESS:
      return handleCreateSuccess(state);
    default:
      return state;
  }
}

export default {
  meetingReducer
};
