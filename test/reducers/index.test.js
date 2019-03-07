import expect from 'expect';
import rootReducer from '../../src/reducers/index';
import { createStore } from "redux";
import item from '../../src/reducers/itemReducer';
import auth from '../../src/reducers/authReducer';
import tab from '../../src/reducers/tabReducer';
import list from '../../src/reducers/listReducer';


let store = createStore(rootReducer)

describe("index reducer", () => {
    it('Should return the combined reducer', () => {
        expect(store.getState().item).toEqual(item(undefined, {}))
        expect(store.getState().list).toEqual(list(undefined, {}))
        expect(store.getState().auth).toEqual(auth(undefined, {}))
        expect(store.getState().tab).toEqual(tab(undefined, {}))
    });

});