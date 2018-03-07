import * as types from '../constants/ActionTypes';

const initialState = {
  data: null,
  uiState: {
    loginFailure: false,
    loginInProgress: false,
    signUpFailure: false,
    signUpInProgress: false
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
          loginInProgress: false,
          signUpFailure: false,
          signUpInProgress: false
        }
      };
    case types.LOGIN_FAILURE:
      return {
        data: null,
        uiState: {
          loginFailure: true,
          loginInProgress: false,
          signUpFailure: false,
          signUpInProgress: false
        }
      };
    case types.LOGIN_START:
      return {
        data: null,
        uiState: {
          loginFailure: false,
          loginInProgress: true,
          signUpFailure: false,
          signUpInProgress: false
        }
      };
    case types.SIGNUP_FAILURE:
      return {
        data: null,
        uiState: {
          loginFailure: false,
          loginInProgress: false,
          signUpFailure: true,
          signUpInProgress: false
        }
      };
    case types.SIGNUP_START:
      return {
        data: null,
        uiState: {
          loginFailure: false,
          loginInProgress: false,
          signUpFailure: false,
          signUpInProgress: true
        }
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default {
  userReducer
};
