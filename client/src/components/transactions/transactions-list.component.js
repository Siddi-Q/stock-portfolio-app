import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TransactionsListItem from './transactions-list-item.component';

export default function TransactionsList() {
    const [transactionsList, setTransactionsList] = useState([]);

    useEffect(() => {
        try {
            axios.get('/transactions',{
                headers: {Authorization: sessionStorage.token}
            }).then(res => {
                setTransactionsList(res.data);
            });
        }
        catch (error) {
            console.error(error);
        }
    }, []);

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
