import React, { Component } from 'react';
import axios from 'axios';

import TransactionsListItem from './transactions-list-item.component';

export default class TransactionsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            transactionsList: []
        }
    }

    async componentDidMount() {
        try {
            const transactionsList = await axios.get('http://localhost:5000/transactions',{
                headers: {Authorization: sessionStorage.token}
            });
    
            this.setState(state => ({
                transactionsList: transactionsList.data
            }));
        }
        catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Transactions</h1>
                <br />
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <ul className="list-group list-group-flush">
                        {this.state.transactionsList.map((item, index) => (
                            <TransactionsListItem key={index} item={item}/>))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}