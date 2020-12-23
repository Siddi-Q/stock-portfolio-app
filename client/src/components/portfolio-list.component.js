import React from 'react';

import PortfolioListItem from './portfolio-list-item.component';

export default function PortfolioList(props) {
    return (
        props.portfolioList.map((item, index) => (
            <PortfolioListItem
                key={index}
                item={item}/>
        ))
    );
}