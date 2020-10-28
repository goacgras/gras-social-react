import * as actionTypes from './actionTypes';
import axios from 'axios';

//FETCH SCREAMS
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

//FETCH SCREAM DETAILS
const fetchScreamDetailStart = () => {
    return {
        type: actionTypes.FETCH_SCREAM_DETAIL_START
    };
};

const fetchScreamDetailFail = () => {
    return {
        type: actionTypes.FETCH_SCREAM_DETAIL_FAIL
    };
};

const fetchScreamDetailSuccess = (screamDetails) => {
    return {
        type: actionTypes.FETCH_SCREAM_DETAIL_SUCCESS,
        screamDetails: screamDetails
    };
};

export const getScream = (screamId) => {
    return (dispatch) => {
        dispatch(fetchScreamDetailStart());
        axios
            .get(`/scream/${screamId}`)
            .then((res) => {
                dispatch(fetchScreamDetailSuccess(res.data));
            })
            .catch((err) => {
                dispatch(fetchScreamDetailFail());
            });
    };
};

//LIKE & UNLIKE SCREAM
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

//DELETE SCREAM
const setDeleteScream = (screamId) => {
    return {
        type: actionTypes.DELETE_SCREAM,
        screamId: screamId
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

//POST NEW SCREAM
const setNewScreamStart = () => {
    return {
        type: actionTypes.SET_NEW_SCREAM_START
    };
};

const setNewScreamSuccess = (newScream) => {
    return {
        type: actionTypes.SET_NEW_SCREAM_SUCESS,
        newScream: newScream
    };
};

const setNewScreamFail = (errorData) => {
    return {
        type: actionTypes.SET_NEW_SCREAM_FAIL,
        errorData: errorData
    };
};

export const postScream = (newScream) => {
    return (dispatch) => {
        dispatch(setNewScreamStart());
        axios
            .post('/scream', newScream)
            .then((res) => {
                dispatch(setNewScreamSuccess(res.data));
            })
            .catch((err) => {
                dispatch(setNewScreamFail(err.response.data));
            });
    };
};

//COMMENT
const setCommentSuccess = (newComment) => {
    return {
        type: actionTypes.SET_COMMENT_SUCCESS,
        newComment: newComment
    };
};

const setCommentFail = (errorData) => {
    return {
        type: actionTypes.SET_COMMENT_FAIL,
        errorData: errorData
    };
};

const setCommentStart = () => {
    return {
        type: actionTypes.SET_COMMENT_START
    };
};

export const addNewComment = (screamId, commentData) => {
    return (dispatch) => {
        dispatch(setCommentStart());
        axios
            .post(`/scream/${screamId}/comment`, commentData)
            .then((res) => {
                dispatch(setCommentSuccess(res.data));
            })
            .catch((err) => {
                dispatch(setCommentFail(err.response.data));
            });
    };
};
