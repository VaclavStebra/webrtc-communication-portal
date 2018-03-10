import * as types from '../constants/ActionTypes';

export function loginStart() {
  return {
    type: types.LOGIN_START
  };
}

export function loginSuccess(email) {
  return {
    type: types.LOGIN_SUCCESS,
    email
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
    // TODO api call here
    const promise = new Promise((resolve, reject) => {
      const functionToCall = (password === 'password') ? resolve : reject;

      setTimeout(functionToCall, 1000);
    });

    return promise
      .then(() => {
        dispatch(loginSuccess(email));
      })
      .catch(() => {
        dispatch(loginFailure());
      });
  };
}

export function signup(email, password) {
  return (dispatch) => {
    dispatch(signupStart());
    // TODO api call here
    const promise = new Promise((resolve, reject) => {
      const functionToCall = (password === 'password') ? resolve : reject;

      setTimeout(functionToCall, 1000);
    });

    return promise
      .then(() => {
        dispatch(loginSuccess(email));
      })
      .catch(() => {
        dispatch(signupFailure());
      });
  };
}

export default {
  login
};
