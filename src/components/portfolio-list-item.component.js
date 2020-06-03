import React, { Component } from 'react';

export default class PortfolioListItem extends Component {

    chooseStyle(performance) {
        if(performance === "less") {
            return {color: 'red'};
        }
        else if(performance === "equal") {
            return {color: 'gray'};
        }
        else {
            return {color: 'green'};
        }
    }

    render() {
        return (
        <li style={this.chooseStyle(this.props.item.performance)} className="list-group-item d-flex justify-content-between align-items-center">
            {this.props.item.ticker} - {this.props.item.quantity} {this.props.item.quantity > 1 ? "Shares" : "Share"}
            <span>${this.props.item.totalPrice}</span>
        </li>
        );
    }
}