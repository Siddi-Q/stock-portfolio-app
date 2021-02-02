import axios from 'axios';

export const verify = () => {
    return axios.post('/verify', null, {
        headers: {Authorization: 'Bearer ' + sessionStorage.token}
    });
};

export const register = async (name, email, password) => {
    const userInfo = {
        name,
        email,
        password
    }

    const res = await axios.post('/register', userInfo);
    sessionStorage.setItem('token', res.data.authToken);
};

export const signin = async (email, password) => {
    const userCredentials = {
        email,
        password
    }
    
    const res = await axios.post('/signin', userCredentials);
    sessionStorage.setItem('token', res.data.authToken);
};

export const logout = async () => {
    await axios.post('/logout', null, {
        headers: {Authorization: 'Bearer ' + sessionStorage.token}
    });
    sessionStorage.removeItem("token");
}