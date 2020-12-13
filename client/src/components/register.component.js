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
            password: '',
            errorMessage: ''
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
            this.setState({errorMessage: "Email is in use!"})
        }
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-lg-5 col-md-7 col-sm-10 col-12 align-self-end">
                    <div className="card card-container" style={{padding: "40px 40px", backgroundColor: "#f7f7f7"}}>
                        <h3 className="text-center" style={{padding: "0px 0px 10px 0px"}}>Register</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label className="sr-only">Name</label>
                                <input required type="text" className="form-control" placeholder="Name" autoFocus
                                    value={this.state.name} onChange={this.onChangeName} />
                            </div>
                            <div className="form-group">
                                <label className="sr-only">Email</label>
                                <input required type="email" className="form-control" placeholder="Email"
                                    value={this.state.email} onChange={this.onChangeEmail} />
                            </div>
                            <div className="form-group">
                                <label className="sr-only">Password</label>
                                <input required type="password" className="form-control" placeholder="Password"
                                    value={this.state.password} onChange={this.onChangePassword} />
                            </div>
                            {this.state.errorMessage && <p style={{ color: "red" }}>{this.state.errorMessage}</p> }
                            <div className="form-group">
                                    <input type="submit" value="Submit" className="btn btn-primary btn-block" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}