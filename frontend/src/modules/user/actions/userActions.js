import 'cross-fetch/polyfill';

import { API_URL } from '../../../../config/config';
import * as types from '../constants/ActionTypes';

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

    return fetch(`${API_URL}/users/token`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .then((body) => {
        if (body.error) {
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

    return fetch(`${API_URL}/users/signup`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      heaedrs: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
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
