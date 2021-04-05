import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';

import GlobalFilter from './global-filter';
import LoadingSpinner from '../common/loading-spinner';

import { getTransactions } from '../../services/user';

import {caretUpFill, caretDownFill, chevronLeft, chevronDoubleLeft, chevronRight, chevronDoubleRight} from '../../icons/icons';
import "../../styles/styles.css";

function TickerFilter(props) {
    const {preFilteredRows, setFilter} = props;
    const tickers = useMemo(() => {
        const tickers = new Set();
        preFilteredRows.forEach(row => tickers.add(row.values.ticker));
        return [...tickers.values()]
    }, [preFilteredRows]);

    return (
        <select id="ticker-filter" className="custom-select" onChange={e => setFilter("ticker", e.target.value)}>
            <option value="">ALL</option>
            {tickers.map((ticker, idx) => (
                <option key={idx} value={ticker}>{ticker}</option>
            ))}
        </select>
    );
}

TickerFilter.propTypes = {
    preFilteredRows: PropTypes.array.isRequired,
    setFilter: PropTypes.func.isRequired
}

export default function Transactions() {
    const [transactionsList, setTransactionsList] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = useMemo(
        () => [
            {Header: 'Type', accessor: 'type'},
            {Header: 'Ticker', accessor: 'ticker', Cell: ({value}) => <Link to={`${value}/company`}>{value}</Link>},
            {Header: 'Quantity', accessor: 'quantity', Cell: ({value}) => value + " Share" + (value > 1 ? "s" : "")},
            {Header: 'Price', accessor: 'price', Cell: ({value}) => "$" + value.toFixed(2)}
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
        setAllFilters,
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
                <h1 className="mb-3">Transactions <span className="badge badge-dark">{transactionsList.length}</span></h1>
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
                                    <select id="type-filter" className="custom-select" onChange={e => setFilter("type", e.target.value)}>
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
                                    <input id="quantity-filter" type="number" min="1" className="form-control"
                                    onChange={e => setFilter("quantity", Number(e.target.value))} />
                                </div>
                            </div>
                            <div className="form-group row justify-content-center">
                                <button type="button" className="btn btn-light border"
                                onClick={() => {
                                    setAllFilters([]);
                                    document.getElementById("quantity-filter").value = null;
                                    document.getElementById("type-filter").value = "";
                                    document.getElementById("ticker-filter").value = "";
                                }}>Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
                <br />
            </>
        );
    }
}