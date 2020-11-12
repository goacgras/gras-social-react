import axios from 'axios';
import jwtDecoded from 'jwt-decode';
import * as actionTypes from './actionTypes';
import * as actions from './index';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token) => {
    return (dispatch) => {
        const firebaseIdToken = `Bearer ${token}`;
        axios.defaults.headers.common['Authorization'] = firebaseIdToken;
        dispatch({
            type: actionTypes.AUTH_SUCCESS,
            idToken: token
        });
        dispatch(actions.getAuthenticatedUser());
    };
};

export const authFail = (errorData) => {
    return {
        type: actionTypes.AUTH_FAIL,
        errorData: errorData
    };
};

export const authLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        delete axios.defaults.headers.common['Authorization'];
        dispatch(actions.authenticatedUserLogout());
        dispatch({
            type: actionTypes.AUTH_LOGOUT
        });
    };
};

export const checkAuthTimeout = (expiresIn) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expiresIn * 1000);
    };
};

export const userLogin = (userData, isSignup) => {
    return (dispatch) => {
        dispatch(authStart());
        let url = '/login';
        if (isSignup) {
            url = '/signup';
        }
        axios
            .post(url, userData)
            .then((res) => {
                const decodedToken = jwtDecoded(res.data.token);
                const timeInToken = decodedToken.exp;
                const expirationDate = new Date(timeInToken * 1000);
                const expiresIn =
                    (expirationDate.getTime() - Date.now()) / 1000;

                dispatch(authSuccess(res.data.token));
                dispatch(checkAuthTimeout(expiresIn));

                localStorage.setItem('token', `Bearer ${res.data.token}`);
                localStorage.setItem('expirationDate', expirationDate);
            })
            .catch((err) => {
                dispatch(authFail(err.response.data));
            });
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token')?.slice(7);
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem('expirationDate')
            );
            if (expirationDate < new Date()) {
                dispatch(authLogout());
            } else {
                dispatch(authSuccess(token));
                dispatch(
                    checkAuthTimeout(
                        (expirationDate.getTime() - Date.now()) / 1000
                    )
                );
            }
        }
    };
};
