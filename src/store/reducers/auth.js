import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    errorData: null,
    loading: false,
    authRedirectPath: '/'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                errorData: null,
                loading: true
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                errorData: null,
                loading: false
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                errorData: action.errorData
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                errorData: null
            };
        default:
            return state;
    }
};

export default reducer;
