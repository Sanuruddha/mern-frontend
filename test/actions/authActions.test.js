import expect from 'expect';
import * as authActions from '../../src/actions/authActions';
import { LOGGED_IN, LOGGED_OUT } from "../../src/actions/types";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initState = {
    loggedIn: false,
    user: {},
    loading: false,
    token: ''
};

describe("item actions", () => {
    beforeEach(() => {
        moxios.install()
    });
    afterEach(() => {
        moxios.uninstall()
    });

    it('authenticate should not create any action', (done) => {
        const expectedAction = [];
        const store = mockStore(initState);

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {token: 'test_token', username: 'test_user'}
            }).then(function () {
            })
        });
        return store.dispatch(authActions.authenticate({username: 'test_user', password: '123'})).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
            done();
        });

    });

    it('authenticateWithToken should create LOGGED_IN when valid token provided', (done) => {
        const expectedAction = [
            {
                type: LOGGED_IN,
                payload: {token: 'test_token', user: {username: 'test_user'}, loggedIn: true}
            }];
        const store = mockStore(initState);
        const token = 'test_token';
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {username: 'test_user'}
            }).then(function () {
            })
        });
        return store.dispatch(authActions.authenticateWithToken(token)).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
            done();
        });

    });

    it('authenticateWithToken should not create LOGGED_IN when invalid token provided ', (done) => {
        const expectedAction = [];
        const store = mockStore(initState);
        const token = 'test_invalid_token';
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
                response: 'unauthorized'
            }).then(function () {
            })
        });
        return store.dispatch(authActions.authenticateWithToken(token)).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
            done();
        });

    });

    it('logout should create ITEMS_LOADING', () => {
        const expectedAction = {
            type: LOGGED_OUT
        };
        expect(authActions.logout()).toEqual(expectedAction);
    });
});

