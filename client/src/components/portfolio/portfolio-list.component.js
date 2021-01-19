import React from 'react';
import PropTypes from 'prop-types';


import PortfolioListItem from './portfolio-list-item.component';

function PortfolioList(props) {
    return (
        props.portfolioList.map((item, index) => (
            <PortfolioListItem
                key={index}
                item={item}/>
        ))
    );
}

PortfolioList.propTypes = {
    portfolioList: PropTypes.array.isRequired
}

export default PortfolioList;