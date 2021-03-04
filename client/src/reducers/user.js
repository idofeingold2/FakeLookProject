import { LOGIN_USER, REGISTER_USER, UPDATE_USER } from "../actions/user";

const userReducer = (user = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
        case REGISTER_USER:
        case UPDATE_USER:
            sessionStorage.setItem('user')
            return action.user
        default:
            return user;
    }
};

export default userReducer;