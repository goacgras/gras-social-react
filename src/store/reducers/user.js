import * as actionTypes from '../actions/actionTypes';

const initialState = {
    credentials: null,
    likes: null,
    notifications: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTHENTICATED_USER_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.SET_AUTHENTICATED_USER_SUCCESS:
            return {
                ...state,
                ...action.userData,
                loading: false
            };
        case actionTypes.AUTHENTICATED_USER_LOGOUT:
            return {
                ...state,
                credentials: null,
                likes: null,
                notifications: null
            };
        case actionTypes.LIKE_SCREAM:
            return {
                //get copy of all states, get copy of likes and add a new like
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        screamId: action.likeData.screamId
                    }
                ]
            };
        case actionTypes.UNLIKE_SCREAM:
            return {
                ...state,
                likes: state.likes.filter(
                    (like) => like.screamId !== action.likeData.screamId
                )
            };
        default:
            return state;
    }
};

export default reducer;
