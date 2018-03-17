let users = [
  {
    email: 'john.doe@email.com',
    password: 'password'
  }
];

class UserManager {
  getUser(email, password) {
    const user = users.find(user => {
      return user.email === email && user.password === password;
    });

    return user ? user : null;
  }
}

module.exports = UserManager;