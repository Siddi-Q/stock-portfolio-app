import React, { useState, useEffect } from 'react';

import LoadingSpinner from '../common/loading-spinner.component';
import PortfolioList from './portfolio-list.component';
import TransactionForm from './transaction-form.component';

import { getPortfolio } from '../../services/user.service';

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
                <h1 id="portfolio-title">Portfolio - ${totalPortfolioPrice.toFixed(2)}</h1>
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