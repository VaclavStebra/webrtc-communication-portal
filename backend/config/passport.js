'use strict';

const passportJwt = require('passport-jwt');

const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

const UserManager = require('../modules/user/UserManager');
const constants = require('../config/constants');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: constants.JWT_SECRET
};

const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
  const userManager = new UserManager();

  try {
    const user = await userManager.findById(jwt_payload.id);
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  } catch (ex) {
    next(ex, null);
  }
});

module.exports = (passport) => {
  passport.use(strategy);
};
