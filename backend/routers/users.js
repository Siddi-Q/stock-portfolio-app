const express = require('express');
const axios = require('axios');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/register', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const authToken = await user.generateAuthToken();
        res.status(201).send({ user, authToken });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/signin', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const authToken = await user.generateAuthToken();
        res.send({ user, authToken });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Todo: cleanup
router.post('/buy', auth, async (req, res) => {
    const stock  = req.body;
    const api_url = `https://sandbox.iexapis.com/stable/stock/${stock.tickerSymbol}/quote?token=${process.env.iexToken}`;

    try {
        if(!Number.isInteger(stock.quantity) || stock.quantity < 0 ){
            throw new Error( "Quantity is not a whole number!");
        }

        const user = await User.findById(req.user.id);
        const response = await axios.get(api_url);
        const latestPrice = response.data.latestPrice;
        const totalPrice = latestPrice * stock.quantity;

        if (totalPrice > user.balance) {
            throw new Error("Purchase amount is greater than your balance!");
        }
        
        // Update balance
        user.balance = user.balance - totalPrice;

        // Update transactions
        user.transactions = user.transactions.concat({ 
            tickerSymbol: stock.tickerSymbol.toUpperCase(), 
            quantity: stock.quantity, 
            totalPrice: totalPrice});
        
        // Update portfolio
        let updated = false;
        const lenPortfolio = user.portfolio.length;
        for(let i = 0; i < lenPortfolio; i++){
            if(user.portfolio[i].tickerSymbol.toUpperCase() === stock.tickerSymbol.toUpperCase()){
                user.portfolio[i].quantity += stock.quantity;
                updated = true;
                break;
            }
        }

        if(!updated){
            user.portfolio = user.portfolio.concat({tickerSymbol: stock.tickerSymbol.toUpperCase(), 
                                                    quantity: stock.quantity});
        }
        
        // Update database with updated values
        await User.findByIdAndUpdate(req.user.id, { transactions: user.transactions,
                                                    balance: user.balance,
                                                    portfolio: user.portfolio});
        res.status(201).send(stock);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Todo: Cleanup
router.get('/portfolio', auth, async (req, res) => {
    try {
        const portfolio = await User.findById(req.user.id, 'portfolio');
        let portfolioList = portfolio.portfolio;
        let symbols = [];
        for(let i = 0; i < portfolioList.length; i++){
            symbols.push(portfolioList[i].tickerSymbol);
        }
        if(symbols.length > 0){
            let symbolsString = symbols.join();
            const api_url = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbolsString}&types=quote&token=${process.env.iexToken}`;
            const response = await axios.get(api_url);
            for(let i = 0; i < portfolioList.length; i++){
                let latestPrice = 0;
                let openPrice = 0;
                if(response.data[portfolioList[i].tickerSymbol].quote.latestPrice == null){
                    latestPrice = response.data[portfolioList[i].tickerSymbol].quote.previousClose;
                    openPrice = latestPrice;
                }
                else{
                    latestPrice = response.data[portfolioList[i].tickerSymbol].quote.latestPrice;
                    openPrice = response.data[portfolioList[i].tickerSymbol].quote.open;
                }
                portfolioList[i].totalPrice = latestPrice * portfolioList[i].quantity;
                if(latestPrice < openPrice){
                    portfolioList[i].performance = "less";
                }
                else if(latestPrice == openPrice){
                    portfolioList[i].performance = "equal";
                }
                else{
                    portfolioList[i].performance = "greater";
                }
            }
        }
        res.send(portfolioList);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/transactions', auth, async (req, res) => {
    try {
        const transactions = await User.findById(req.user.id, 'transactions');
        res.send(transactions.transactions);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;