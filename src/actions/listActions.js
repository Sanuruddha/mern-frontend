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

export const createList = (list) => (dispatch) => {
    dispatch({
        type: CLEAR_NEW_LIST
    });
    return axios
        .post(`/api/lists`, list)
        .then(res => dispatch({
            type: ADD_LIST,
            payload: res.data
        }))
};

export const getLists = () => (dispatch) => {
    dispatch(setListsLoading());
    return axios
        .get(`/api/lists`)
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
            })
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