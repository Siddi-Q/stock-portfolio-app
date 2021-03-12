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

import "../../styles/styles.css";

const caretUpFill = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                        <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                    </svg>;

const caretDownFill = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                      </svg>;

const chevronLeft = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>;

const chevronDoubleLeft = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                            <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                          </svg>;

const chevronRight = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                     </svg>;

const chevronDoubleRight = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
                            <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
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
                                <button type="button" className="btn btn-outline-primary btn-circle d-flex justify-content-center align-items-center" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{chevronDoubleLeft}</button>
                            </div>
                            <div className="btn-group mr-2" role="group">
                                <button type="button" className="btn btn-outline-primary btn-circle d-flex justify-content-center align-items-center" onClick={() => previousPage()} disabled={!canPreviousPage}>{chevronLeft}</button>
                            </div>
                            <div className="btn-group mr-2" role="group">
                                <button type="button" className="btn btn-outline-primary btn-circle d-flex justify-content-center align-items-center" onClick={() => nextPage()} disabled={!canNextPage}>{chevronRight}</button>
                            </div>
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-outline-primary btn-circle d-flex justify-content-center align-items-center" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{chevronDoubleRight}</button>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}