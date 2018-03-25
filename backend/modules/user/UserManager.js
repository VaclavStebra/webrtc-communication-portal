'use strict';

const crypto = require('crypto');

const mongoose = require('mongoose');

const User = mongoose.model('User');

class UserManager {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async getUser() {
    const options = {
      criteria: { email: this.email },
      select: 'email hashed_password'
    };

    const user = await User.findOne(options.criteria).select(options.select).exec();
    if (!user) {
      return null;
    }

    const hash = this.getHash();

    if (user.hashed_password !== hash) {
      return null;
    }

    return user;
  }

  createUser() {
    const hashedPassword = this.getHash();
    const user = new User({
      email: this.email,
      hashed_password: hashedPassword
    });

    return user.save();
  }

  getHash() {
    return crypto.createHmac('sha256', 'secret').update(this.password).digest('hex');
  }
}

module.exports = UserManager;
