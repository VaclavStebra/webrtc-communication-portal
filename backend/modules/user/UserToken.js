const jwt = require('jsonwebtoken');

const constants = require('../../config/constants');

class UserToken {
  constructor(email) {
    this.email = email;
  }

  getToken() {
    if (!this.email) {
      return null;
    }

    return jwt.sign({ email: this.email }, constants.JWT_SECRET);
  }
}

module.exports = UserToken;
