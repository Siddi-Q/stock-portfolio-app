const axios = require('axios');

const User = require('../models/user');

const buyStock = async (req, res) => {
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
    const response = await axios.get(apiUrl);
    const {latestPrice} = response.data;
    const totalPrice = latestPrice * quantity;

    // Check if the user has enough cash to make the purchase.
    if (totalPrice > balance) {
      throw new Error('Purchase amount is greater than your balance!');
    }

    balance -= totalPrice;
    transactions.push({type: 'BUY', ticker, quantity, price: latestPrice, date: new Date()});

    const stockIndex = portfolio.findIndex(stock => stock.ticker.toUpperCase() === ticker);
    if (stockIndex === -1) {
      portfolio.push({ticker, quantity});
    } else {
      portfolio[stockIndex].quantity += quantity;
    }

    await User.findByIdAndUpdate(req.user.id, {transactions, balance, portfolio});
    res.status(201).send('Good!');
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = {
    buyStock,
}
