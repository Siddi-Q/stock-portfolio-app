import React, { Component } from 'react';

export default class TransactionsListItem extends Component {
    render() {
        return(
            <tr>
                <td>{this.props.item.type}</td>
                <td>{this.props.item.ticker}</td>
                <td>{this.props.item.quantity} {this.props.item.quantity > 1 ? "Shares" : "Share"}</td>
                <td>${this.props.item.price.toFixed(2)}</td>
            </tr>
        );
    }
}