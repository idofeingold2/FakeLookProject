import { CLEAR_ERROR, ERROR_RESPONSE, NETWORK_ERROR, SET_ERROR } from "../actions/error";

const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ERROR_RESPONSE:
        case NETWORK_ERROR:
        case SET_ERROR:
            return action.err;

        case CLEAR_ERROR:
            return null;

        default:
            return state;
    }
}

export default reducer;