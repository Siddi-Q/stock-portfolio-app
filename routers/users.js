const express = require('express');
const axios = require('axios');
const User = require('../models/user');
const auth = require('../middleware/auth');

const userRouter = new express.Router();

// Todo: cleanup
userRouter.post('/buy', auth, async (req, res) => {
    let {ticker, quantity} = req.body;
    ticker = ticker.toUpperCase();
    quantity = Number(quantity);

    const api_url = `https://sandbox.iexapis.com/stable/stock/${ticker}/quote?token=${process.env.iexToken}`;

    try {
        if(!Number.isInteger(quantity) || quantity < 0 ) {
            throw new Error("Quantity is not a whole number!");
        }

        let {balance, portfolio, transactions} = req.user;
        const response = await axios.get(api_url);
        const {latestPrice} = response.data;
        const totalPrice = latestPrice * quantity;

        // Check if the user has enough cash to make the purchase.
        if (totalPrice > balance) {
            throw new Error("Purchase amount is greater than your balance!");
        }
        
        // Update balance
        balance = balance - totalPrice;

        // Update transactions
        transactions.push({type: "BUY", ticker, quantity, price: latestPrice});
        
        // Update portfolio
        const stockIndex = portfolio.findIndex(stock => stock.ticker.toUpperCase() === ticker);
        if(stockIndex === -1) {
            portfolio.push({ticker, quantity});
        } else {
            portfolio[stockIndex].quantity += quantity;
        }
        
        // Update database with updated values
        await User.findByIdAndUpdate(req.user.id, {transactions, balance, portfolio});
        res.status(201).send("Good!");
    } catch (error) {
        res.status(400).send(error);
    }
});

userRouter.post('/sell', auth, async (req, res) => {
    let {ticker, quantity} = req.body;
    ticker = ticker.toUpperCase();
    quantity = Number(quantity);

    const api_url = `https://sandbox.iexapis.com/stable/stock/${ticker}/quote?token=${process.env.iexToken}`;

    try {
        if(!Number.isInteger(quantity) || quantity < 0 ) {
            throw new Error("Quantity is not a whole number!");
        }
        
        let {balance, portfolio, transactions} = req.user;
        const response = await axios.get(api_url);
        const {latestPrice} = response.data;
        const totalPrice = latestPrice * quantity;

        // Check if the user has enoough of a certain stock
        const stockIndex = portfolio.findIndex(stock => stock.ticker === ticker && stock.quantity >= quantity);
        if(stockIndex === -1) {
            throw new Error("Cannot sell this stock!");
        }

        // Update balance
        balance += totalPrice;

        // Update transactions
        transactions.push({type: "SELL", ticker, quantity, price: latestPrice});

        // Update portfolio
        let stock = portfolio[stockIndex];
        if(stock.quantity === quantity) {
            portfolio.splice(stockIndex, 1);
        } else {
            stock.quantity -= quantity;
        }

        // Update database with updated values
        await User.findByIdAndUpdate(req.user.id, {transactions, balance, portfolio});
        res.status(201).send("Good!");
    } catch(error) {
        res.status(400).send({message: error.message});
    }
});

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
            const api_url = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbolsString}&types=quote&token=${process.env.iexToken}`;
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