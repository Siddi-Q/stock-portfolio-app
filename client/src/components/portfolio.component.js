import React, { Component } from 'react';
import axios from 'axios';

import PortfolioList from './portfolio-list.component';
import TransactionForm from './transaction-form.component';

import "../styles/styles.css"

export default class Portfolio extends Component {
    constructor(props){
        super(props);

        this.handleTickerChange = this.handleTickerChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            ticker: '',
            quantity: '',
            portfolioList: [],
            balance: 0,
            totalPortfolioPrice: 0,
            errorMessage: ''
        };
    }

    async componentDidMount() {
        try {
            const res = await axios.get('/portfolio', {
                headers: {Authorization: sessionStorage.token}
            });
            const {portfolioList, balance, totalPortfolioPrice} = res.data;
            this.setState({
                portfolioList, balance, totalPortfolioPrice
            });
        }
        catch (error) {
            console.error(error);
        }
        
    }

    handleTickerChange(ticker) {
        this.setState({
            ticker: ticker
        });
    }

    handleQuantityChange(quantity) {
        this.setState({
            quantity: quantity
        });
    }

    async handleSubmit() {
        const newItem = {
            ticker: this.state.ticker,
            quantity: this.state.quantity
        };
        
        try {
            await axios.post('/buy', newItem, {
                headers: {Authorization: sessionStorage.token}
            });

            const res = await axios.get('/portfolio', {
                headers: {Authorization: sessionStorage.token}
            });
    
            const {portfolioList, balance, totalPortfolioPrice} = res.data;
            this.setState({
                ticker: '',
                quantity: '',
                portfolioList, 
                balance, 
                totalPortfolioPrice
            });
        }
        catch {
            this.setState({errorMessage: "An error occurred. Try again!"});
        }
    }
    
    render() {
        return (
            <div className="container">
                <h1 id="portfolio-title">Portfolio (${this.state.totalPortfolioPrice.toFixed(2)})</h1>
                <br />
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <ul className="list-group list-group-flush">
                            <PortfolioList portfolioList={this.state.portfolioList}/>
                        </ul>                    
                    </div>
                    <div className="col-sm-12 col-md-6 line">
                        <TransactionForm
                            balance={this.state.balance}
                            ticker={this.state.ticker}
                            quantity={this.state.quantity}
                            errorMessage={this.state.errorMessage}
                            onTickerChange={this.handleTickerChange}
                            onQuantityChange={this.handleQuantityChange}
                            onSubmit={this.handleSubmit}/>
                    </div>
                </div>
            </div>
        );
    }
}