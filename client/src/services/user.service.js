import axios from 'axios';

export const getPortfolio = () => {
    return axios.get('/portfolio', {
        headers: {Authorization: 'Bearer ' + sessionStorage.token}
    });
};

export const getTransactions = () => {
    return axios.get('/transactions',{
        headers: {Authorization: 'Bearer ' + sessionStorage.token}
    });
};