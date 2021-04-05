import React, { useState, useEffect } from 'react';

import LoadingSpinner from '../common/loading-spinner';
import PortfolioList from './portfolio-list';
import TransactionForm from './transaction-form/transaction-form';

import { getPortfolio } from '../../services/user';

import "../../styles/styles.css"

export default function Portfolio() {
    const [portfolioList, setPortfolioList] = useState([]);
    const [balance, setBalance] = useState(0);
    const [totalPortfolioPrice, setTotalPortfolioPrice] = useState(0);
    
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

    if(loading) {
        return (
            <div className="row justify-content-center">
                <LoadingSpinner/>            
            </div>
        );
    }
    else {
        return (
            <>
                <h1 id="portfolio-title" className="mb-3">Portfolio <span className="badge badge-dark">${totalPortfolioPrice.toFixed(2)}</span></h1>
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-6 col-lg-8">
                        {portfolioList.length !== 0 ?
                        <table className="table table-hover">
                            <tbody>
                                <PortfolioList portfolioList={portfolioList}/>
                            </tbody>
                        </table> : 
                        <h3>You have nothing in your portfolio!</h3>
                        }
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <TransactionForm
                            balance={balance}
                            portfolioList={portfolioList}
                            setBalance={setBalance}
                            setPortfolioList={setPortfolioList}
                            setTotalPortfolioPrice={setTotalPortfolioPrice}
                        />
                    </div>
                </div>
            </>
        );
    }
}