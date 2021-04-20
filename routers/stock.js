const express = require('express');
const axios = require('axios');
const User = require('../models/user');
const auth = require('../middleware/auth');

const stockController = require('../controllers/stockController');

const stockRouter = new express.Router();

stockRouter.post('/buy', auth, stockController.buyStock);

stockRouter.post('/sell', auth, stockController.sellStock);

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
