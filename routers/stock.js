const express = require('express');
const axios = require('axios');
const User = require('../models/user');
const auth = require('../middleware/auth');

const stockRouter = new express.Router();

// Todo: cleanup
stockRouter.post('/buy', auth, async (req, res) => {
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

stockRouter.post('/sell', auth, async (req, res) => {
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

stockRouter.get('/:ticker/company', auth, async (req, res) => {
    const { ticker } = req.params;
    const api_url = `https://sandbox.iexapis.com/stable/stock/${ticker}/company?token=${process.env.iexToken}`;
    try {
        const { data } = await axios.get(api_url);
        res.status(200).send(data);
    } catch(error) {
        res.status(400).send({message: error.message});
    }
});

module.exports = stockRouter;