import React from 'react';
import PropTypes from 'prop-types';

import {caretUpFill, caretDownFill, dash} from '../../icons/icons';

function chooseStyle(performance) {
    const performanceColorObj = {"less": "red", "equal": "gray", "greater": "green"};
    return {color: performanceColorObj[performance]}
}

function chooseIcon(performance) {
    const iconObj = {"less": caretDownFill, "equal": dash, "greater": caretUpFill};
    return iconObj[performance];
}

function PortfolioListItem(props) {
    return (
        <tr style={chooseStyle(props.item.performance)}>
            <td>{chooseIcon(props.item.performance)}</td>
            <td>{props.item.ticker}</td>
            <td>{props.item.quantity} {props.item.quantity > 1 ? "Shares" : "Share"}</td>
            <td>${props.item.totalPrice.toFixed(2)}</td>
        </tr>
    );
}

PortfolioListItem.propTypes = {
    item: PropTypes.shape({
        performance: PropTypes.string.isRequired,
        ticker: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        totalPrice: PropTypes.number.isRequired
    }).isRequired
}

export default PortfolioListItem;