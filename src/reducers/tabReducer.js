import { CHANGE_ACTIVE_TAB } from "../actions/types";

const initialState = {
    openOrders: true,
    newOrder: false,
    items: true,
    newItem: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case CHANGE_ACTIVE_TAB:
            return {
                ...state,
                [action.payload.fromTab] : false,
                [action.payload.ToTab] : true
            };
        default:
            return state;
    }
}