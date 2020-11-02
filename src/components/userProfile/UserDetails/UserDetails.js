import React, { useEffect, useState } from 'react';

import GrasButton from '../../UI/GrasButton/GrasButton';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import EditIcon from '@material-ui/icons/Edit';

import useStyles from './styles';

const UserDetails = ({ onUpdateUserDetails, credentials }) => {
    const classes = useStyles();

    const [bio, setBio] = useState('');
    const [website, setWebsite] = useState('');
    const [location, setLocation] = useState('');
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        credentials?.bio ? setBio(credentials.bio) : setBio('');
        credentials?.website ? setWebsite(credentials.website) : setWebsite('');
        credentials?.location
            ? setLocation(credentials.location)
            : setLocation('');
    }, [credentials]);

    const showDialogHandler = () => {
        setShowDialog(!showDialog);
    };

    const submitHandler = () => {
        const userData = {
            bio: bio,
            website: website,
            location: location
        };
        onUpdateUserDetails(userData);
        showDialogHandler();
    };

    return (
        <React.Fragment>
            <GrasButton
                btnClassName={classes.button}
                tip="Edit details"
                placement="top"
                onClick={showDialogHandler}
            >
                <EditIcon color="primary" />
            </GrasButton>
            <Dialog
                open={showDialog}
                onClose={showDialogHandler}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Edit your details</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            className={classes.textField}
                            name="bio"
                            type="text"
                            label="Bio"
                            multiline
                            fullWidth
                            rows="3"
                            placeholder="A short bio about your style"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <TextField
                            className={classes.textField}
                            name="website"
                            type="text"
                            label="Website"
                            fullWidth
                            placeholder="Your personal/professional website"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                        <TextField
                            className={classes.textField}
                            name="location"
                            type="text"
                            label="Location"
                            fullWidth
                            placeholder="Where your location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={showDialogHandler} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={submitHandler} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default UserDetails;
