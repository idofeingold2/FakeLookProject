import {
    userLogin,
    userRegister,
    userUpdate
} from '../services/UserAuthService';
import {errorResponse, networkError} from './error';

export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const UPDATE_USER = "UPDATE_USER";

export const setUser = (user) => ({
    type: LOGIN_USER,
    user
});

const registerUser = (user) => ({
    type: REGISTER_USER,
    user
});

export const registerUserAsync = (username, email, password) => {
    return (dispatch) =>
    userRegister(username, email, password)
    .then (({status, statusText, data}) =>
        status < 300
        ? dispatch(registerUser(data))
        : dispatch(errorResponse(status,statusText))
    )
    .catch((err) => dispatch(networkError(err)));
};

const updateUser = (user) => ({
    type: UPDATE_USER,
    user
});

export const updateUserAsync = (user) => {
    return (dispatch) => 
    userUpdate(user)
    .then (({status, statusText, data}) =>
    status < 300
    ? dispatch(updateUser(data))
    : dispatch(errorResponse(status,statusText))
)
.catch((err) => dispatch(networkError(err)));
}