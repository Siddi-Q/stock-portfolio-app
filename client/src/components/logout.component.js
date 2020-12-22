// import React, { Component } from 'react';
// import axios from 'axios';

// export default class Logout extends Component {

//     async componentDidMount() {
//         try {
//             await axios.post('/logout', null, {
//                 headers: {Authorization: sessionStorage.token}
//             });
//             sessionStorage.removeItem("token");
//             this.props.setIsAuth(false);
//         }
//         catch (error) {
//             console.error(error);
//         }
//     }

//     render() {
//         return (
//             <div>Logging out!</div>
//         );
//     }
// }

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