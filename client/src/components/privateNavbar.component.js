import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivateNavbar() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#privateNavbar" aria-controls="privateNavbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="privateNavbar">
                <Link to="/portfolio" className="navbar-brand">Stock Portfolio</Link>
                <ul className="navbar-nav ml-auto">
                    <li className="navbar-item">
                        <Link to="/portfolio" className="nav-link">Portfolio</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/transactions" className="nav-link">Transactions</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/logout" className="nav-link">Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}