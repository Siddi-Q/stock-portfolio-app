const express = require('express');
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

const authRouter = new express.Router();

authRouter.post('/register', authController.registerNewUser);

authRouter.post('/signin', authController.signinUser);

authRouter.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch {
    res.status(500).send();
  }
});

authRouter.post('/verify', auth, (req, res) => {
  try {
    res.send(true);
  } catch (error) {
    res.status(500).send({message: 'Server error!'});
  }
});

module.exports = authRouter;
