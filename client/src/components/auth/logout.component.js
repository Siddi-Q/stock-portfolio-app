import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { logout } from '../../services/auth.service';

function Logout(props) {
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

Logout.propTypes = {
    setIsAuth: PropTypes.func.isRequired
}

export default Logout;