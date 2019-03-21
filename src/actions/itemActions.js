import {GET_ITEMS, DELETE_ITEM, ADD_ITEM, ITEMS_LOADING} from "./types";
import axios from 'axios';

export const getItems = () => (dispatch) => {
    dispatch(setItemsLoading());
    return axios
        .get('/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
};

export const deleteItem = (id) => (dispatch) => {
    return axios
        .delete(`/api/items/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_ITEM,
                payload: id
            }))
};

export const addItem = item => (dispatch) => {
    return axios
        .post('/api/items', item)
        .then(res =>
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            }))
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
};