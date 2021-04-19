const express = require('express');
const axios = require('axios');
const User = require('../models/user');
const auth = require('../middleware/auth');

const stockController = require('../controllers/stockController');

const stockRouter = new express.Router();

stockRouter.post('/buy', auth, stockController.buyStock);

stockRouter.post('/sell', auth, async (req, res) => {
  let {ticker, quantity} = req.body;
  ticker = ticker.toUpperCase();
  quantity = Number(quantity);

  if (process.env.NODE_ENV === 'production') {
    var apiUrl = `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${process.env.iexToken}`;
  } else {
    var apiUrl = `https://sandbox.iexapis.com/stable/stock/${ticker}/quote?token=${process.env.iexSandboxToken}`;
  }

  try {
    if (!Number.isInteger(quantity) || quantity < 0 ) {
      throw new Error('Quantity is not a whole number!');
    }

    let {balance, portfolio, transactions} = req.user;
    const {data} = await axios.get(apiUrl);
    const {latestPrice} = data;
    const totalPrice = latestPrice * quantity;

    // Check if the user has enoough of a certain stock
    const stockIndex = portfolio.findIndex(stock => stock.ticker === ticker && stock.quantity >= quantity);
    if (stockIndex === -1) {
      throw new Error('Cannot sell this stock!');
    }

    balance += totalPrice;
    transactions.push({type: 'SELL', ticker, quantity, price: latestPrice, date: new Date()});

    const stock = portfolio[stockIndex];
    if (stock.quantity === quantity) {
      portfolio.splice(stockIndex, 1);
    } else {
      stock.quantity -= quantity;
    }

    await User.findByIdAndUpdate(req.user.id, {transactions, balance, portfolio});
    res.status(201).send('Good!');
  } catch(error) {
    res.status(400).send({message: error.message});
  }
});

stockRouter.get('/:ticker/company', auth, async (req, res) => {
  const {ticker} = req.params;

  if (process.env.NODE_ENV === 'production') {
    var apiUrl = `https://cloud.iexapis.com/stable/stock/${ticker}/company?token=${process.env.iexToken}`;
  } else {
    var apiUrl = `https://sandbox.iexapis.com/stable/stock/${ticker}/company?token=${process.env.iexSandboxToken}`;
  }

  try {
    const {data} = await axios.get(apiUrl);
    res.status(200).send(data);
  } catch(error) {
    res.status(400).send({message: error.message});
  }
});

module.exports = stockRouter;
