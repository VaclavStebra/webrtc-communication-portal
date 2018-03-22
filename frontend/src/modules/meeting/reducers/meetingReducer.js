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
  return {
    data: {
      meetings: state.data.meetings.slice()
    },
    uiState: {
      fetchInProgress: true,
      fetchFailure: false,
      createInProgress: false,
      createFailure: false
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
      fetchFailure: true,
      createInProgress: false,
      createFailure: false
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
      fetchFailure: false,
      createInProgress: false,
      createFailure: false
    }
  };
}

function handleCreateStart(state) {
  return {
    data: {
      meetings: state.data.meetings.slice()
    },
    uiState: {
      fetchInProgress: false,
      fetchFailure: false,
      createInProgress: true,
      createFailure: false
    }
  };
}

function handleCreateFailure(state) {
  return {
    data: {
      meetings: state.data.meetings.slice()
    },
    uiState: {
      fetchInProgress: false,
      fetchFailure: false,
      createInProgress: false,
      createFailure: true
    }
  };
}

function handleCreateSuccess(state) {
  return {
    data: {
      meetings: state.data.meetings.slice()
    },
    uiState: {
      fetchInProgress: false,
      fetchFailure: false,
      createInProgress: false,
      createFailure: false
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
