import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import GrasButton from '../../UI/GrasButton/GrasButton';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import * as actions from '../../../store/actions/index';

const LikeButton = ({
    isAuthenticated,
    onLikeScream,
    onUnlikeScream,
    screamId,
    likesData
}) => {
    const likedScream = () => {
        //check if user like the scream
        if (likesData && likesData.find((like) => like.screamId === screamId)) {
            return true;
        } else {
            return false;
        }
    };

    const likeButton = !isAuthenticated ? (
        <Link to="/login">
            <GrasButton tip="Like">
                <FavoriteBorder color="primary" />
            </GrasButton>
        </Link>
    ) : likedScream() ? (
        <GrasButton
            placement="top"
            tip="undo like"
            onClick={() => onUnlikeScream(screamId)}
        >
            <FavoriteIcon color="primary" />
        </GrasButton>
    ) : (
        <GrasButton
            placement="top"
            tip="Like"
            onClick={() => onLikeScream(screamId)}
        >
            <FavoriteBorder color="primary" />
        </GrasButton>
    );

    return likeButton;
};

const mapStateToProps = (state) => {
    return {
        likesData: state.user.likes,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLikeScream: (id) => dispatch(actions.likeScream(id)),
        onUnlikeScream: (id) => dispatch(actions.unLikeScream(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
