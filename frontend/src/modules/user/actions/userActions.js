import 'cross-fetch/polyfill';

import * as types from '../constants/ActionTypes';

import { post } from '../../../utils/fetchHelpers';

export function loginUIReset() {
  return {
    type: types.LOGIN_UI_RESET
  };
}

export function signupUIReset() {
  return {
    type: types.SIGNUP_UI_RESET
  };
}

export function loginStart() {
  return {
    type: types.LOGIN_START
  };
}

export function loginSuccess(token) {
  return {
    type: types.LOGIN_SUCCESS,
    token
  };
}

export function loginFailure() {
  return {
    type: types.LOGIN_FAILURE
  };
}

export function signupFailure() {
  return {
    type: types.SIGNUP_FAILURE
  };
}

export function signupStart() {
  return {
    type: types.SIGNUP_START
  };
}

export function logout() {
  return {
    type: types.LOGOUT
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(loginStart());

    return post('/users/token', { email, password })
      .then((body) => {
        if (body.error || !body.token) {
          dispatch(loginFailure());
        } else {
          dispatch(loginSuccess(body.token));
        }
      })
      .catch(() => dispatch(loginFailure()));
  };
}

export function signup(email, password) {
  return (dispatch) => {
    dispatch(signupStart());

    return post('/users/signup', { email, password })
      .then((body) => {
        if (body.error) {
          dispatch(signupFailure());
        } else {
          dispatch(loginSuccess(body.token));
        }
      })
      .catch(() => dispatch(signupFailure()));
  };
}
