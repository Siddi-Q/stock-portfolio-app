import React, { useEffect, useState } from 'react';

import LoadingSpinner from '../common/loading-spinner.component';
import TransactionsListItem from './transactions-list-item.component';

import { getTransactions } from '../../services/user.service';

export default function TransactionsList() {
    const [transactionsList, setTransactionsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTransactions()
        .then(res => {
            setTransactionsList(res.data);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
        })
    }, []);

    if(loading) {
        return (
            <LoadingSpinner />
        );
    }
    else {
        return (
            <div>
                <h1>Transactions</h1>
                <br />
                <div className="row">
                    <div className="col-sm-12 col-lg-8">
                        <table className="table table-hover">
                            <tbody>
                                {transactionsList.map((item, index) => (
                                <TransactionsListItem key={index} item={item}/>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
