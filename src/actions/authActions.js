import axios from 'axios';
import { LOGGED_IN, LOGGED_OUT } from "./types";
import history from '../history'
import { setAuthHeader } from "../utils/setHeaders";

export const authenticate = (user) => dispatch => {

    return axios
        .post('/api/users/authenticate', user)
        .then(res => {
            setAuthHeader(res.data.token);
            dispatch(authenticateWithToken(res.data.token));
        }).catch();
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthHeader();
    return {
        type: LOGGED_OUT
    };
};

export const authenticateWithToken = (token) => dispatch => {
    setAuthHeader(token);
    return axios
        .get('/api/users/current')
        .then(res2 => {
                if(res2.status === 200) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(res2.data));
                    history.push('/dashboard');
                    const loggedIn = res2.status === 200;
                    dispatch({
                        type: LOGGED_IN,
                        payload: {token: token, user: res2.data, loggedIn: loggedIn}
                    })
                }
            }
        ).catch();
};

