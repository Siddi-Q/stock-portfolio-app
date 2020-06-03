import React, { Component } from 'react';

import PortfolioListItem from './portfolio-list-item.component';

export default class PortfolioList extends Component {
    render() {
        return (
            this.props.portfolioList.map((item, index) => (
                <PortfolioListItem
                    key={index}
                    item={item}/>
            ))
        );
    }
}