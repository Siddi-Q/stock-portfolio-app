import React, { useState } from 'react';

import { register } from '../../services/auth.service';

export default function Register(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        register(name, email, password)
        .then(() => {
            props.setIsAuth(true);
        })
        .catch(() => {
            setErrorMessage("Email is in use!");
        })
    }

    return (
        <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7 col-sm-10 col-12 align-self-end">
                <div className="card card-container" style={{padding: "40px 40px", backgroundColor: "#f7f7f7"}}>
                    <h3 className="text-center" style={{padding: "0px 0px 10px 0px"}}>Register</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="sr-only">Name</label>
                            <input required type="text" className="form-control" placeholder="Name" autoFocus
                                value={name} onChange={handleNameChange} />
                        </div>
                        <div className="form-group">
                            <label className="sr-only">Email</label>
                            <input required type="email" className="form-control" placeholder="Email"
                                value={email} onChange={handleEmailChange} />
                        </div>
                        <div className="form-group">
                            <label className="sr-only">Password</label>
                            <input required type="password" className="form-control" placeholder="Password"
                                value={password} onChange={handlePasswordChange} />
                        </div>
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p> }
                        <div className="form-group">
                                <input type="submit" value="Submit" className="btn btn-primary btn-block" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}