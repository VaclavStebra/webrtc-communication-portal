import * as types from '../constants/ActionTypes';

const initialUiState = {
  loginFailure: false,
  loginInProgress: false,
  signUpFailure: false,
  signUpInProgress: false
};

const initialState = {
  data: null,
  uiState: initialUiState
};

export function userReducer(state = initialState, action) {
  const uiState = { ...initialUiState };

  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        data: {
          email: action.email
        },
        uiState
      };
    case types.LOGIN_FAILURE:
      uiState.loginFailure = true;

      return {
        data: null,
        uiState
      };
    case types.LOGIN_START:
      uiState.loginInProgress = true;

      return {
        data: null,
        uiState
      };
    case types.SIGNUP_FAILURE:
      uiState.signUpFailure = true;

      return {
        data: null,
        uiState
      };
    case types.SIGNUP_START:
      uiState.signUpInProgress = true;

      return {
        data: null,
        uiState
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
