'use strict';

const passportJwt = require('passport-jwt');

const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

const users = require('../mock/users');
const constants = require('../config/constants');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: constants.JWT_SECRET
};

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  const user = users.find(user => user.email === jwt_payload.email);

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

module.exports = (passport) => {
  passport.use(strategy);
};
