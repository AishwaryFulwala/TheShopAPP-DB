import { AUTHENTICATE, LOGOUT } from '../actions/Auth'

const initState = {
    token: null,
    userId: null,
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId,
            };
            
        case LOGOUT:
            return initState;

        default:
            return state;
    }
};

export default AuthReducer;