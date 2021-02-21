import React  from 'react';
import PropTypes from 'prop-types';
import BuyForm from './buyForm.component';
import SellForm from './sellForm.component';

function TransactionForm(props) {
    const handleTickerChange = event => props.onTickerChange(event.target.value);

    const handleQuantityChange = event => props.onQuantityChange(event.target.value);

    function handleBuySubmit(event) {
        event.preventDefault();
        props.onBuySubmit();
    }

    function handleSellSubmit(event) {
        event.preventDefault();
        props.onSellSubmit();
    }
    
    return (
        <div className="card card-container" style={{padding: "40px 40px", backgroundColor: "#f7f7f7"}}>
            <h3 className="text-center" style={{padding: "0px 0px 10px 0px"}}>Cash - ${props.balance.toFixed(2)}</h3>
            <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <a className="nav-item nav-link active" id="nav-buy-tab" data-toggle="tab" href="#nav-buy" role="tab" aria-controls="nav-buy" aria-selected="true">Buy</a>
                <a className="nav-item nav-link" id="nav-sell-tab" data-toggle="tab" href="#nav-sell" role="tab" aria-controls="nav-sell" aria-selected="false">Sell</a>
            </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-buy" role="tabpanel" aria-labelledby="nav-home-tab">
                    <br />
                    <BuyForm 
                        handleTickerChange={handleTickerChange} 
                        handleQuantityChange={handleQuantityChange}
                        handleBuySubmit={handleBuySubmit}
                        {...props}
                    />
                </div>
                <div className="tab-pane fade" id="nav-sell" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <br />
                    <SellForm 
                        handleTickerChange={handleTickerChange} 
                        handleQuantityChange={handleQuantityChange}
                        handleSellSubmit={handleSellSubmit}
                        {...props}
                    />
                </div>
            </div>
        </div>
    );
}

TransactionForm.propTypes = {
    balance: PropTypes.number.isRequired,
    ticker: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    onTickerChange: PropTypes.func.isRequired,
    onQuantityChange: PropTypes.func.isRequired,
    onBuySubmit: PropTypes.func.isRequired,
    onSellSubmit: PropTypes.func.isRequired
}

export default TransactionForm;