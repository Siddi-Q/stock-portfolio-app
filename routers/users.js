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
        res.status(400).send({message: "Incorrect username or password!"});
    }
});

router.post('/verify', auth, (req, res) => {
    try {
        res.send(true);
    } catch (error) {
        res.status(500).send({message: "Server error!"});
    }
});

// Todo: cleanup
router.post('/buy', auth, async (req, res) => {
    let {ticker, quantity} = req.body;
    ticker = ticker.toUpperCase();
    quantity = Number(quantity);

    const api_url = `https://sandbox.iexapis.com/stable/stock/${ticker}/quote?token=${process.env.iexToken}`;

    try {
        if(!Number.isInteger(quantity) || quantity < 0 ) {
            throw new Error( "Quantity is not a whole number!");
        }

        let { balance, portfolio, transactions } = req.user;
        const response = await axios.get(api_url);

        // Get the latest price of the stock.
        let latestPrice;
        if(response.data.latestPrice == null) {
            latestPrice = response.data.previousClose;
        } 
        else {
            latestPrice = response.data.latestPrice;
        }
        const totalPrice = latestPrice * quantity;

        // Check if the user has enough cash to make the purchase.
        if (totalPrice > balance) {
            throw new Error("Purchase amount is greater than your balance!");
        }
        
        // Update balance
        balance = balance - totalPrice;

        // Update transactions
        transactions = transactions.concat({ ticker, quantity, price: latestPrice });
        
        // Update portfolio
        let updated = false;
        const lenPortfolio = portfolio.length;
        for(let i = 0; i < lenPortfolio; i++) {
            if(portfolio[i].ticker.toUpperCase() === ticker) {
                portfolio[i].quantity += quantity;
                updated = true;
                break;
            }
        }

        if(!updated){
            portfolio = portfolio.concat({ ticker, quantity });
        }
        
        // Update database with updated values
        await User.findByIdAndUpdate(req.user.id, { transactions, balance, portfolio });
        res.status(201).send("Good!"); // Todo: Update 
    } catch (error) {
        res.status(400).send(error);
    }
});

// Todo: Cleanup
router.get('/portfolio', auth, async (req, res) => {
    try {
        const portfolioList = req.user.portfolio;
        const balance = req.user.balance;
        let totalPortfolioPrice = 0;

        // Get list of ticker symbols in the user's portfolio
        let symbols = [];
        for(let i = 0; i < portfolioList.length; i++) {
            symbols.push(portfolioList[i].ticker);
        }

        if(symbols.length > 0) {
            let symbolsString = symbols.join();
            const api_url = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbolsString}&types=quote&token=${process.env.iexToken}`;
            const response = await axios.get(api_url);

            // For each stock, get the latest and open prices
            for(let i = 0; i < portfolioList.length; i++) {
                let latestPrice = 0;
                let openPrice = 0;

                if(response.data[portfolioList[i].ticker].quote.latestPrice == null) {
                    latestPrice = response.data[portfolioList[i].ticker].quote.previousClose;
                    openPrice = latestPrice;
                }
                else {
                    latestPrice = response.data[portfolioList[i].ticker].quote.latestPrice;
                    openPrice = response.data[portfolioList[i].ticker].quote.open;
                }

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

router.get('/transactions', auth, async (req, res) => {
    try {
        const transactions = req.user.transactions;
        res.send(transactions);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch {
        res.status(500).send();
    }
});

module.exports = router;