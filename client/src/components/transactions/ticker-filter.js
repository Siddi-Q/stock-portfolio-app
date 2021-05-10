import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

export default function TickerFilter(props) {
  const {preFilteredRows, setFilter} = props;
  const tickers = useMemo(() => {
    const tickers = new Set();
    preFilteredRows.forEach(row => tickers.add(row.values.ticker));
    return [...tickers.values()];
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
  setFilter: PropTypes.func.isRequired,
}
