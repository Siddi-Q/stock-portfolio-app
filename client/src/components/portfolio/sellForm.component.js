import React from 'react';
import PropTypes from 'prop-types';

function SellForm(props) {
    return (
        <form onSubmit={props.handleSellSubmit}>
            <div className="form-group">
                <label className="sr-only">Ticker</label>
                <input required type="text" className="form-control" placeholder="Ticker" autoFocus
                    value={props.sellTicker} onChange={props.handleSellTickerChange} />
            </div>
            <div className="form-group">
                <label className="sr-only">Quantity</label>
                <input required type="number" className="form-control" placeholder="Quantity" min="1"
                    value={props.sellQuantity} onChange={props.handleSellQuantityChange} />
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