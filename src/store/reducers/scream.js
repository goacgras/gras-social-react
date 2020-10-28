import * as actionTypes from '../actions/actionTypes';

const initialState = {
    screams: [],
    scream: {},
    loading: false,
    loadingPost: false,
    loadingFetchDetail: false,
    errorData: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SCREAMS_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_SCREAMS_SUCCESS:
            return {
                ...state,
                screams: action.allScreams,
                loading: false
            };
        case actionTypes.FETCH_SCREAMS_FAIL:
            return {
                ...state,
                loading: false,
                screams: []
            };
        case actionTypes.LIKE_SCREAM:
        case actionTypes.UNLIKE_SCREAM:
            const newArray = [...state.screams];
            let index = state.screams.findIndex(
                (scream) => scream.screamId === action.likeData.screamId
            );
            newArray[index] = action.likeData;
            if (state.scream.screamId === action.likeData.screamId) {
                state.scream = action.likeData;
            }
            return {
                ...state,
                screams: newArray
            };
        case actionTypes.DELETE_SCREAM:
            return {
                ...state,
                screams: state.screams.filter(
                    (scream) => scream.screamId !== action.screamId
                )
            };
        case actionTypes.SET_NEW_SCREAM_START:
            return {
                ...state,
                loadingPost: true,
                errorData: null
            };
        case actionTypes.SET_NEW_SCREAM_FAIL:
            return {
                ...state,
                loadingPost: false,
                errorData: action.errorData
            };
        case actionTypes.SET_NEW_SCREAM_SUCESS:
            return {
                ...state,
                loadingPost: false,
                errorData: null,
                screams: [action.newScream, ...state.screams]
            };
        case actionTypes.FETCH_SCREAM_DETAIL_START:
            return {
                ...state,
                loadingFetchDetail: true
            };
        case actionTypes.FETCH_SCREAM_DETAIL_FAIL:
            return {
                ...state,
                loadingFetchDetail: false
            };
        case actionTypes.FETCH_SCREAM_DETAIL_SUCCESS:
            return {
                ...state,
                loadingFetchDetail: false,
                scream: action.screamDetails
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                screams: [],
                scream: {},
                loading: false,
                loadingPost: false,
                errorData: null
            };
        default:
            return state;
    }
};

export default reducer;