import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import GrasButton from '../../UI/GrasButton/GrasButton';
import LikeButton from '../LikeButton/LikeButton';
import Comments from '../Comments/Comments';
import CommentForm from '../CommentForm/CommentForm';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

import useStyles from './styles';
import * as actions from '../../../store/actions/index';

const ScreamDialog = ({
    open,
    close,
    click,
    openDlg,
    screamId,
    userHandle,
    screamDetails,
    loadingFetchDetail,
    isAuthenticated,
    errorDataComment,
    onAddNewComment
    // onGetScream
}) => {
    const classes = useStyles();
    // const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        if (openDlg) {
            click();
        }
    }, [openDlg, click]);

    // useEffect(() => {
    //     if (openDlg) {
    //         setOpenDialog(true);
    //         onGetScream(screamId);
    //     }
    // }, [openDlg, onGetScream, screamId]);

    // const handleClose = useCallback(() => {
    //     setOpenDialog(false);
    // }, []);

    // const handleOpen = useCallback(() => {
    //     setOpenDialog(true);
    //     onGetScream(screamId);
    // }, [onGetScream, screamId]);

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

                <LikeButton screamId={screamId} />

                <span>{screamDetails?.likeCount} likes</span>
                <GrasButton tip="comments" placement="top">
                    <ChatIcon color="primary" />
                </GrasButton>
                <span>{screamDetails?.commentCount} comments</span>
            </Grid>

            {screamDetails.comments?.length > 0 && (
                <hr className={classes.visibleRuler} />
            )}
            <CommentForm
                screamId={screamId}
                isAuthenticated={isAuthenticated}
                errors={errorDataComment}
                onAddNewComment={onAddNewComment}
            />
            <Comments comments={screamDetails.comments} />
        </Grid>
    );

    return (
        <React.Fragment>
            <GrasButton
                tip="Scream Detalis"
                tipClassName={classes.detailsButton}
                onClick={click}
            >
                <UnfoldMore color="primary" />
            </GrasButton>
            <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
                <GrasButton
                    placement="top"
                    tip="Close"
                    onClick={close}
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

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
        screamDetails: state.scream.scream,
        loadingFetchDetail: state.scream.loadingFetchDetail,
        errorDataComment: state.scream.errorDataComment
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // onGetScream: (id) => dispatch(actions.getScream(id)),
        onAddNewComment: (id, data) => dispatch(actions.addNewComment(id, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreamDialog);
