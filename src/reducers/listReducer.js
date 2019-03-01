import {
    ADD_LIST,
    DELETE_LIST,
    GET_LISTS_BY_USER,
    LISTS_LOADING,
    CLOSE_LIST,
    GET_LISTS,
    SELECT_LIST,
    UPDATE_LIST,
    UPDATE_NEW_LIST,
    CLEAR_NEW_LIST
} from "../actions/types";
import {OPEN_ORDER} from "../utils/consts";


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

export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_NEW_LIST:
            return {
                ...state,
                newList: action.payload
            };
        case GET_LISTS_BY_USER:
            return {
                ...state,
                lists: action.payload,
                loading: false
            };
        case GET_LISTS:
            return {
                ...state,
                lists: action.payload,
                loading: false
            };
        case DELETE_LIST:
            return {
                ...state,
                lists: state.lists.filter(list => list._id !== action.payload),
            };
        case ADD_LIST:
            return {
                ...state,
                lists: [...state.lists, action.payload]
            };
        case CLOSE_LIST:
            return {
                ...state,
                lists: [...state.lists, action.payload]
            };
        case LISTS_LOADING:
            return {
                ...state,
                loading: true
            };
        case SELECT_LIST:
            return {
                ...state,
                selectedList: action.payload
            };
        case UPDATE_LIST:
            return {
                ...state,
                lists: state.lists.map(list => {
                    return list._id === action.payload.id? {...list, items: action.payload.items}: list;
                })
            };
        case CLEAR_NEW_LIST:
            return {
                ...state,
                newList: {
                    name: '',
                    status: OPEN_ORDER,
                    items: []
                }
            };
        default:
            return state;
    }
}