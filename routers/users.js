const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');

const usersController = require('../controllers/usersController');

const userRouter = new express.Router();

userRouter.get('/portfolio', auth, usersController.getPortfolio);

userRouter.get('/transactions', auth, usersController.getTransactions);

module.exports = userRouter;
