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

export default {
  login
};
