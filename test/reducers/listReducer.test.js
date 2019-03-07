import {OPEN_ORDER} from "../../src/utils/consts";
import expect from 'expect';
import reducer from '../../src/reducers/listReducer';
import {
    ADD_LIST,
    DELETE_LIST,
    CLOSE_LIST,
    GET_LISTS,
    ITEMS_LOADING,
    LISTS_LOADING,
    SELECT_LIST, UPDATE_NEW_LIST, UPDATE_LIST, CLEAR_NEW_LIST
} from "../../src/actions/types";

const initialState = {
    lists: [],
    loading: false,
    selectedList: null,
    newList: {
        name: '',
        status: OPEN_ORDER,
        items: []
    }
};

describe("list reducer", () => {
    it('Should return the initial state when default runs',
        () => {
            expect(reducer(undefined, {}))
                .toEqual(initialState)
        });

    it('Should handle GET_LISTS',
        () => {
            expect(reducer({...initialState, loading: true},
                {
                    type: GET_LISTS,
                    payload: [{_id: 'test_id', name: 'test_list1', items: ['test_item_id1', 'test_item_id2']}]
                }))
                .toEqual({...initialState, loading: false ,lists: [{_id: 'test_id', name: 'test_list1', items: ['test_item_id1', 'test_item_id2']}]})
        });

    it('Should handle DELETE_LIST',
        () => {
            expect(reducer({...initialState, loading: false ,lists: [{_id: 'test_id', name: 'test_list1', items: ['test_item_id1', 'test_item_id2']}]},
                {
                    type: DELETE_LIST,
                    payload: 'test_id'
                }))
                .toEqual({...initialState, loading: false ,lists: []})
        });

    it('Should handle ADD_LIST',
        () => {
            expect(reducer({...initialState, lists: []},
                {
                    type: ADD_LIST,
                    payload: {_id: 'test_id', name: 'test_list1', items: ['test_item_id1', 'test_item_id2']}
                }))
                .toEqual({...initialState, lists: [{_id: 'test_id', name: 'test_list1', items: ['test_item_id1', 'test_item_id2']}]})
        });

    it('Should handle LISTS_LOADING',
        () => {
            expect(reducer({...initialState, loading: false},
                {
                    type: LISTS_LOADING
                }))
                .toEqual({...initialState, loading: true})
        });
    it('Should handle SELECT_LIST',
        () => {
            expect(reducer({...initialState},
                {
                    type: SELECT_LIST,
                    payload: 'test_id'
                }))
                .toEqual({...initialState, selectedList: 'test_id'})
        });

    it('Should handle UPDATE_NEW_LIST',
        () => {
            expect(reducer({...initialState},
                {
                    type: UPDATE_NEW_LIST,
                    payload: {_id: 'test_id', name: 'test_list', items:['test_item_id1', 'test_item_id2']}
                }))
                .toEqual({...initialState, newList: {_id: 'test_id', name: 'test_list', items:['test_item_id1', 'test_item_id2']}})
        });

    it('Should handle UPDATE_LIST',
        () => {
            expect(reducer({...initialState, lists: [{_id: 'test_id', name: 'test_list1', items: ['test_item_id1', 'test_item_id2']},
                        {_id: 'test_id2', name: 'test_list2', items: ['test_item_id3', 'test_item_id4']}]},
                {
                    type: UPDATE_LIST,
                    payload: {id: 'test_id', items:['test_item_id3', 'test_item_id4']}
                }))
                .toEqual({...initialState, lists: [{_id: 'test_id', name: 'test_list1', items: ['test_item_id3', 'test_item_id4']},
                        {_id: 'test_id2', name: 'test_list2', items: ['test_item_id3', 'test_item_id4']}]})
        });

    it('Should handle CLEAR_NEW_LIST',
        () => {
            expect(reducer({...initialState, newList: {_id: 'test_id', name: 'test_list', items:['test_item_id1', 'test_item_id2']}},
                {
                    type: CLEAR_NEW_LIST
                }))
                .toEqual(initialState)
        });
});