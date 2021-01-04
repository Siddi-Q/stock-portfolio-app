import axios from 'axios';

export const getPortfolio = () => {
    return axios.get('/portfolio', {
        headers: {Authorization: sessionStorage.token}
    });
};

export const getTransactions = () => {
    return axios.get('/transactions',{
        headers: {Authorization: sessionStorage.token}
    });
};

export const sell = async (ticker, quantity) => {
    const newItem = {
        ticker,
        quantity
    };
    
    await axios.post('/sell', newItem, {
        headers: {Authorization: sessionStorage.token}
    });
}