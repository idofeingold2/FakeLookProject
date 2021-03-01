import axios from 'axios'
import { URLS } from '../common/urls'

export const userLogin = (email, password) => {
    return axios.post(`${URLS.api}/user/login`, {email, password});
};

export const userRegister = (username, email, password, fname) => {
    return axios.post(`${URLS.api}/user/register`, {
        username,
        email,
        password, 
        fname
    });
};

export const userUpdate = (user) => {
    return axios.put(`${URLS.api}/user/update/${user.id}`, { user });
};