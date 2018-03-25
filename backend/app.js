const express = require('express');
const passport = require('passport');

const app = express();

require('./modules/user/models/user');

require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/router')(app);

module.exports = app;
