import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import LoadingSpinner from '../common/loading-spinner';

import { logout } from '../../services/auth';

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
        <div className="row justify-content-center">
            <LoadingSpinner />
        </div>
    );
}

Logout.propTypes = {
    setIsAuth: PropTypes.func.isRequired
}

export default Logout;