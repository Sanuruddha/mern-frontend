import {GET_ITEMS, DELETE_ITEM, ADD_ITEM, ITEMS_LOADING} from "./types";
import axios from 'axios';
import { toast } from 'react-toastify';

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
        .then(res => {
            dispatch({
                type: DELETE_ITEM,
                payload: id
            });
            toast('Item deleted successfully',  { type: 'success', autoClose: 2000, hideProgressBar: true});
        });
};

export const addItem = item => (dispatch) => {
    return axios
        .post('/api/items', item)
        .then(res => {
                dispatch({
                    type: ADD_ITEM,
                    payload: res.data
                });
            toast('Item added successfully',  { type: 'success', autoClose: 2000, hideProgressBar: true});
        });
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
};