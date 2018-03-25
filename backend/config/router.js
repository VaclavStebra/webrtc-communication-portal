'use strict';

const index = require('../routes/index');
const users = require('../routes/users');

module.exports = function(app) {
  app.use('/', index);
  app.use('/users', users);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {
    //res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json({error: err.message});
  });
};
