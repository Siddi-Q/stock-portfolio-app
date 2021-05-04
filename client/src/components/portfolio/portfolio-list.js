import React from 'react';
import PropTypes from 'prop-types';

import PortfolioListItem from './portfolio-list-item';

export default function PortfolioList(props) {
  return (
    props.portfolioList.map((item, index) => (
      <PortfolioListItem
        key={index}
        item={item}
      />
    ))
  );
}

PortfolioList.propTypes = {
  portfolioList: PropTypes.array.isRequired,
}
