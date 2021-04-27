import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#publicNavbar" aria-controls="publicNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="publicNavbar">
        <Link to="/signin" className="navbar-brand">Stock Portfolio</Link>
        <ul className="navbar-nav ml-auto">
          <li className="navbar-item">
            <Link to="/signin" className="nav-link">Signin</Link>
          </li>
          <li className="navbar-item">
            <Link to="/register" className="nav-link">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
