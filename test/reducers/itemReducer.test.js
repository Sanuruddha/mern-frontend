import expect from 'expect';
import reducer from '../../src/reducers/itemReducer';
import {GET_ITEMS, ITEMS_LOADING, DELETE_ITEM, ADD_ITEM} from "../../src/actions/types";
const initialState = {
    items: [],
    loading: false
};

describe("item reducer", () => {
    it('Should return the initial state when default runs',
        () => {
            expect(reducer(undefined, {}))
                .toEqual(initialState)
        });
    it('Should handle GET_ITEMS',
        () => {
            expect(reducer(initialState,
                {
                    type: GET_ITEMS,
                    payload: [{_id: 'test_id', name: 'test_item1', }]
                }))
                .toEqual({...initialState, items: [{_id: 'test_id', name: 'test_item1', }]})
        });
    it('Should handle ADD_ITEM',
        () => {
            expect(reducer({...initialState, items: [{_id: 'test_id', name: 'test_item' }]},
                {
                    type: ADD_ITEM,
                    payload: {_id: 'test_id1', name: 'test_item1' }
                }))
                .toEqual({...initialState, items: [{_id: 'test_id', name: 'test_item', }, {_id: 'test_id1', name: 'test_item1', }]})
        });
    it('Should handle DELETE_ITEM',
        () => {
            expect(reducer({...initialState, items: [{_id: 'test_id', name: 'test_item' }]},
                {
                    type: DELETE_ITEM,
                    payload: 'test_id'
                }))
                .toEqual({...initialState, items: []})
        });
    it('Should handle ITEMS_LOADING',
        () => {
            expect(reducer({...initialState, loading: false},
                {
                    type: ITEMS_LOADING
                }))
                .toEqual({...initialState, loading: true})
        });

});