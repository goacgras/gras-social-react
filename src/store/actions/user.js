import axios from 'axios';
import * as actionTypes from './actionTypes';

export const setAuthenticatedUserSucess = (userData) => {
    return {
        type: actionTypes.SET_AUTHENTICATED_USER_SUCCESS,
        userData: userData
    };
};

export const setAuthenticatedUserStart = () => {
    return {
        type: actionTypes.SET_AUTHENTICATED_USER_START
    };
};

export const getAuthenticatedUser = () => {
    return (dispatch) => {
        dispatch(setAuthenticatedUserStart());
        axios
            .get('/user')
            .then((res) => {
                dispatch(setAuthenticatedUserSucess(res.data));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const authenticatedUserLogout = () => {
    return {
        type: actionTypes.AUTHENTICATED_USER_LOGOUT
    };
};
