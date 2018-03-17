import { LOGIN_SUCCESS, LOGOUT } from '../constants/ActionTypes';

export default () => next => (action) => {
  if (action.type === LOGIN_SUCCESS) {
    sessionStorage.setItem('token', action.token);
  } else if (action.type === LOGOUT) {
    sessionStorage.removeItem('token');
  }

  return next(action);
};
