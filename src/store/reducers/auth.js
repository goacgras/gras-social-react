import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    errorData: {},
    loading: false,
    authRedirectPath: '/'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                errorData: {},
                loading: true
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                errorData: {},
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
                errorData: {}
            };
        default:
            return state;
    }
};

export default reducer;
