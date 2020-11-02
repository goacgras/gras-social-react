import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as actions from './index';

const setAuthenticatedUserSucess = (userData) => {
    return {
        type: actionTypes.SET_AUTHENTICATED_USER_SUCCESS,
        userData: userData
    };
};

const setAuthenticatedUserStart = () => {
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

export const uploadUserImage = (formData) => {
    return (dispatch) => {
        axios
            .post('/user/image', formData)
            .then(() => {
                dispatch(getAuthenticatedUser());
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const editUserDetails = (userDetails) => {
    return (dispatch) => {
        axios
            .post('/user', userDetails)
            .then(() => {
                dispatch(getAuthenticatedUser());
            })
            .catch((err) => console.log(err));
    };
};

export const authenticatedUserLogout = () => {
    return {
        type: actionTypes.AUTHENTICATED_USER_LOGOUT
    };
};

export const getUserDetails = (userHandle) => {
    return (dispatch) => {
        actions.fetchScreamsStart();
        axios
            .get(`/user/${userHandle}`)
            .then((res) => {
                dispatch(actions.fetchScreamsSuccess(res.data.screams));
            })
            .catch(() => {
                dispatch(actions.fetchScreamsSuccess(null));
            });
    };
};
