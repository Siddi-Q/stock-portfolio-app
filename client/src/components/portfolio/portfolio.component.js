import React, { useState, useEffect } from 'react';

import LoadingSpinner from '../common/loading-spinner.component';
import PortfolioList from './portfolio-list.component';
import TransactionForm from './transaction-form.component';

import { buy, getPortfolio, sell } from '../../services/user.service';

import "../../styles/styles.css"

export default function Portfolio() {
    const [buyTicker, setBuyTicker] = useState('');
    const [sellTicker, setSellTicker] = useState('');
    const [buyQuantity, setBuyQuantity] = useState('');
    const [sellQuantity, setSellQuantity] = useState('');
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

    const handleBuyTickerChange = event => setBuyTicker(event.target.value);
    const handleSellTickerChange = event => setSellTicker(event.target.value);
    const handleBuyQuantityChange = event => setBuyQuantity(event.target.value);
    const handleSellQuantityChange = event => setSellQuantity(event.target.value);

    async function handleBuySubmit(event) {
        event.preventDefault();
        try {
            await buy(buyTicker, buyQuantity);

            const res = await getPortfolio();
    
            const {portfolioList, balance, totalPortfolioPrice} = res.data;
            setBuyTicker('');
            setBuyQuantity('');
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
            await sell(sellTicker, sellQuantity);

            const res = await getPortfolio();
    
            const {portfolioList, balance, totalPortfolioPrice} = res.data;
            setSellTicker('');
            setSellQuantity('');
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
                            buyTicker={buyTicker}
                            sellTicker={sellTicker}
                            buyQuantity={buyQuantity}
                            sellQuantity={sellQuantity}
                            errorMessage={errorMessage}
                            handleBuyTickerChange={handleBuyTickerChange}
                            handleSellTickerChange={handleSellTickerChange}
                            handleBuyQuantityChange={handleBuyQuantityChange}
                            handleSellQuantityChange={handleSellQuantityChange}
                            handleBuySubmit={handleBuySubmit}
                            handleSellSubmit={handleSellSubmit}/>
                    </div>
                </div>
            </div>
        );
    }
}