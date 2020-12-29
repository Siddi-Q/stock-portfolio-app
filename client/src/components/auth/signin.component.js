import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { signin } from '../../services/auth.service';

export default function Signin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function onChangeEmail(event) {
        setEmail(event.target.value);
    }

    function onChangePassword(event) {
        setPassword(event.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();

        signin(email, password)
        .then(() => {
            props.setIsAuth(true);
        })
        .catch((error) => {
            setErrorMessage(error.response.data.message);
        })
    }

    return (
        <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7 col-sm-10 col-12 align-self-end">
                <div className="card card-container" style={{padding: "40px 40px", backgroundColor: "#f7f7f7"}}>
                    <h3 className="text-center" style={{padding: "0px 0px 10px 0px"}}>Sign in</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                                <label className="sr-only">Email</label>
                                <input required type="email" className="form-control" placeholder="Email" autoFocus
                                    value={email} onChange={onChangeEmail} />
                        </div>
                        <div className="form-group">
                                <label className="sr-only">Password</label>
                                <input required type="password" className="form-control" placeholder="Password"
                                    value={password} onChange={onChangePassword} />
                        </div>
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p> }
                        <div className="form-group">
                            <input type="submit" value="Sign in" className="btn btn-primary btn-block" />
                        </div>
                    </form>
                    <Link to="/register">Don't have an account? Sign Up</Link>
                </div>
            </div>
        </div>
    );
}