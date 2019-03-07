import expect from 'expect';
import reducer from '../../src/reducers/tabReducer';
import { CHANGE_ACTIVE_TAB } from '../../src/actions/types';
import { OPEN_ORDER_TAB, NEW_ORDER_TAB } from '../../src/utils/consts';

const initialState = {
    openOrders: true,
    newOrder: false,
    items: true,
    newItem: false
};


describe("tag reducer", () => {
    it('Should return the initial state when default runs',
        () => {
            expect(reducer(undefined, {}))
                .toEqual(initialState)
        });

    it('Should handle CHANGE_ACTIVE_TAB',
        () => {
            expect(reducer({...initialState, openOrders: true, newOrder:false},
                {
                    type: CHANGE_ACTIVE_TAB,
                    payload: {
                        fromTab: OPEN_ORDER_TAB,
                        ToTab: NEW_ORDER_TAB
                    }
                }))
                .toEqual({...initialState, openOrders: false, newOrder: true})
        });
});