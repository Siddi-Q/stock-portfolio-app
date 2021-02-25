import React  from 'react';
import PropTypes from 'prop-types';
import BuyForm from './buyForm.component';
import SellForm from './sellForm.component';

function TransactionForm(props) {
    return (
        <div className="card card-container" style={{padding: "40px 40px", backgroundColor: "#f7f7f7"}}>
            <h3 className="text-center" style={{padding: "0px 0px 10px 0px"}}>Balance - ${props.balance.toFixed(2)}</h3>
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
                        {...props}
                    />
                </div>
                <div className="tab-pane fade" id="nav-sell" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <br />
                    <SellForm 
                        {...props}
                    />
                </div>
            </div>
        </div>
    );
}

TransactionForm.propTypes = {
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

export default TransactionForm;