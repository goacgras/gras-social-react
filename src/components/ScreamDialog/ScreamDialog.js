import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import GrasButton from '../UI/GrasButton/GrasButton';
import LikeButton from '../LikeButton/LikeButton';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

import useStyles from './styles';
import Comments from '../Comments/Comments';

const ScreamDialog = ({
    screamId,
    userHandle,
    screamDetails,
    loadingFetchDetail,
    likesData,
    isAuthenticated,
    onGetScream,
    onLikeScream,
    onUnlikeScream
}) => {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleOpen = () => {
        setOpenDialog(true);
        onGetScream(screamId);
    };

    let dialogMarkup = loadingFetchDetail ? (
        <div className={classes.spinnerDiv}>
            <CircularProgress size={150} thickness={2} />
        </div>
    ) : (
        <Grid container spacing={8}>
            <Grid item sm={5}>
                <img
                    className={classes.profileImage}
                    src={screamDetails?.userImage}
                    alt="Profile"
                />
            </Grid>
            <Grid item sm={7}>
                <Typography
                    component={Link}
                    color="primary"
                    variant="h5"
                    to={`/users/${userHandle}`}
                >
                    @{userHandle}
                </Typography>
                <hr className={classes.ruler} />
                <Typography variant="body2" color="textSecondary">
                    {dayjs(screamDetails?.createdAt).format(
                        'h:mm a, MMMM DD YYYY'
                    )}
                </Typography>
                <hr className={classes.ruler} />
                <Typography variant="body1">{screamDetails?.body}</Typography>
                <LikeButton
                    screamId={screamId}
                    onLikeScream={onLikeScream}
                    onUnlikeScream={onUnlikeScream}
                    likesData={likesData}
                    isAuthenticated={isAuthenticated}
                />
                <span>{screamDetails?.likeCount} likes</span>
                <GrasButton tip="comments" placement="top">
                    <ChatIcon color="primary" />
                </GrasButton>
                <span>{screamDetails?.commentCount} comments</span>
            </Grid>
            {screamDetails.comments?.length > 0 && (
                <hr className={classes.visibleRuler} />
            )}

            <Comments comments={screamDetails.comments} />
        </Grid>
    );

    return (
        <React.Fragment>
            <GrasButton
                tip="Scream Detalis"
                tipClassName={classes.detailsButton}
                onClick={handleOpen}
            >
                <UnfoldMore color="primary" />
            </GrasButton>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <GrasButton
                    placement="top"
                    tip="Close"
                    onClick={handleClose}
                    tipClassName={classes.closeButton}
                >
                    <CloseIcon />
                </GrasButton>
                <DialogContent className={classes.dialogContent}>
                    {dialogMarkup}
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default ScreamDialog;
