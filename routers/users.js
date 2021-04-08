const express = require('express');
const axios = require('axios');
const User = require('../models/user');
const auth = require('../middleware/auth');

const userRouter = new express.Router();

// Todo: Cleanup
userRouter.get('/portfolio', auth, async (req, res) => {
    try {
        const portfolioList = req.user.portfolio;
        const balance = req.user.balance;
        let totalPortfolioPrice = 0;

        // Get list of ticker symbols in the user's portfolio
        let symbols = [];
        for(let i = 0; i < portfolioList.length; i++) {
            symbols.push(portfolioList[i].ticker.toUpperCase());
        }

        if(symbols.length > 0) {
            let symbolsString = symbols.join();
            
            if(process.env.NODE_ENV === "production"){
                var api_url = `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbolsString}&types=quote&token=${process.env.iexToken}`;
            } else {
                var api_url = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbolsString}&types=quote&token=${process.env.iexSandboxToken}`;
            }

            const response = await axios.get(api_url);

            // For each stock, get the latest and open prices
            for(let i = 0; i < portfolioList.length; i++) {
                let {latestPrice, open: openPrice} = response.data[portfolioList[i].ticker].quote;

                portfolioList[i].totalPrice = latestPrice * portfolioList[i].quantity;
                totalPortfolioPrice += portfolioList[i].totalPrice;
                // Set stock's current performance
                if(latestPrice < openPrice) {
                    portfolioList[i].performance = "less";
                }
                else if(latestPrice == openPrice) {
                    portfolioList[i].performance = "equal";
                }
                else {
                    portfolioList[i].performance = "greater";
                }
            }
        }
        res.send({portfolioList, balance, totalPortfolioPrice});
    } catch (error) {
        console.error(error);
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