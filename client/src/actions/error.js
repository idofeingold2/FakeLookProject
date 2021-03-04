export const ERROR_RESPONSE = 'ERROR_RESPONSE';
export const NETWORK_ERROR = 'NETWORK_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SET_ERROR = 'SET_ERROR';

export const errorResponse = (status, err) => ({
    type: ERROR_RESPONSE,
    status: status,
    error: err
});

export const networkError = (err) => ({
    type: NETWORK_ERROR,
    error: err
});

export const setError = (message) => ({
    type: SET_ERROR,
    err: message
})

export const clearError = () => ({
    type: CLEAR_ERROR
})