// import React, { useEffect, useState } from 'react';

// import LoadingSpinner from '../common/loading-spinner.component';
// import TransactionsListItem from './transactions-list-item.component';

// import { getTransactions } from '../../services/user.service';

// export default function TransactionsList() {
//     const [transactionsList, setTransactionsList] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         getTransactions()
//         .then(res => {
//             setTransactionsList(res.data);
//             setLoading(false);
//         })
//         .catch(error => {
//             console.error(error);
//         })
//     }, []);

//     if(loading) {
//         return (
//             <div className="row justify-content-center">
//                 <LoadingSpinner />
//             </div>
//         );
//     }
//     else {
//         return (
//             <div>
//                 <h1>Transactions</h1>
//                 <br />
//                 <div className="row">
//                     <div className="col-sm-12 col-lg-8">
//                         <table className="table table-hover">
//                             <tbody>
//                                 {transactionsList.map((item, index) => (
//                                 <TransactionsListItem key={index} item={item}/>))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }


import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';

import LoadingSpinner from '../common/loading-spinner.component';
import TransactionsListItem from './transactions-list-item.component';

import { getTransactions } from '../../services/user.service';

export default function TransactionsList() {
    const [transactionsList, setTransactionsList] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = useMemo(
        () => [
            {Header: 'Type', accessor: 'type'},
            {Header: 'Ticker', accessor: 'ticker'},
            {Header: 'Quantity', accessor: 'quantity'},
            {Header: 'Price', accessor: 'price'}
        ], []);

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

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({columns, data: transactionsList});

    if(loading) {
        return (
            <div className="row justify-content-center">
                <LoadingSpinner />
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
                        <table {...getTableProps()} className="table table-hover">
                            <thead>
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps()}>
                                                {column.render('Header')}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map(row => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                return (
                                                    <td {...cell.getCellProps()}>
                                                        {cell.render('Cell')}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}