export function userReducer(state = {}, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        email: action.user.email
      };
    default:
      return state;
  }
}

export default {
  userReducer
};
