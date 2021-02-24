import React from 'react';
import PropTypes from 'prop-types';

function SellForm(props) {
    return (
        <form onSubmit={props.handleSellSubmit}>
            <div className="form-group">
                <label className="sr-only">Ticker</label>
                <input required type="text" className="form-control" placeholder="Ticker" autoFocus
                    value={props.ticker} onChange={props.handleTickerChange} />
            </div>
            <div className="form-group">
                <label className="sr-only">Quantity</label>
                <input required type="number" className="form-control" placeholder="Quantity" min="1"
                    value={props.quantity} onChange={props.handleQuantityChange} />
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
    ticker: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    handleTickerChange: PropTypes.func.isRequired,
    handleQuantityChange: PropTypes.func.isRequired,
    handleBuySubmit: PropTypes.func.isRequired,
    handleSellSubmit: PropTypes.func.isRequired
}

export default SellForm;