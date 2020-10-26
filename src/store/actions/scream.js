import * as actionTypes from './actionTypes';
import axios from 'axios';

const fetchScreamsStart = () => {
    return {
        type: actionTypes.FETCH_SCREAMS_START
    };
};

const fetchScreamsSuccess = (allScreams) => {
    return {
        type: actionTypes.FETCH_SCREAMS_SUCCESS,
        allScreams: allScreams
    };
};

const fetchScreamsFail = () => {
    return {
        type: actionTypes.FETCH_SCREAMS_FAIL
    };
};

export const getAllScreams = () => {
    return (dispatch) => {
        dispatch(fetchScreamsStart());
        axios
            .get('screams')
            .then((res) => {
                dispatch(fetchScreamsSuccess(res.data));
            })
            .catch((err) => {
                console.log(err);
                dispatch(fetchScreamsFail());
            });
    };
};

const setLikeScream = (likeData) => {
    return {
        type: actionTypes.LIKE_SCREAM,
        likeData: likeData
    };
};

const setUnlikeScream = (likeData) => {
    return {
        type: actionTypes.UNLIKE_SCREAM,
        likeData: likeData
    };
};

const setDeleteScream = (screamId) => {
    return {
        type: actionTypes.DELETE_SCREAM,
        screamId: screamId
    };
};

export const likeScream = (screamId) => {
    return (dispatch) => {
        axios
            .get(`/scream/${screamId}/like`)
            .then((res) => {
                dispatch(setLikeScream(res.data));
            })
            .catch((err) => console.log(err));
    };
};

export const unLikeScream = (screamId) => {
    return (dispatch) => {
        axios
            .get(`/scream/${screamId}/unlike`)
            .then((res) => {
                dispatch(setUnlikeScream(res.data));
            })
            .catch((err) => console.log(err));
    };
};

export const deleteScream = (screamId) => {
    return (dispatch) => {
        axios
            .delete(`/scream/${screamId}`)
            .then(() => {
                dispatch(setDeleteScream(screamId));
            })
            .catch((err) => console.log(err));
    };
};
