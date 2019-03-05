import { LOGGED_IN, LOGGED_OUT } from "../../src/actions/types";
import * as authActions from '../../src/actions/authActions';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('creates a')
});

