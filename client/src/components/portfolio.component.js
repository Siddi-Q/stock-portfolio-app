// import React, { Component } from 'react';
// import axios from 'axios';

// import PortfolioList from './portfolio-list.component';
// import TransactionForm from './transaction-form.component';

// import "../styles/styles.css"

// export default class Portfolio extends Component {
//     constructor(props){
//         super(props);

//         this.handleTickerChange = this.handleTickerChange.bind(this);
//         this.handleQuantityChange = this.handleQuantityChange.bind(this);
//         this.handleBuySubmit = this.handleBuySubmit.bind(this);
//         this.handleSellSubmit = this.handleSellSubmit.bind(this);

//         this.state = {
//             ticker: '',
//             quantity: '',
//             portfolioList: [],
//             balance: 0,
//             totalPortfolioPrice: 0,
//             errorMessage: ''
//         };
//     }

//     async componentDidMount() {
//         try {
//             const res = await axios.get('/portfolio', {
//                 headers: {Authorization: sessionStorage.token}
//             });
//             const {portfolioList, balance, totalPortfolioPrice} = res.data;
//             this.setState({
//                 portfolioList, balance, totalPortfolioPrice
//             });
//         }
//         catch (error) {
//             console.error(error);
//         }
        
//     }

//     handleTickerChange(ticker) {
//         this.setState({
//             ticker: ticker
//         });
//     }

//     handleQuantityChange(quantity) {
//         this.setState({
//             quantity: quantity
//         });
//     }

//     async handleBuySubmit() {
//         const newItem = {
//             ticker: this.state.ticker,
//             quantity: this.state.quantity
//         };
        
//         try {
//             await axios.post('/buy', newItem, {
//                 headers: {Authorization: sessionStorage.token}
//             });

//             const res = await axios.get('/portfolio', {
//                 headers: {Authorization: sessionStorage.token}
//             });
    
//             const {portfolioList, balance, totalPortfolioPrice} = res.data;
//             this.setState({
//                 ticker: '',
//                 quantity: '',
//                 portfolioList, 
//                 balance, 
//                 totalPortfolioPrice
//             });
//         }
//         catch {
//             this.setState({errorMessage: "An error occurred. Try again!"});
//         }
//     }

//     async handleSellSubmit() {
//         const newItem = {
//             ticker: this.state.ticker,
//             quantity: this.state.quantity
//         };
        
//         try {
//             await axios.post('/sell', newItem, {
//                 headers: {Authorization: sessionStorage.token}
//             });

//             const res = await axios.get('/portfolio', {
//                 headers: {Authorization: sessionStorage.token}
//             });
    
//             const {portfolioList, balance, totalPortfolioPrice} = res.data;
//             this.setState({
//                 ticker: '',
//                 quantity: '',
//                 portfolioList, 
//                 balance, 
//                 totalPortfolioPrice
//             });
//         }
//         catch {
//             this.setState({errorMessage: "An error occurred. Try again!"});
//         }
//     }
    
//     render() {
//         return (
//             <div>
//                 <h1 id="portfolio-title">Portfolio (${this.state.totalPortfolioPrice.toFixed(2)})</h1>
//                 <br />
//                 <div className="row justify-content-center">
//                     <div className="col-sm-12 col-md-6 col-lg-8">
//                         <table className="table table-hover">
//                             <tbody>
//                                 <PortfolioList portfolioList={this.state.portfolioList}/>
//                             </tbody>
//                         </table>
//                     </div>
//                     <div className="col-sm-12 col-md-6 col-lg-4">
//                         <TransactionForm
//                             balance={this.state.balance}
//                             ticker={this.state.ticker}
//                             quantity={this.state.quantity}
//                             errorMessage={this.state.errorMessage}
//                             onTickerChange={this.handleTickerChange}
//                             onQuantityChange={this.handleQuantityChange}
//                             onBuySubmit={this.handleBuySubmit}
//                             onSellSubmit={this.handleSellSubmit}/>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PortfolioList from './portfolio-list.component';
import TransactionForm from './transaction-form.component';

import "../styles/styles.css"

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