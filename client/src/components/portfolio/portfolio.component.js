import React, { useState, useEffect } from 'react';

import LoadingSpinner from '../common/loading-spinner.component';
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
    
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        getPortfolio()
        .then(res => {
            const {portfolioList, balance, totalPortfolioPrice} = res.data;
            setPortfolioList(portfolioList);
            setBalance(balance);
            setTotalPortfolioPrice(totalPortfolioPrice);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
        })
    }, []);

    const handleTickerChange = event => setTicker(event.target.value);
    const handleQuantityChange = event => setQuantity(event.target.value);

    async function handleBuySubmit(event) {
        event.preventDefault();
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

    async function handleSellSubmit(event) {
        event.preventDefault();
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

    if(loading) {
        return (
            <LoadingSpinner/>
        );
    }
    else {
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
                            handleTickerChange={handleTickerChange}
                            handleQuantityChange={handleQuantityChange}
                            handleBuySubmit={handleBuySubmit}
                            handleSellSubmit={handleSellSubmit}/>
                    </div>
                </div>
            </div>
        );
    }
}