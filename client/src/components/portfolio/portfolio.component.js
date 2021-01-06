import React, { useState, useEffect } from 'react';

import PortfolioList from './portfolio-list.component';
import TransactionForm from './transaction-form.component';

import { buy, getPortfolio, sell } from '../../services/user.service';

import "../../styles/styles.css"

export default function Portfolio() {
    const [ticker, setTicker] = useState('');
    const [quantity, setQuantity] = useState('');
    const [portfolioList, setPortfolioList] = useState([]);
    const [balance, setBalance] = useState(0);
    const [totalPortfolioPrice, setTotalPortfolioPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getPortfolio()
        .then(res => {
            const {portfolioList, balance, totalPortfolioPrice} = res.data;
            setPortfolioList(portfolioList);
            setBalance(balance);
            setTotalPortfolioPrice(totalPortfolioPrice);
        })
        .catch(error => {
            console.error(error);
        })
    }, []);

    function handleTickerChange(ticker) {
        setTicker(ticker);
    }

    function handleQuantityChange(quantity) {
        setQuantity(quantity);
    }

    async function handleBuySubmit() {
        try {
            await buy(ticker, quantity);

            const res = await getPortfolio();
    
            const {portfolioList, balance, totalPortfolioPrice} = res.data;
            setTicker('');
            setQuantity('');
            setPortfolioList(portfolioList);
            setBalance(balance);
            setTotalPortfolioPrice(totalPortfolioPrice);
        }
        catch {
            setErrorMessage("An error occurred. Try again!");
        }
    }

    async function handleSellSubmit() {
        try {
            await sell(ticker, quantity);

            const res = await getPortfolio();
    
            const {portfolioList, balance, totalPortfolioPrice} = res.data;
            setTicker('');
            setQuantity('');
            setPortfolioList(portfolioList);
            setBalance(balance);
            setTotalPortfolioPrice(totalPortfolioPrice);
        }
        catch {
            setErrorMessage("An error occurred. Try again!");
        }
    }

    return (
        <div>
            <h1 id="portfolio-title">Portfolio (${totalPortfolioPrice.toFixed(2)})</h1>
            <br />
            <div className="row justify-content-center">
                <div className="col-sm-12 col-md-6 col-lg-8">
                    <table className="table table-hover">
                        <tbody>
                            <PortfolioList portfolioList={portfolioList}/>
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4">
                    <TransactionForm
                        balance={balance}
                        ticker={ticker}
                        quantity={quantity}
                        errorMessage={errorMessage}
                        onTickerChange={handleTickerChange}
                        onQuantityChange={handleQuantityChange}
                        onBuySubmit={handleBuySubmit}
                        onSellSubmit={handleSellSubmit}/>
                </div>
            </div>
        </div>
    );
}