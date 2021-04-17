const express = require('express');
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

const authRouter = new express.Router();

authRouter.post('/register', authController.registerNewUser);

authRouter.post('/signin', authController.signinUser);

authRouter.post('/logout', auth, authController.logoutUser);

authRouter.post('/verify', auth, (req, res) => {
  try {
    res.send(true);
  } catch (error) {
    res.status(500).send({message: 'Server error!'});
  }
});

module.exports = authRouter;
