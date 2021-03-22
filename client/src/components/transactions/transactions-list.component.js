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

function TickerFilter(props) {
    const {preFilteredRows, setFilter} = props;
    const tickers = useMemo(() => {
        const tickers = new Set();
        preFilteredRows.forEach(row => tickers.add(row.values.ticker));
        return [...tickers.values()]
    }, [preFilteredRows]);

    return (
        <select className="custom-select" onChange={e => setFilter("ticker", e.target.value)}>
            <option value="">ALL</option>
            {tickers.map((ticker, idx) => (
                <option key={idx} value={ticker}>{ticker}</option>
            ))}
        </select>
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
        setFilter,
        setGlobalFilter,
        preFilteredRows
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
                    <div className="col-12 col-md-8 mb-3">
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
                    <div className="col-12 col-md-4">
                        <form>
                            <div className="form-group row">
                                <label className="col-4 col-form-label"><strong>Type</strong></label>
                                <div className="col-8">
                                    <select className="custom-select" onChange={e => setFilter("type", e.target.value)}>
                                        <option value="">ALL</option>
                                        <option value="BUY">BUY</option>
                                        <option value="SELL">SELL</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-4 col-form-label"><strong>Ticker</strong></label>
                                <div className="col-8">
                                    <TickerFilter preFilteredRows={preFilteredRows} setFilter={setFilter} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-4 col-form-label"><strong>Quantity</strong></label>
                                <div className="col-8">
                                    <input type="number" min="1" className="form-control"
                                    onChange={e => setFilter("quantity", Number(e.target.value))} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <br />
            </>
        );
    }
}