import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

import UserDetails from '../UserDetails/UserDetails';
import GrasButton from '../../UI/GrasButton/GrasButton';
import Spinner from '../../UI/Spinner/Spinner';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import EditIcon from '@material-ui/icons/Edit';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalenderToday from '@material-ui/icons/CalendarToday';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

import useStyles from './styles';
import * as actions from '../../../store/actions/index';

const Profile = ({
    isAuthenticated,
    userLoading,
    credentials,
    onUploadUserImage,
    onUpdateUserDetails
}) => {
    const classes = useStyles();

    const uploadImageHandler = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        onUploadUserImage(formData);
    };

    const editPictureHandler = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    //if loading and if isAuthenticated
    let profileMarkup = !userLoading ? (
        isAuthenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img
                            className="profile-image"
                            src={credentials?.imageUrl}
                            alt="profile"
                        />
                        <input
                            type="file"
                            id="imageInput"
                            hidden="hidden"
                            onChange={uploadImageHandler}
                        />
                        <GrasButton
                            btnClassName="button"
                            tip="Edit profile picture"
                            placement="top"
                            onClick={editPictureHandler}
                        >
                            <EditIcon color="primary" />
                        </GrasButton>
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MuiLink
                            component={Link}
                            to={`/users/${credentials?.handle}`}
                            color="primary"
                            variant="h5"
                        >
                            @{credentials?.handle}
                        </MuiLink>
                        <hr />
                        {credentials?.bio && (
                            <Typography variant="body2">
                                {credentials.bio}
                            </Typography>
                        )}
                        <hr />
                        {credentials?.location && (
                            <React.Fragment>
                                <LocationOn color="primary" />
                                <span>{credentials.location}</span>
                                <hr />
                            </React.Fragment>
                        )}
                        {credentials?.website && (
                            <React.Fragment>
                                <LinkIcon color="primary" />
                                <a
                                    href={credentials.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {' '}
                                    {credentials.website}
                                </a>
                                <hr />
                            </React.Fragment>
                        )}
                        <CalenderToday color="primary" />{' '}
                        <span>
                            Join{' '}
                            {dayjs(credentials?.createdAt).format('MMM YYYY')}
                        </span>
                    </div>
                    <GrasButton tip="Logout" placement="top">
                        <NavLink to="/logout">
                            <KeyboardReturn color="primary" />
                        </NavLink>
                    </GrasButton>
                    <UserDetails
                        onUpdateUserDetails={onUpdateUserDetails}
                        credentials={credentials}
                    />
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found, please login again
                </Typography>
                <div className={classes.buttons}>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/login"
                    >
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/signup"
                    >
                        Signup
                    </Button>
                </div>
            </Paper>
        )
    ) : (
        <Spinner />
    );

    return profileMarkup;
};

const mapStateToProps = (state) => {
    return {
        credentials: state.user.credentials,
        userLoading: state.user.loading,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUploadUserImage: (formData) =>
            dispatch(actions.uploadUserImage(formData)),
        onUpdateUserDetails: (userDetails) =>
            dispatch(actions.editUserDetails(userDetails))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
