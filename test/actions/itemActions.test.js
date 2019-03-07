import expect from 'expect';
import * as itemActions from '../../src/actions/itemActions';
import {ADD_ITEM, DELETE_ITEM, GET_ITEMS, ITEMS_LOADING} from "../../src/actions/types";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initState = {
    items: [],
    loading: false
};

describe("item actions", () => {
    beforeEach(() => {
        moxios.install()
    });
    afterEach(() => {
        moxios.uninstall()
    });

    it('getItems should create ITEMS_LOADING, GET_ITEMS', (done) => {
        const expectedAction = [
            {
                type: ITEMS_LOADING
            },
            {
                type: GET_ITEMS,
                payload: [{name: 'test_item_1'}, {name: 'test_item_2'}]
            }];
        const store = mockStore(initState);

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: [{name: 'test_item_1'}, {name: 'test_item_2'}]
            }).then(function () {
            })
        });
        return store.dispatch(itemActions.getItems()).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
            done();
        });

    });

    it('deleteItem should create DELETE_ITEM', (done) => {
        const expectedAction = [
            {
                type: DELETE_ITEM,
                payload: 'test_id'
            }];
        const store = mockStore(initState);

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: 'test_id'
            }).then(function () {
            })
        });

        return store.dispatch(itemActions.deleteItem('test_id')).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedAction);
            done();
        })
    });

    it('addItem should create ADD_ITEM', (done) => {
        const expectedAction = [
            {
                type: ADD_ITEM,
                payload: {name: 'test_item', price: 0, description: 'test description'}
            }];
        const store = mockStore(initState);

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {name: 'test_item', price: 0, description: 'test description'}
            }).then(function () {
            })
        });

        return store.dispatch(itemActions.addItem({name: 'test_item', price: 0, description: 'test description'})).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedAction);
            done();
        })
    });

    it('setItemsLoading should create ITEMS_LOADING', () => {
        const expectedAction = {
                type: ITEMS_LOADING
        };
        expect(itemActions.setItemsLoading()).toEqual(expectedAction);
    });
});