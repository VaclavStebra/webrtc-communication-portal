const jwt = require('jsonwebtoken');

const constants = require('../../config/constants');

class TokenManager {
  getToken(email) {
    return jwt.sign({ email: email }, constants.JWT_SECRET);
  }
}

module.exports = TokenManager;