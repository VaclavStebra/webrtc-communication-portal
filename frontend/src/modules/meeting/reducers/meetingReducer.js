import * as types from '../constants/ActionTypes';

const initialState = {
  data: {
    meetings: []
  },
  uiState: {
    fetchInProgress: false,
    fetchFailure: false
  }
};

function handleFetchStart(state) {
  return {
    data: {
      meetings: state.data.meetings.slice()
    },
    uiState: {
      fetchInProgress: true,
      fetchFailure: false
    }
  };
}

function handleFetchFailure(state) {
  return {
    data: {
      meetings: state.data.meetings.slice()
    },
    uiState: {
      fetchInProgress: false,
      fetchFailure: true
    }
  };
}

function handleFetchSuccess(action) {
  return {
    data: {
      meetings: action.meetings
    },
    uiState: {
      fetchInProgress: false,
      fetchFailure: false
    }
  };
}

export function meetingReducer(state = initialState, action) {
  switch (action.type) {
    case types.MEETINGS_FETCH_START:
      return handleFetchStart(state);
    case types.MEETINGS_FETCH_FAILURE:
      return handleFetchFailure(state);
    case types.MEETINGS_FETCH_SUCCESS:
      return handleFetchSuccess(action);
    default:
      return state;
  }
}

export default {
  meetingReducer
};
