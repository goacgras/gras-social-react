import React from 'react';
import { Link } from 'react-router-dom';
import dayJs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import useStyles from './styles';
import Typography from '@material-ui/core/Typography';

const Scream = ({ userImage, userHandle, createdAt, body }) => {
    const classes = useStyles();
    dayJs.extend(relativeTime);
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
                <Typography variant="body2" color="secondary">
                    {dayJs(createdAt).fromNow()}
                </Typography>
                <Typography variant="body1">{body}</Typography>
            </CardContent>
        </Card>
    );
};

export default Scream;
