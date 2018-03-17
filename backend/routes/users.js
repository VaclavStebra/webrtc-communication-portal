const express = require('express');
const router = express.Router();

const UserManager = require('../modules/user/UserManager');
const TokenManager = require('../modules/user/TokenManager');

router.post('/token', function(req, res) {
  const { email, password } = req.body;

  const userManager = new UserManager();
  const user = userManager.getUser(email, password);

  const tokenManager = new TokenManager();
  const token = user ? tokenManager.getToken(user.email) : null;

  return res.json({token});
});

module.exports = router;
