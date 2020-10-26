import React, { useState } from 'react';

import GrasButton from '../UI/GrasButton/GrasButton';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import useStyles from './styles';

const DeleteScream = ({ screamId, onDeleteScream }) => {
    const [showDialog, setShowDialog] = useState(false);
    const classes = useStyles();

    const showDialogHandler = () => {
        setShowDialog(!showDialog);
    };

    const deleteScream = () => {
        onDeleteScream(screamId);
        showDialogHandler();
    };

    return (
        <React.Fragment>
            <GrasButton
                btnClassName={classes.deleteButton}
                placement="top"
                tip="Delete scream"
                onClick={showDialogHandler}
            >
                <DeleteOutline color="secondary" />
            </GrasButton>
            <Dialog
                open={showDialog}
                onClose={showDialogHandler}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogActions>
                    <Button onClick={showDialogHandler} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteScream} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default DeleteScream;
