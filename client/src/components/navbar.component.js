import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render(){
        return(
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to="/signin" className="navbar-brand">Stock Portfolio</Link>
                <div className="collapse navbar-collapse">
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
}
