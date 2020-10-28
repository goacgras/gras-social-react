import React from 'react';
import { Link } from 'react-router-dom';

import GrasButton from '../UI/GrasButton/GrasButton';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

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

export default LikeButton;
