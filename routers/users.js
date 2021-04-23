const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');

const usersController = require('../controllers/usersController');

const userRouter = new express.Router();

userRouter.get('/portfolio', auth, usersController.getPortfolio);

userRouter.get('/transactions', auth, async (req, res) => {
  try {
    const transactions = req.user.transactions;
    res.send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = userRouter;
