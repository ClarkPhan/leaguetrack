import { ADD_SEARCH, DELETE_SEARCH } from '../constants/actionTypes';

export const addSearch = (payload) => ({ type: ADD_SEARCH, payload });
export const deleteSearch = (payload) => ({ type: DELETE_SEARCH, payload });
