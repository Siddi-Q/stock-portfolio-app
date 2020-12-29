import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PortfolioList from './portfolio-list.component';
import TransactionForm from './transaction-form.component';

import "../../styles/styles.css"

export default function Portfolio() {
    const [ticker, setTicker] = useState('');
    const [quantity, setQuantity] = useState('');
    const [portfolioList, setPortfolioList] = useState([]);
    const [balance, setBalance] = useState(0);
    const [totalPortfolioPrice, setTotalPortfolioPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        try {
            axios.get('/portfolio', {
                headers: {Authorization: sessionStorage.token}
            }).then(res => {
                const {portfolioList, balance, totalPortfolioPrice} = res.data;
                setPortfolioList(portfolioList);
                setBalance(balance);
                setTotalPortfolioPrice(totalPortfolioPrice);
            });
        }
        catch (error) {
            console.error(error);
        }
    }, []);

    function handleTickerChange(ticker) {
        setTicker(ticker);
    }

    function handleQuantityChange(quantity) {
        setQuantity(quantity);
    }

    async function handleBuySubmit() {
        const newItem = {
            ticker,
            quantity
        };
        
        try {
            await axios.post('/buy', newItem, {
                headers: {Authorization: sessionStorage.token}
            });

            const res = await axios.get('/portfolio', {
                headers: {Authorization: sessionStorage.token}
            });
    
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
        const newItem = {
            ticker,
            quantity
        };
        
        try {
            await axios.post('/sell', newItem, {
                headers: {Authorization: sessionStorage.token}
            });

            const res = await axios.get('/portfolio', {
                headers: {Authorization: sessionStorage.token}
            });
    
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