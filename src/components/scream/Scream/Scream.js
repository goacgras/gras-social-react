import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import dayJs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import GrasButton from '../../UI/GrasButton/GrasButton';
import DeleteScream from '../DeleteScream/DeleteScream';
import ScreamDialog from '../ScreamDialog/ScreamDialog';
import LikeButton from '../LikeButton/LikeButton';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat';

import useStyles from './styles';
import * as actions from '../../../store/actions/index';

const Scream = ({
    scream: {
        userImage,
        userHandle,
        createdAt,
        body,
        likeCount,
        commentCount,
        screamId
    },
    openDlg,
    isAuthenticated,
    credentials,
    onDeleteScream,
    onGetScream
}) => {
    const classes = useStyles();
    const [showDialog, setShowDialog] = useState(false);
    const [oldPath, setOldPath] = useState('');
    dayJs.extend(relativeTime);

    const dialogCloseHandler = () => {
        window.history.pushState(null, null, oldPath);
        setShowDialog(false);
        console.log('from close');
    };

    const dialogOpenHandler = useCallback(() => {
        let oldPath = window.location.pathname;
        const newPath = `/user/${userHandle}/scream/${screamId}`;

        if (oldPath === newPath) oldPath = `/user/${userHandle}`;
        window.history.pushState(null, null, newPath);

        setShowDialog(true);
        setOldPath(oldPath);

        onGetScream(screamId);

        console.log('from open');
    }, [screamId, onGetScream, userHandle]);

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

                <LikeButton screamId={screamId} />
                <span>{likeCount} Likes</span>

                <GrasButton tip="comments" placement="top">
                    <ChatIcon color="primary" />
                </GrasButton>

                <span>{commentCount} comments</span>

                <ScreamDialog
                    screamId={screamId}
                    userHandle={userHandle}
                    openDlg={openDlg}
                    open={showDialog}
                    close={dialogCloseHandler}
                    click={dialogOpenHandler}
                />
            </CardContent>
        </Card>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
        credentials: state.user.credentials
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetScream: (id) => dispatch(actions.getScream(id)),
        onDeleteScream: (id) => dispatch(actions.deleteScream(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Scream);
