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
            <div className="text-center">
                <h3>Cash - ${this.props.balance.toFixed(2)}</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row justify-content-center">
                        <div className="col-8 col-md-6">
                            <label className="sr-only">Ticker</label>
                            <input required type="text" className="form-control" placeholder="Ticker" autoFocus
                                value={this.props.ticker} onChange={this.handleTickerChange} />
                        </div>
                    </div>
                    <div className="form-group row justify-content-center">
                        <div className="col-8 col-md-6">
                            <label className="sr-only">Quantity</label>
                            <input required type="number" className="form-control" placeholder="Quantity" min="0"
                                value={this.props.quantity} onChange={this.handleQuantityChange} />
                        </div>
                    </div>
                    <div className="form-group row justify-content-center">
                        <div className="col-8 col-md-6">
                            <input type="submit" value="Buy" className="btn btn-lg btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}