import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { buy, getPortfolio } from '../../services/user.service';


function BuyForm(props) {
    const [buyTicker, setBuyTicker] = useState('');
    const [buyQuantity, setBuyQuantity] = useState('');

    const handleBuyTickerChange = event => setBuyTicker(event.target.value);
    const handleBuyQuantityChange = event => setBuyQuantity(event.target.value);

    async function handleBuySubmit(event) {
        event.preventDefault();
        try {
            await buy(buyTicker, buyQuantity);

            const res = await getPortfolio();
    
            const {portfolioList, balance, totalPortfolioPrice} = res.data;
            setBuyTicker('');
            setBuyQuantity('');
            props.setPortfolioList(portfolioList);
            props.setBalance(balance);
            props.setTotalPortfolioPrice(totalPortfolioPrice);
        }
        catch {
            props.setErrorMessage("An error occurred. Try again!");
        }
    }

    return (
        <form onSubmit={handleBuySubmit}>
            <div className="form-group">
                <label className="sr-only">Ticker</label>
                <input required type="text" className="form-control" placeholder="Ticker" autoFocus
                    value={buyTicker} onChange={handleBuyTickerChange} />
            </div>
            <div className="form-group">
                <label className="sr-only">Quantity</label>
                <input required type="number" className="form-control" placeholder="Quantity" min="1"
                    value={buyQuantity} onChange={handleBuyQuantityChange} />
            </div>
            {props.errorMessage && <p style={{ color: "red" }}>{props.errorMessage}</p> }
            <div className="form-group">
                <input type="submit" value="Buy" className="btn btn-primary btn-block" />
            </div>
        </form>
    );
}

BuyForm.propTypes = {
    balance: PropTypes.number.isRequired,
    errorMessage: PropTypes.string.isRequired,
    setBalance: PropTypes.func.isRequired,
    setErrorMessage: PropTypes.func.isRequired,
    setPortfolioList: PropTypes.func.isRequired,
    setTotalPortfolioPrice: PropTypes.func.isRequired
}

export default BuyForm;