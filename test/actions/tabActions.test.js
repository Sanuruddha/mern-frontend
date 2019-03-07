import { CHANGE_ACTIVE_TAB } from "../../src/actions/types";
import { NEW_ORDER_TAB, OPEN_ORDER_TAB } from '../../src/utils/consts';
import expect from "expect";
import * as tabActions from "../../src/actions/tabActions";

describe("tab actions", () => {
    it('changeActiveTab should create CHANGE_ACTIVE_TAB', () => {
        const expectedAction = {
            type: CHANGE_ACTIVE_TAB,
            payload: {
                fromTab: NEW_ORDER_TAB,
                ToTab: OPEN_ORDER_TAB
            }
        };
        expect(tabActions.changeActiveTab(NEW_ORDER_TAB, OPEN_ORDER_TAB)).toEqual(expectedAction);
    });
});