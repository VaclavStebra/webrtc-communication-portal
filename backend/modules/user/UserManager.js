const users = require('../../mock/users');

class UserManager {
  getUser(email, password) {
    return users.find(user => {
      return user.email === email && user.password === password;
    });
  }
}

module.exports = UserManager;
