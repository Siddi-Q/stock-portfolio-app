// import React, { Component } from 'react';
// import axios from 'axios';

// import TransactionsListItem from './transactions-list-item.component';

// export default class TransactionsList extends Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             transactionsList: []
//         }
//     }

//     async componentDidMount() {
//         try {
//             const transactionsList = await axios.get('/transactions',{
//                 headers: {Authorization: sessionStorage.token}
//             });
    
//             this.setState(state => ({
//                 transactionsList: transactionsList.data
//             }));
//         }
//         catch (error) {
//             console.error(error);
//         }
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Transactions</h1>
//                 <br />
//                 <div className="row">
//                     <div className="col-sm-12 col-lg-8">
//                         <table className="table table-hover">
//                             <tbody>
//                                 {this.state.transactionsList.map((item, index) => (
//                                 <TransactionsListItem key={index} item={item}/>))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TransactionsListItem from './transactions-list-item.component';

export default function TransactionsList() {
    const [transactionsList, setTransactionsList] = useState([]);

    useEffect(() => {
        try {
            axios.get('/transactions',{
                headers: {Authorization: sessionStorage.token}
            }).then(res => {
                setTransactionsList(res.data);
            });
        }
        catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <div>
            <h1>Transactions</h1>
            <br />
            <div className="row">
                <div className="col-sm-12 col-lg-8">
                    <table className="table table-hover">
                        <tbody>
                            {transactionsList.map((item, index) => (
                            <TransactionsListItem key={index} item={item}/>))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
