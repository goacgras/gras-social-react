import React, { useState, useEffect } from 'react';
import GrasButton from '../../UI/GrasButton/GrasButton';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './styles';

const PostScream = ({ onPostScream, isLoading, errors }) => {
    const classes = useStyles();
    const [showDialog, setShowDialog] = useState(false);
    const [scream, setScream] = useState('');
    const [stateError, setStateError] = useState('');

    // const showDialogHandler = () => {
    //     setShowDialog(!showDialog);
    //     setScream('');
    // };

    useEffect(() => {
        if (errors) {
            setStateError(errors);
            setShowDialog(true);
        } else setStateError('');
    }, [errors]);

    const handleOpen = () => {
        setShowDialog(true);
    };

    const handleClose = () => {
        setShowDialog(false);
    };
    const formSubmit = (e) => {
        e.preventDefault();
        onPostScream({ body: scream });
        setScream('');
        handleClose();
    };
    return (
        <React.Fragment>
            <GrasButton
                tip="Post a scream"
                placement="top"
                onClick={handleOpen}
            >
                <AddIcon />
            </GrasButton>
            <Dialog
                open={showDialog}
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
                <DialogTitle>Write a scream</DialogTitle>
                <DialogContent>
                    <form onSubmit={formSubmit}>
                        <TextField
                            className={classes.textField}
                            type="text"
                            name="body"
                            label="Scream"
                            placeholder="Post a scream"
                            fullWidth
                            rows="3"
                            value={scream}
                            onChange={(e) => setScream(e.target.value)}
                            error={stateError?.body ? true : false}
                            helperText={stateError?.body}
                        />
                        <Button
                            className={classes.submitButton}
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isLoading}
                        >
                            Submit
                            {isLoading && (
                                <CircularProgress
                                    className={classes.spinner}
                                    size={30}
                                />
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default PostScream;
