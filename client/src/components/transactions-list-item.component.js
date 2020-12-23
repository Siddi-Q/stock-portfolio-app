import React from 'react';

export default function TransactionsListItem(props) {
    return(
        <tr>
            <td>{props.item.type}</td>
            <td>{props.item.ticker}</td>
            <td>{props.item.quantity} {props.item.quantity > 1 ? "Shares" : "Share"}</td>
            <td>${props.item.price.toFixed(2)}</td>
        </tr>
    );
}