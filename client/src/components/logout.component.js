import React, { useEffect } from 'react';
import axios from 'axios';

export default function Logout(props) {
    useEffect(() => {
        try {
            axios.post('/logout', null, {
                headers: {Authorization: sessionStorage.token}
            }).then(() => {
                sessionStorage.removeItem("token");
                props.setIsAuth(false);
            });
        }
        catch (error) {
            console.error(error);
        }
    });

    return (
        <div>Logging out!</div>
    );
}