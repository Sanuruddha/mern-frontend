import expect from 'expect';
import reducer from '../../src/reducers/authReducer';
import {AUTH_LOADING, LOGGED_IN, LOGGED_OUT} from "../../src/actions/types";

const initialState = {
    loggedIn: false,
    user: {},
    loading: false,
    token: ''
};

describe("auth reducer", () => {
    it('Should return the initial state when default runs',
        () => {
        expect(reducer(undefined, {}))
            .toEqual(initialState)
        });
    it('Should handle LOGGED_IN',
        () => {
            expect(reducer(initialState,
                {
                    type: LOGGED_IN,
                    payload:{token: 'token',
                    user: {name: "user"},
                    loggedIn: true}}))
                .toEqual({...initialState,token: 'token', loggedIn: true, user: {name: "user"}});
        });
    it('Should handle LOGGED_OUT',
        () => {
            expect(reducer({...initialState, loggedIn: true},
                {
                    type: LOGGED_OUT}
                ))
                .toEqual(initialState)
        });
    it('Should handle AUTH_LOADING',
        () => {
            expect(reducer(initialState,
                {
                    type: AUTH_LOADING}))
                .toEqual({...initialState, loading: true})
        });
});