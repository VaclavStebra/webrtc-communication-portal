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
  const newUIState = { ...state.uiState };
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
    case types.LOGIN_UI_RESET:
      newUIState.loginInProgress = false;
      newUIState.loginFailure = false;

      return {
        data: state.data,
        uiState: newUIState
      };
    case types.SIGNUP_UI_RESET:
      newUIState.signUpInProgress = false;
      newUIState.signUpFailure = false;

      return {
        data: state.data,
        uiState: newUIState
      };
    default:
      return state;
  }
}

export default {
  userReducer
};
