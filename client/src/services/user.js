import axios from 'axios';

export const getPortfolio = () => {
    return axios.get('/user/portfolio', {
        headers: {Authorization: 'Bearer ' + sessionStorage.token}
    });
};

export const getTransactions = () => {
    return axios.get('/user/transactions',{
        headers: {Authorization: 'Bearer ' + sessionStorage.token}
    });
};