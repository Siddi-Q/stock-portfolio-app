import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    onChangeName(event) {
        this.setState({
            name: event.target.value
        });
    }

    onChangeEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    onChangePassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    async onSubmit(event) {
        event.preventDefault();

        const userInfo = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        try {
            const res = await axios.post('/register', userInfo) // update url
            sessionStorage.setItem('token', res.data.authToken);
            this.props.setIsAuth(true);
        }
        catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <div className="container text-center mt-5">
                <h3>Register</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group row justify-content-center">
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <label className="sr-only">Name</label>
                            <input required type="text" className="form-control" placeholder="Name" autoFocus
                                value={this.state.name} onChange={this.onChangeName} />
                        </div>
                    </div>
                    <div className="form-group row justify-content-center">
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <label className="sr-only">Email</label>
                            <input required type="email" className="form-control" placeholder="Email"
                                value={this.state.email} onChange={this.onChangeEmail} />
                        </div>
                    </div>
                    <div className="form-group row justify-content-center">
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <label className="sr-only">Password</label>
                            <input required type="password" className="form-control" placeholder="Password"
                                value={this.state.password} onChange={this.onChangePassword} />
                        </div>
                    </div>
                    <div className="form-group row justify-content-center">
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <input type="submit" value="Submit" className="btn btn-lg btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }

}