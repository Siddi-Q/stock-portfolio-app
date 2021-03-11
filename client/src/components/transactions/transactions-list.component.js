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
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';

import LoadingSpinner from '../common/loading-spinner.component';

import { getTransactions } from '../../services/user.service';

const caretUpFill = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                        <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                    </svg>;

const caretDownFill = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                      </svg>;

function GlobalFilter(props) {
    const {filter, setFilter} = props;
    return (
        <form className="form-inline justify-content-end mb-2">
            <label className="sr-only" htmlFor="search">Search</label>
            <input id="search" type="search" placeholder="Search" aria-label="Search" className="form-control"
            value={filter || ''} onChange={e => setFilter(e.target.value)}/>
        </form>
    );
}

export default function TransactionsList() {
    const [transactionsList, setTransactionsList] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = useMemo(
        () => [
            {Header: 'Type', accessor: 'type'},
            {Header: 'Ticker', accessor: 'ticker'},
            {Header: 'Quantity', accessor: 'quantity', Cell: ({value}) => {return value + " Share" + (value > 1 ? "s" : "")}},
            {Header: 'Price', accessor: 'price', Cell: ({value}) => {return "$" + value.toFixed(2)}}
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
        page,
        pageCount,
        canNextPage,
        canPreviousPage,
        gotoPage,
        nextPage,
        previousPage,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable({columns, data: transactionsList}, useGlobalFilter, useSortBy, usePagination);

    const { globalFilter } = state;

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
                <div className="row">
                    <div className="col-sm-12 col-lg-8">
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}  />
                        <table {...getTableProps()} className="table table-hover">
                            <thead>
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                {column.render('Header')}
                                                {' '}
                                                <span>
                                                    {column.isSorted ? (column.isSortedDesc ? caretDownFill : caretUpFill ) : "" }
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {page.map((row, i) => {
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
                        <div className="btn-toolbar justify-content-center" role="toolbar">
                            <div className="btn-group mr-2" role="group">
                                <button type="button" className="btn btn-outline-primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                            </div>
                            <div className="btn-group mr-2" role="group">
                                <button type="button" className="btn btn-outline-primary" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                            </div>
                            <div className="btn-group mr-2" role="group">
                                <button type="button" className="btn btn-outline-primary" onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                            </div>
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-outline-primary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}