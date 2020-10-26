import * as actionTypes from '../actions/actionTypes';

const initialState = {
    screams: [],
    scream: {},
    loading: false
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
            //replace the old scream with new scream with new like data
            // state.screams[index] = action.likeData;
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
        default:
            return state;
    }
};

export default reducer;
