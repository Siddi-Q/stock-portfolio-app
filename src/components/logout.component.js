import React, { Component } from 'react';
import axios from 'axios';

export default class Logout extends Component {

    async componentDidMount() {
        try {
            await axios.post('http://localhost:5000/logout', null, {
                headers: {Authorization: sessionStorage.token}
            });
            sessionStorage.removeItem("token");
            this.props.setIsAuth(false);
        }
        catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <div>Logging out!</div>
        );
    }
}