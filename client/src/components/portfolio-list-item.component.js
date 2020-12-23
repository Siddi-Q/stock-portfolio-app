import React from 'react';

export default function PortfolioListItem(props) {
    function chooseStyle(performance) {
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

    return (
        <tr style={chooseStyle(props.item.performance)}>
            <th>{props.item.ticker}</th>
            <td>{props.item.quantity} {props.item.quantity > 1 ? "Shares" : "Share"}</td>
            <td>${props.item.totalPrice.toFixed(2)}</td>
        </tr>
    );
}