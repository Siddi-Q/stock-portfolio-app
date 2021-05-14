import axios from 'axios';

export const verify = () => {
  return axios.post('/auth/verify', null, {
    headers: {Authorization: 'Bearer ' + sessionStorage.token}
  });
}

export const register = async (name, email, password) => {
  const userInfo = {
    name,
    email,
    password
  }

  const res = await axios.post('/auth/register', userInfo);
  sessionStorage.setItem('token', res.data.authToken);
}

export const signin = async (email, password) => {
  const userCredentials = {
    email,
    password
  }

  const res = await axios.post('/auth/signin', userCredentials);
  sessionStorage.setItem('token', res.data.authToken);
}

export const logout = async () => {
  await axios.post('/auth/logout', null, {
    headers: {Authorization: 'Bearer ' + sessionStorage.token}
  });

  sessionStorage.removeItem('token');
}
