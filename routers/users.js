const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');

const userRouter = new express.Router();

userRouter.get('/portfolio', auth, async (req, res) => {
  try {
    const {portfolio: portfolioList, balance} = req.user;
    let totalPortfolioPrice = 0;

    // Get list of ticker symbols in the user's portfolio
    const symbols = portfolioList.map(portfolioItem => portfolioItem.ticker.toUpperCase());

    if (symbols.length > 0) {
      let symbolsString = symbols.join();

      if (process.env.NODE_ENV === 'production') {
        var apiUrl = `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbolsString}&types=quote&token=${process.env.iexToken}`;
      } else {
        var apiUrl = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbolsString}&types=quote&token=${process.env.iexSandboxToken}`;
      }

      const response = await axios.get(apiUrl);

      // For each stock, get the latest and open prices
      for (let i = 0; i < portfolioList.length; i++) {
        let {latestPrice, open: openPrice} = response.data[portfolioList[i].ticker].quote;

        portfolioList[i].totalPrice = latestPrice * portfolioList[i].quantity;
        totalPortfolioPrice += portfolioList[i].totalPrice;
        // Set stock's current performance
        if (latestPrice < openPrice) {
          portfolioList[i].performance = 'less';
        } else if (latestPrice == openPrice) {
          portfolioList[i].performance = 'equal';
        } else {
          portfolioList[i].performance = 'greater';
        }
      }
    }

    res.send({portfolioList, balance, totalPortfolioPrice});
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.get('/transactions', auth, async (req, res) => {
  try {
    const transactions = req.user.transactions;
    res.send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = userRouter;
