import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalenderToday from '@material-ui/icons/CalendarToday';

import useStyles from './styles';

const StaticProfile = ({
    profile: { handle, createdAt, imageUrl, bio, website, location }
}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img
                        className="profile-image"
                        src={imageUrl}
                        alt="profile"
                    />
                </div>
                <hr />
                <div className="profile-details">
                    <MuiLink
                        component={Link}
                        to={`/users/${handle}`}
                        color="primary"
                        variant="h5"
                    >
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr />
                    {location && (
                        <React.Fragment>
                            <LocationOn color="primary" />
                            <span>{location}</span>
                            <hr />
                        </React.Fragment>
                    )}
                    {website && (
                        <React.Fragment>
                            <LinkIcon color="primary" />
                            <a
                                href={website}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {' '}
                                {website}
                            </a>
                            <hr />
                        </React.Fragment>
                    )}
                    <CalenderToday color="primary" />{' '}
                    <span>Join {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
            </div>
        </Paper>
    );
};

export default StaticProfile;
