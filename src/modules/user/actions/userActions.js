export function login(email) {
  return {
    type: 'LOGIN',
    user: {
      email
    }
  };
}

export default {
  login
};
