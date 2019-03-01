import axios from 'axios';
import { LOGGED_IN, LOGGED_OUT } from "./types";
import history from '../history'
import { setAuthHeader } from "../utils/setHeaders";

export const authenticate = (user) => dispatch => {

    axios
        .post('/api/users/authenticate', user)
        .then(res1 => {
            setAuthHeader(res1.data.token);
            axios
                .get('/api/users/current')
                .then(res2 => {
                    if(res2.status === 200) {
                        localStorage.setItem('token', res1.data.token);
                        localStorage.setItem('user', JSON.stringify(res2.data));
                        history.push('/body');
                    }
                    const loggedIn = res2.status === 200;
                        dispatch({
                            type: LOGGED_IN,
                            payload: {token: res1.data.token, user: res2.data, loggedIn: loggedIn}
                        })
                    }
            ).catch();
        }).catch();
};

export const logout = () => dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthHeader();
    dispatch({
        type: LOGGED_OUT
    });
};

export const authenticateWithToken = (token) => dispatch => {
    setAuthHeader(token);
    axios
        .get('/api/users/current')
        .then(res2 => {
                if(res2.status === 200) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(res2.data));
                    history.push('/body');
                }
                const loggedIn = res2.status === 200;
                dispatch({
                    type: LOGGED_IN,
                    payload: {token: token, user: res2.data, loggedIn: loggedIn}
                })
            }
        ).catch();
};

