import React from 'react';
import { Link } from 'react-router-dom';
import dayJs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import GrasButton from '../UI/GrasButton/GrasButton';
import DeleteScream from '../DeleteScream/DeleteScream';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import useStyles from './styles';

const Scream = ({
    userImage,
    userHandle,
    createdAt,
    body,
    likeCount,
    commentCount,
    likesData,
    screamId,
    isAuthenticated,
    credentials,
    onLikeScream,
    onUnlikeScream,
    onDeleteScream
}) => {
    const classes = useStyles();
    dayJs.extend(relativeTime);

    const likedScream = () => {
        //check if user like the scream
        if (likesData && likesData.find((like) => like.screamId === screamId)) {
            return true;
        } else {
            return false;
        }
    };

    const likeButton = !isAuthenticated ? (
        <GrasButton tip="Like">
            <Link to="/login">
                <FavoriteBorder color="primary" />
            </Link>
        </GrasButton>
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

    const deleteButton =
        isAuthenticated && userHandle === credentials?.handle ? (
            <DeleteScream screamId={screamId} onDeleteScream={onDeleteScream} />
        ) : null;

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.image}
                image={userImage}
                title="Profile Image"
            />
            <CardContent className={classes.content}>
                <Link to={`/user/${userHandle}`}>
                    <Typography variant="h5" color="primary">
                        {userHandle}
                    </Typography>
                </Link>
                {deleteButton}
                <Typography variant="body2" color="secondary">
                    {dayJs(createdAt).fromNow()}
                </Typography>
                <Typography variant="body1">{body}</Typography>
                {likeButton}
                <span>{likeCount} Likes</span>
                <GrasButton tip="comments" placement="top">
                    <ChatIcon color="primary" />
                </GrasButton>
                <span>{commentCount} comments</span>
            </CardContent>
        </Card>
    );
};

export default Scream;
