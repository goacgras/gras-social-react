import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const Comments = ({ comments }) => {
    const classes = useStyles();
    return (
        <Grid container>
            {comments?.map((comment, index) => {
                const { body, createdAt, userHandle, userImage } = comment;
                return (
                    <React.Fragment key={createdAt}>
                        <Grid item sm={12}>
                            <Grid container>
                                <Grid item sm={2}>
                                    <img
                                        className={classes.image}
                                        src={userImage}
                                        alt="comment"
                                    />
                                </Grid>

                                <Grid item sm={9}>
                                    <div className={classes.commentData}>
                                        <Typography
                                            variant="h5"
                                            component={Link}
                                            to={`/users/${userHandle}`}
                                            color="primary"
                                        >
                                            {userHandle}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {dayjs(createdAt).format(
                                                'h:mm a, MMMM DD YYYY'
                                            )}
                                        </Typography>
                                        <hr
                                            className={classes.invisibleRuler}
                                        />
                                        <Typography variant="body1">
                                            {body}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>

                        {index !== comments.length - 1 && (
                            <hr className={classes.visibleRuler} />
                        )}
                    </React.Fragment>
                );
            })}
        </Grid>
    );
};

export default Comments;
