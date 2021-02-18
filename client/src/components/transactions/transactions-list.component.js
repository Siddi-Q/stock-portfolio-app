import React, { useEffect, useState } from 'react';

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
            <div className="row justify-content-center">
                <div className="spinner-border" style={{width: "10rem", height: "10rem"}} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
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
