import React from 'react';
import PropTypes from 'prop-types';

export default function GlobalFilter(props) {
  const {filter, setFilter} = props;

  return (
    <>
      <label className="sr-only" htmlFor="search">Search</label>
      <input id="search" type="search" placeholder="Search" aria-label="Search" className="form-control" 
      value={filter || ''} onChange={e => setFilter(e.target.value)} />
    </>
  );
}

GlobalFilter.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func.isRequired,
}
