const jwt = require('jsonwebtoken');

const constants = require('../../config/constants');

class UserToken {
  constructor(id, email) {
    this.id = id;
    this.email = email;
  }

  getToken() {
    if (!this.id || !this.email) {
      return null;
    }

    return jwt.sign({ id: this.id, email: this.email }, constants.JWT_SECRET);
  }
}

module.exports = UserToken;
