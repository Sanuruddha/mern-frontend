import { combineReducers } from "redux";
import itemReducer from './itemReducer';
import authReducer from './authReducer';
import listReducer from './listReducer';
import tabReducer from "./tabReducer";

export default combineReducers({
    item: itemReducer,
    auth: authReducer,
    list: listReducer,
    tab: tabReducer
});