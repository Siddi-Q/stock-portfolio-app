import React, { useEffect } from 'react';
// import axios from 'axios';

import { logout } from '../../services/auth.service';

export default function Logout(props) {
    useEffect(() => {
        logout()
        .then(() => {
            props.setIsAuth(false);
        })
        .catch((error) => {
            console.error(error);
        })
    });

    return (
        <div>Logging out!</div>
    );
}