import axios from 'axios';

export const buy = async (ticker, quantity) => {
    const newItem = {
        ticker,
        quantity
    };

    await axios.post('/stock/buy', newItem, {
        headers: {Authorization: 'Bearer ' + sessionStorage.token}
    });
}

export const sell = async (ticker, quantity) => {
    const newItem = {
        ticker,
        quantity
    };
    
    await axios.post('/stock/sell', newItem, {
        headers: {Authorization: 'Bearer ' + sessionStorage.token}
    });
}