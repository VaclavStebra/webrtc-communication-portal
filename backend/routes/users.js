const express = require('express');
const router = express.Router();

const UserManager = require('../modules/user/UserManager');
const UserToken = require('../modules/user/UserToken');

router.post('/token', async function (req, res) {
  const { email, password } = req.body;

  const userManager = new UserManager(email, password);
  const user = await userManager.getUser();

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const tokenManager = new UserToken(user.email);
  const token = tokenManager.getToken();

  return res.json({ token });
});

router.post('/signup', async function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: 'Invalid credentials '});
  }

  const userManager = new UserManager(email, password);
  await userManager.createUser();

  const tokenManager = new UserToken(email);
  const token = tokenManager.getToken();

  return res.json({ token });
});

module.exports = router;
