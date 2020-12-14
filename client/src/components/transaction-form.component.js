import React, { Component } from 'react';

export default class TransactionForm extends Component {
    constructor(props) {
        super(props);

        this.handleTickerChange = this.handleTickerChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleBuySubmit = this.handleBuySubmit.bind(this);
        this.handleSellSubmit = this.handleSellSubmit.bind(this);
    }
    
    handleTickerChange(event) {
        this.props.onTickerChange(event.target.value);
    }

    handleQuantityChange(event) {
        this.props.onQuantityChange(event.target.value);
    }

    handleBuySubmit(event) {
        event.preventDefault();
        this.props.onBuySubmit();
    }

    handleSellSubmit(event) {
        event.preventDefault();
        this.props.onSellSubmit();
    }

    render() {
        return (
            <div className="card card-container" style={{padding: "40px 40px", backgroundColor: "#f7f7f7"}}>
                <h3 className="text-center" style={{padding: "0px 0px 10px 0px"}}>Cash - ${this.props.balance.toFixed(2)}</h3>
                <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a className="nav-item nav-link active" id="nav-buy-tab" data-toggle="tab" href="#nav-buy" role="tab" aria-controls="nav-buy" aria-selected="true">Buy</a>
                    <a className="nav-item nav-link" id="nav-sell-tab" data-toggle="tab" href="#nav-sell" role="tab" aria-controls="nav-sell" aria-selected="false">Sell</a>
                </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-buy" role="tabpanel" aria-labelledby="nav-home-tab">
                        <br />
                        <form onSubmit={this.handleBuySubmit}>
                            <div className="form-group">
                                <label className="sr-only">Ticker</label>
                                <input required type="text" className="form-control" placeholder="Ticker" autoFocus
                                    value={this.props.ticker} onChange={this.handleTickerChange} />
                            </div>
                            <div className="form-group">
                                <label className="sr-only">Quantity</label>
                                <input required type="number" className="form-control" placeholder="Quantity" min="1"
                                    value={this.props.quantity} onChange={this.handleQuantityChange} />
                            </div>
                            {this.props.errorMessage && <p style={{ color: "red" }}>{this.props.errorMessage}</p> }
                            <div className="form-group">
                                <input type="submit" value="Buy" className="btn btn-primary btn-block" />
                            </div>
                        </form>
                    </div>
                    <div className="tab-pane fade" id="nav-sell" role="tabpanel" aria-labelledby="nav-profile-tab">
                        <br />
                        <form onSubmit={this.handleSellSubmit}>
                            <div className="form-group">
                                <label className="sr-only">Ticker</label>
                                <input required type="text" className="form-control" placeholder="Ticker" autoFocus
                                    value={this.props.ticker} onChange={this.handleTickerChange} />
                            </div>
                            <div className="form-group">
                                <label className="sr-only">Quantity</label>
                                <input required type="number" className="form-control" placeholder="Quantity" min="1"
                                    value={this.props.quantity} onChange={this.handleQuantityChange} />
                            </div>
                            {this.props.errorMessage && <p style={{ color: "red" }}>{this.props.errorMessage}</p> }
                            <div className="form-group">
                                <input type="submit" value="Sell" className="btn btn-primary btn-block" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}