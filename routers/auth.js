const express = require('express');
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

const authRouter = new express.Router();

authRouter.post('/register', authController.registerNewUser);

authRouter.post('/signin', authController.signinUser);

authRouter.post('/logout', auth, authController.logoutUser);

authRouter.post('/verify', auth, authController.verifyUser);

module.exports = authRouter;
