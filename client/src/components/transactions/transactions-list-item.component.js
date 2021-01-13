import React from 'react';
import PropTypes from 'prop-types';

function TransactionsListItem(props) {
    return(
        <tr>
            <td>{props.item.type}</td>
            <td>{props.item.ticker}</td>
            <td>{props.item.quantity} {props.item.quantity > 1 ? "Shares" : "Share"}</td>
            <td>${props.item.price.toFixed(2)}</td>
        </tr>
    );
}


TransactionsListItem.propTypes = {
    item: PropTypes.shape({
        type: PropTypes.string,
        ticker: PropTypes.string,
        quantity: PropTypes.number,
        price: PropTypes.number
    }).isRequired
}

export default TransactionsListItem;