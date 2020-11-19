import React, { Component } from 'react';
import axios from 'axios';

export default class Signin extends Component {

    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        }
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

        const userCredentials = {
            email: this.state.email,
            password: this.state.password
        }

        try {
            const res = await axios.post('/signin', userCredentials) // update url
            sessionStorage.setItem('token', res.data.authToken);
            this.props.setIsAuth(true);
        }
        catch (error) {
            this.setState({errorMessage: error.response.data.message});
        }
    }

    render() {
        return (
            <div className="container text-center mt-5">
                <h3>Sign in</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group row justify-content-center">
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <label className="sr-only">Email</label>
                            <input required type="email" className="form-control" placeholder="Email" autoFocus
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
                    {this.state.errorMessage && <p style={{ color: "red" }}>{this.state.errorMessage}</p> }
                    <div className="form-group row justify-content-center">
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <input type="submit" value="Sign in" className="btn btn-lg btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
