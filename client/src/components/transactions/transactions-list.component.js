import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';

import LoadingSpinner from '../common/loading-spinner.component';

import { getTransactions } from '../../services/user.service';

import {caretUpFill, caretDownFill, chevronLeft, chevronDoubleLeft, chevronRight, chevronDoubleRight} from '../../icons/icons';
import "../../styles/styles.css";

function GlobalFilter(props) {
    const {filter, setFilter} = props;
    return (
        <>
            <label className="sr-only" htmlFor="search">Search</label>
            <input id="search" type="search" placeholder="Search" aria-label="Search" className="form-control"
            value={filter || ''} onChange={e => setFilter(e.target.value)}/>
        </>
    );
}

GlobalFilter.propTypes = {
    filter: PropTypes.string,
    setFilter: PropTypes.func.isRequired
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
        setFilter,
        setGlobalFilter
    } = useTable({columns, data: transactionsList}, useFilters, useGlobalFilter, useSortBy, usePagination);

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
            <>
                <h1>Transactions</h1>
                <div className="row">
                    <div className="col-sm-12 col-lg-8">
                        <form className="form-inline justify-content-end mb-2">
                            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}  />
                        </form>
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
                    </div>
                    <div className="col-sm-12 col-lg-4">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Type</span>
                            </div>
                            <select className="custom-select" onChange={e => setFilter("type", e.target.value)}>
                                <option value="">ALL</option>
                                <option value="BUY">BUY</option>
                                <option value="SELL">SELL</option>
                            </select>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Ticker</span>
                            </div>
                            <input type="search" placeholder="Search" aria-label="Search" className="form-control"
                            onChange={e => setFilter("ticker", e.target.value)} />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Quantity</span>
                            </div>
                            <input type="number" min="1" className="form-control"
                            onChange={e => setFilter("quantity", Number(e.target.value))} />
                        </div>

                    </div>
                </div>
                <br />
            </>
        );
    }
}