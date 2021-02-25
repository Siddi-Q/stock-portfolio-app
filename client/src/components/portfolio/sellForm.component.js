import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getPortfolio, sell } from '../../services/user.service';

function SellForm(props) {
    const [sellTicker, setSellTicker] = useState('');
    const [sellQuantity, setSellQuantity] = useState('');

    const handleSellTickerChange = event => setSellTicker(event.target.value);
    const handleSellQuantityChange = event => setSellQuantity(event.target.value);

    async function handleSellSubmit(event) {
        event.preventDefault();
        try {
            await sell(sellTicker, sellQuantity);

            const res = await getPortfolio();
    
            const {portfolioList, balance, totalPortfolioPrice} = res.data;
            setSellTicker('');
            setSellQuantity('');
            props.setPortfolioList(portfolioList);
            props.setBalance(balance);
            props.setTotalPortfolioPrice(totalPortfolioPrice);
        }
        catch {
            props.setErrorMessage("An error occurred. Try again!");
        }
    }

    return (
        <form onSubmit={handleSellSubmit}>
            <div className="form-group">
                <label className="sr-only">Ticker</label>
                <input required type="text" className="form-control" placeholder="Ticker" autoFocus
                    value={sellTicker} onChange={handleSellTickerChange} />
            </div>
            <div className="form-group">
                <label className="sr-only">Quantity</label>
                <input required type="number" className="form-control" placeholder="Quantity" min="1"
                    value={sellQuantity} onChange={handleSellQuantityChange} />
            </div>
            {props.errorMessage && <p style={{ color: "red" }}>{props.errorMessage}</p> }
            <div className="form-group">
                <input type="submit" value="Sell" className="btn btn-primary btn-block" />
            </div>
        </form>
    );
}

SellForm.propTypes = {
    balance: PropTypes.number.isRequired,
    buyTicker: PropTypes.string.isRequired,
    sellTicker: PropTypes.string.isRequired,
    buyQuantity: PropTypes.string.isRequired,
    sellQuantity: PropTypes.string.isRequired,
    handleBuyTickerChange: PropTypes.func.isRequired,
    handleSellTickerChange: PropTypes.func.isRequired,
    handleBuyQuantityChange: PropTypes.func.isRequired,
    handleSellQuantityChange: PropTypes.func.isRequired,
    handleBuySubmit: PropTypes.func.isRequired,
    handleSellSubmit: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired
}

export default SellForm;