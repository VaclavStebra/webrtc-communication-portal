const express = require('express');
const router = express.Router();

const UserManager = require('../modules/user/UserManager');
const UserToken = require('../modules/user/UserToken');

router.post('/token', async function (req, res, next) {
  const { email, password } = req.body;

  const userManager = new UserManager(email, password);

  try {
    const user = await userManager.getUser();

    if (!user) {
      return next({ status: 401, message: 'Invalid credentials' });
    }

    const tokenManager = new UserToken(user._id, user.email);
    const token = tokenManager.getToken();

    return res.json({ token });
  } catch (ex) {
    return next(ex);
  }
});

router.post('/signup', async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next({ status: 422, message: 'Invalid credentials' });
  }

  const userManager = new UserManager(email, password);

  try {
    await userManager.createUser();

    const tokenManager = new UserToken(email);
    const token = tokenManager.getToken();

    return res.json({ token });
  } catch (ex) {
    return next(ex);
  }
});

module.exports = router;
