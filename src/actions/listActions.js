import {
    LISTS_LOADING,
    DELETE_LIST,
    GET_LISTS,
    SELECT_LIST,
    ADD_LIST,
    UPDATE_LIST,
    UPDATE_NEW_LIST,
    CLEAR_NEW_LIST
} from "./types";
import axios from 'axios';
import {toast} from "react-toastify";

export const clearList = () => {
    return {
        type:CLEAR_NEW_LIST,
    }
};

export const createList = (list) => (dispatch) => {
    dispatch({
        type: CLEAR_NEW_LIST
    });
    return axios
        .post(`/api/lists`, list)
        .then(res => {
            dispatch({
                type: ADD_LIST,
                payload: res.data
            });
            toast('List added successfully',  { type: 'success', autoClose: 2000, hideProgressBar: true});
        });
};

export const getLists = (id) => (dispatch) => {
    dispatch(setListsLoading());
    return axios
        .get(`/api/lists/user/${id}`)
        .then(res => dispatch({
            type: GET_LISTS,
            payload: res.data
        }))
};

export const removeList = (id) => (dispatch) => {
    return axios
        .delete(`/api/lists/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_LIST,
                payload: res.data._id
            });
            toast('List deleted successfully',  { type: 'success', autoClose: 2000, hideProgressBar: true});
        });

};

export const closeList = list => (dispatch) => {
    return axios
        .put('/api/lists', list)
        .then(res =>{
                dispatch({
                    type: DELETE_LIST,
                    payload: res.data._id
                });
                dispatch({
                    type: ADD_LIST,
                    payload: res.data
                });
            toast('List checked out successfully',  { type: 'success', autoClose: 2000, hideProgressBar: true});
        }).catch(

    );
};

export const selectList = (id) => {
    return {
        type: SELECT_LIST,
        payload: id
    }
};

export const setListsLoading = () => {
    return {
        type: LISTS_LOADING
    }
};

export const addToList = (listId, itemId) => (dispatch) => {
    return axios
        .put(`/api/lists/${listId}/${itemId}`)
        .then(res => {
            dispatch({
                type: UPDATE_LIST,
                payload: {
                    items: res.data,
                    id: listId
                }
            })
        });
};

export const removeFromList = (listId, itemId) => (dispatch) => {
    return axios
        .delete(`/api/lists/${listId}/${itemId}`)
        .then(res => {
            dispatch({
                type: UPDATE_LIST,
                payload: {
                    items: res.data,
                    id: listId
                }
            })
        });
};

export const updateNewList = list => {
    return {
        type: UPDATE_NEW_LIST,
        payload: list
    };
};