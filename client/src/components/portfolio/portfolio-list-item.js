import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { caretUpFill, caretDownFill, dash } from '../../icons/icons';

function chooseStyle(performance) {
  const performanceColorObj = {'less': 'red', 'equal': 'gray', 'greater': 'green'};
  return {color: performanceColorObj[performance]}
}

function chooseIcon(performance) {
  const iconObj = {'less': caretDownFill, 'equal': dash, 'greater': caretUpFill};
  return iconObj[performance];
}

export default function PortfolioListItem(props) {
  const { performance, quantity, ticker, totalPrice } = props.item;
  const style = chooseStyle(performance);
  const icon = chooseIcon(performance);

  return (
    <tr style={style}>
      <td>{icon}</td>
      <td><Link to={`${ticker}/company`} style={style}>{ticker}</Link></td>
      <td>{quantity} {quantity > 1 ? 'Shares' : 'Share'}</td>
      <td>${totalPrice.toFixed(2)}</td>
    </tr>
  );
}

PortfolioListItem.propTypes = {
  item: PropTypes.shape({
    performance: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired
}
