import * as types from '../constants/ActionTypes';

const initialState = {
  data: {},
  uiState: {
    loginFailure: false,
    loginInProgress: false
  }
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        data: {
          email: action.email
        },
        uiState: {
          loginFailure: false,
          loginInProgress: false
        }
      };
    case types.LOGIN_FAILURE:
      return {
        data: {},
        uiState: {
          loginFailure: true,
          loginInProgress: false
        }
      };
    case types.LOGIN_START:
      return {
        data: {},
        uiState: {
          loginFailure: false,
          loginInProgress: true
        }
      };
    default:
      return state;
  }
}

export default {
  userReducer
};
