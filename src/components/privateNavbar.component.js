import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PrivateNavbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <Link to="/portfolio" className="navbar-brand">Stock Portfolio</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/portfolio" className="nav-link">Portfolio</Link>
                        </li>
                        <li className="navbar-item nav-link">|</li>
                        <li className="navbar-item">
                            <Link to="/transactions" className="nav-link">Transactions</Link>
                        </li>
                        <li className="navbar-item nav-link">|</li>
                        <li className="navbar-item">
                            <Link to="/logout" className="nav-link">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}