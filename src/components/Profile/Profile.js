import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalenderToday from '@material-ui/icons/CalendarToday';

import useStyles from './styles';

const Profile = ({ isAuthenticated, loading, credentials }) => {
    const classes = useStyles();

    //if loading and if isAuthenticated
    let profileMarkup = !loading ? (
        isAuthenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img
                            className="profile-image"
                            src={credentials?.imageUrl}
                            alt="profile"
                        />
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
        <p>loading...</p>
    );

    return profileMarkup;
};

const mapStateToProps = (state) => {
    return {
        credentials: state.user.credentials,
        loading: state.user.loading,
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Profile);
