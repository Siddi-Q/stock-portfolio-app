import React, { Component } from 'react';

export default class TransactionForm extends Component {
    constructor(props) {
        super(props);

        this.handleTickerChange = this.handleTickerChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleTickerChange(event) {
        this.props.onTickerChange(event.target.value);
    }

    handleQuantityChange(event) {
        this.props.onQuantityChange(event.target.value);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit()
    }

    render() {
        return (
            <div className="card card-container" style={{padding: "40px 40px", backgroundColor: "#f7f7f7"}}>
                <h3 className="text-center" style={{padding: "0px 0px 10px 0px"}}>Cash - ${this.props.balance.toFixed(2)}</h3>
                <form onSubmit={this.handleSubmit}>
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
        );
    }
}