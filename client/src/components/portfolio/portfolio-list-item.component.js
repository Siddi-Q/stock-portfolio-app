import React from 'react';
import PropTypes from 'prop-types';

function PortfolioListItem(props) {
    function chooseStyle(performance) {
        const performanceColorObj = {"less": "red", "equal": "gray", "greater": "green"};
        return {color: performanceColorObj[performance]}
    }

    function chooseIcon(performance) {
        const iconObj = {
            "less":     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                            <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg>,
            "equal":    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                        </svg>,
            "greater":  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                            <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                        </svg>
        };
        return iconObj[performance]
    }

    return (
        <tr style={chooseStyle(props.item.performance)}>
            <td>
                {chooseIcon(props.item.performance)}
            </td>
            <th>{props.item.ticker}</th>
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