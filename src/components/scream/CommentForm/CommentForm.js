import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import useStyles from './styles';

const CommentForm = ({
    screamId,
    onAddNewComment,
    isAuthenticated,
    errors
}) => {
    const classes = useStyles();
    const [newComment, setNewComment] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        onAddNewComment(screamId, { body: newComment });
        setNewComment('');
    };

    const newCommentForm = isAuthenticated ? (
        <Grid item sm={12} style={{ textAlign: 'center' }}>
            <form onSubmit={submitForm}>
                <TextField
                    className={classes.textField}
                    name="body"
                    type="text"
                    placeholder="Write a comment..."
                    error={errors?.comment ? true : false}
                    helperText={errors?.comment}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    fullWidth
                />
                <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>
            </form>
        </Grid>
    ) : null;

    return newCommentForm;
};

export default CommentForm;
