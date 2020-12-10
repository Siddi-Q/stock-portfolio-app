import React, { Component } from 'react';

export default class TransactionsListItem extends Component {
    render() {
        return(
            <li className="list-group-item">
                {this.props.item.type} ({this.props.item.ticker}) - {this.props.item.quantity} {this.props.item.quantity > 1 ? "Shares" : "Share"} @ {this.props.item.price}
            </li>
        );
    }
}