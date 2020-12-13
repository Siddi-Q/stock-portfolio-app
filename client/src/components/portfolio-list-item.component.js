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
            <tr style={this.chooseStyle(this.props.item.performance)}>
                <th>{this.props.item.ticker}</th>
                <td>{this.props.item.quantity} {this.props.item.quantity > 1 ? "Shares" : "Share"}</td>
                <td>${this.props.item.totalPrice.toFixed(2)}</td>
            </tr>
        );
    }
}