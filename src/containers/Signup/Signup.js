import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import AppIcon from '../../assets/image/icon.png';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './styles';

const Signup = ({ onSignup, errors, loading, isAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [handle, setHandle] = useState('');
    const isSignup = true;
    const classes = useStyles();

    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            handle: handle
        };
        onSignup(userData, isSignup);
    };

    let submit = (
        <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
        >
            Signup
        </Button>
    );
    if (loading) {
        submit = <CircularProgress className={classes.spinner} size={30} />;
    }
    let authRedirect = null;
    if (isAuthenticated) {
        authRedirect = <Redirect to="/" />;
    }

    return (
        <Grid className={classes.container} container>
            {authRedirect}
            <Grid item sm />
            <Grid item sm>
                <img className={classes.image} src={AppIcon} alt="monkey" />
                <Typography variant="h2" className={classes.title}>
                    Sign up
                </Typography>
                <form noValidate onSubmit={submitHandler}>
                    <TextField
                        className={classes.textField}
                        fullWidth
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        helperText={errors?.email}
                        error={errors?.email ? true : false}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        className={classes.textField}
                        fullWidth
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        helperText={errors?.password}
                        error={errors?.password ? true : false}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        className={classes.textField}
                        fullWidth
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        helperText={errors?.confirmPassword}
                        error={errors?.confirmPassword ? true : false}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <TextField
                        className={classes.textField}
                        fullWidth
                        id="handle"
                        name="handle"
                        type="text"
                        label="Handle"
                        helperText={errors?.handle}
                        error={errors?.handle ? true : false}
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                    />
                    {errors?.general && (
                        <Typography
                            variant="body2"
                            className={classes.customError}
                        >
                            {errors?.general}
                        </Typography>
                    )}
                    {submit}
                    <br />
                    <small>
                        already have an account? login{' '}
                        <Link to="/login">here</Link>
                    </small>
                </form>
            </Grid>
            <Grid item sm />
        </Grid>
    );
};

const mapStateToProps = (state) => {
    return {
        errors: state.auth.errorData,
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignup: (userData, isSignup) =>
            dispatch(actions.userLogin(userData, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
