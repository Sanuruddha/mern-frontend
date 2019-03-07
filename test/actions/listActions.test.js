import expect from 'expect';
import * as listActions from '../../src/actions/listActions';
import {
    ADD_LIST,
    CLEAR_NEW_LIST,
    DELETE_LIST,
    GET_LISTS,
    ITEMS_LOADING,
    LISTS_LOADING,
    SELECT_LIST, UPDATE_LIST, UPDATE_NEW_LIST
} from "../../src/actions/types";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {OPEN_ORDER} from "../../src/utils/consts";
import * as itemActions from "../../src/actions/itemActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initState = {
    lists: [],
    loading: false,
    selectedList: null,
    newList: {
        name: '',
        status: OPEN_ORDER,
        items: []
    }
};

describe("list actions", () => {
    beforeEach(() => {
        moxios.install()
    });
    afterEach(() => {
        moxios.uninstall()
    });

    it('getLists should create ITEMS_LOADING, GET_LISTS', (done) => {
        const expectedAction = [
            {
                type: LISTS_LOADING
            },
            {
                type: GET_LISTS,
                payload: [{name: 'test_list_1'}, {name: 'test_list_2'}]
            }];
        const store = mockStore(initState);

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: [{name: 'test_list_1'}, {name: 'test_list_2'}]
            }).then(function () {
            })
        });
        return store.dispatch(listActions.getLists()).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
            done();
        });

    });

    it('createList should create ITEMS_LOADING, GET_LISTS', (done) => {
        const expectedAction = [
            {
                type: CLEAR_NEW_LIST
            },
            {
                type: ADD_LIST,
                payload: {name: 'test_list', status: 0, items: []}
            }];
        const store = mockStore(initState);

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {name: 'test_list', status: 0, items: []}
            }).then(function () {
            })
        });
        return store.dispatch(listActions.createList({name: 'test_list', status: 0, items: []})).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
            done();
        });

    });

    it('removeList should create DELETE_LIST', (done) => {
        const expectedAction = [
            {
                type: DELETE_LIST,
                payload: 'test_id'
            }];
        const store = mockStore(initState);

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {_id: 'test_id'}
            }).then(function () {
            })
        });
        return store.dispatch(listActions.removeList('test_id')).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
            done();
        });

    });

    it('closeList should create DELETE_LIST, ADD_LIST', (done) => {
        const expectedAction = [
            {
                type: DELETE_LIST,
                payload: 'test_id'
            },
            {
                type: ADD_LIST,
                payload: {_id: 'test_id', status: 0, items: []}
            }
        ];
        const store = mockStore(initState);

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {_id: 'test_id', status: 0, items: []}
            }).then(function () {
            })
        });
        return store.dispatch(listActions.closeList({_id: 'test_id', status: 0, items: []})).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
            done();
        });

    });

    it('selectList should create SELECT_LIST', () => {
        const id = 'test_id';
        const expectedAction = {
            type: SELECT_LIST,
            payload: id
        };
        expect(listActions.selectList(id)).toEqual(expectedAction);
    });

    it('setListsLoading should create LISTS_LOADING', () => {
        const expectedAction = {
            type: LISTS_LOADING
        };
        expect(listActions.setListsLoading()).toEqual(expectedAction);
    });

    it('addToList should create UPDATE_LIST', (done) => {
        const expectedAction = [
            {
                type: UPDATE_LIST,
                payload: {id: 'test_id', items : ['test_item_1', 'test_item2']}
            }
        ];
        const store = mockStore(initState);
        const listId = 'test_id';
        const itemId = 'test_item_id';
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: ['test_item_1', 'test_item2']
            }).then(function () {
            })
        });
        return store.dispatch(listActions.addToList(listId, itemId)).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
            done();
        });

    });

    it('removeFromList should create UPDATE_LIST', (done) => {
        const expectedAction = [
            {
                type: UPDATE_LIST,
                payload: {id: 'test_id', items : ['test_item_1', 'test_item2']}
            }
        ];
        const store = mockStore(initState);
        const listId = 'test_id';
        const itemId = 'test_item_id';
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: ['test_item_1', 'test_item2']
            }).then(function () {
            })
        });
        return store.dispatch(listActions.removeFromList(listId, itemId)).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
            done();
        });

    });

    it('updateNewList should create UPDATE_NEW_LIST', () => {
        const expectedAction = {
            type: UPDATE_NEW_LIST,
            payload: {id: 'test_id', status: 0, items : ['test_item_1', 'test_item2']}
        };
        expect(listActions.updateNewList({id: 'test_id', status: 0, items : ['test_item_1', 'test_item2']})).toEqual(expectedAction);

    });
});