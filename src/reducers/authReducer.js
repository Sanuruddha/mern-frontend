import { LOGGED_IN, LOGGED_OUT, AUTH_LOADING } from "../actions/types";

const initialState = {
    loggedIn: false,
    user: {},
    loading: false,
    token: ''
};

export default function(state = initialState, action) {
    switch(action.type) {
        case LOGGED_IN:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                loggedIn: action.payload.loggedIn,
            };
        case LOGGED_OUT:
            return {
                ...state,
                token: '',
                user: {},
                loggedIn: false,
                loading: false,
            };
        case AUTH_LOADING:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
}