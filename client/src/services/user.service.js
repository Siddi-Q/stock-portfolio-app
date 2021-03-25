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

export const sell = async (ticker, quantity) => {
    const newItem = {
        ticker,
        quantity
    };
    
    await axios.post('/stock/sell', newItem, {
        headers: {Authorization: 'Bearer ' + sessionStorage.token}
    });
}

export const buy = async (ticker, quantity) => {
    const newItem = {
        ticker,
        quantity
    };

    await axios.post('/stock/buy', newItem, {
        headers: {Authorization: 'Bearer ' + sessionStorage.token}
    });
}