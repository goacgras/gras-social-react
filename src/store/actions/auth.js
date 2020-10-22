import axios from 'axios';
import jwtDecoded from 'jwt-decode';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token
    };
};

export const authFail = (errorData) => {
    return {
        type: actionTypes.AUTH_FAIL,
        errorData: errorData
    };
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expiresIn) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expiresIn * 1000);
    };
};

export const userLogin = (email, password) => {
    return (dispatch) => {
        dispatch(authStart());
        const userData = {
            email: email,
            password: password
        };
        axios
            .post('/login', userData)
            .then((res) => {
                const decodedToken = jwtDecoded(res.data.token);
                const expirationDate = decodedToken.exp;
                console.log(expirationDate);

                dispatch(authSuccess(res.data.token));
                dispatch(checkAuthTimeout(expirationDate));

                localStorage.setItem('token', `Bearer ${res.data.token}`);
                localStorage.setItem('expirationDate', expirationDate);
            })
            .catch((err) => {
                dispatch(authFail(err.response.data));
            });
    };
};
