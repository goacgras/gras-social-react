import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import dayJs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import GrasButton from '../../components/UI/GrasButton/GrasButton';
import DeleteScream from '../../components/DeleteScream/DeleteScream';
import ScreamDialog from '../../components/ScreamDialog/ScreamDialog';
import LikeButton from '../../components/LikeButton/LikeButton';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat';

import useStyles from './styles';
import * as actions from '../../store/actions/index';

const Scream = ({
    userImage,
    userHandle,
    createdAt,
    body,
    likeCount,
    commentCount,
    screamId,
    likesData,
    isAuthenticated,
    credentials,
    screamDetails,
    loadingFetchDetail,
    errorDataComment,
    onAddNewComment,
    onLikeScream,
    onUnlikeScream,
    onDeleteScream,
    onGetScream
}) => {
    const classes = useStyles();
    dayJs.extend(relativeTime);

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

                <LikeButton
                    isAuthenticated={isAuthenticated}
                    onLikeScream={onLikeScream}
                    onUnlikeScream={onUnlikeScream}
                    screamId={screamId}
                    likesData={likesData}
                />
                <span>{likeCount} Likes</span>

                <GrasButton tip="comments" placement="top">
                    <ChatIcon color="primary" />
                </GrasButton>

                <span>{commentCount} comments</span>

                <ScreamDialog
                    screamId={screamId}
                    userHandle={userHandle}
                    screamDetails={screamDetails}
                    onGetScream={onGetScream}
                    loadingFetchDetail={loadingFetchDetail}
                    onLikeScream={onLikeScream}
                    onUnlikeScream={onUnlikeScream}
                    likesData={likesData}
                    isAuthenticated={isAuthenticated}
                    errorDataComment={errorDataComment}
                    onAddNewComment={onAddNewComment}
                />
            </CardContent>
        </Card>
    );
};

const mapStateToProps = (state) => {
    return {
        likesData: state.user.likes,
        isAuthenticated: state.auth.token !== null,
        credentials: state.user.credentials,
        screamDetails: state.scream.scream,
        loadingFetchDetail: state.scream.loadingFetchDetail,
        errorDataComment: state.scream.errorDataComment
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLikeScream: (id) => dispatch(actions.likeScream(id)),
        onUnlikeScream: (id) => dispatch(actions.unLikeScream(id)),
        onDeleteScream: (id) => dispatch(actions.deleteScream(id)),
        onGetScream: (id) => dispatch(actions.getScream(id)),
        onAddNewComment: (id, data) => dispatch(actions.addNewComment(id, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Scream);
