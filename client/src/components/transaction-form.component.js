import React  from 'react';

export default function TransactionForm(props) {
    function handleTickerChange(event) {
        props.onTickerChange(event.target.value);
    }

    function handleQuantityChange(event) {
        props.onQuantityChange(event.target.value);
    }

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
                    <form onSubmit={handleBuySubmit}>
                        <div className="form-group">
                            <label className="sr-only">Ticker</label>
                            <input required type="text" className="form-control" placeholder="Ticker" autoFocus
                                value={props.ticker} onChange={handleTickerChange} />
                        </div>
                        <div className="form-group">
                            <label className="sr-only">Quantity</label>
                            <input required type="number" className="form-control" placeholder="Quantity" min="1"
                                value={props.quantity} onChange={handleQuantityChange} />
                        </div>
                        {props.errorMessage && <p style={{ color: "red" }}>{props.errorMessage}</p> }
                        <div className="form-group">
                            <input type="submit" value="Buy" className="btn btn-primary btn-block" />
                        </div>
                    </form>
                </div>
                <div className="tab-pane fade" id="nav-sell" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <br />
                    <form onSubmit={handleSellSubmit}>
                        <div className="form-group">
                            <label className="sr-only">Ticker</label>
                            <input required type="text" className="form-control" placeholder="Ticker" autoFocus
                                value={props.ticker} onChange={handleTickerChange} />
                        </div>
                        <div className="form-group">
                            <label className="sr-only">Quantity</label>
                            <input required type="number" className="form-control" placeholder="Quantity" min="1"
                                value={props.quantity} onChange={handleQuantityChange} />
                        </div>
                        {props.errorMessage && <p style={{ color: "red" }}>{props.errorMessage}</p> }
                        <div className="form-group">
                            <input type="submit" value="Sell" className="btn btn-primary btn-block" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}