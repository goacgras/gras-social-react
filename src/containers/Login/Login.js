import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppIcon from '../../assets/image/icon.png';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as actions from '../../store/actions/index';

import useStyles from './styles';

const Login = ({ onLogin, errors, loading, isAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();

    const submitHandler = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    let submit = (
        <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
        >
            Login
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
                    Login
                </Typography>
                <form noValidate onSubmit={submitHandler}>
                    <TextField
                        className={classes.textField}
                        fullWidth
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        helperText={errors.email}
                        error={errors.email ? true : false}
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
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.general && (
                        <Typography
                            variant="body2"
                            className={classes.customError}
                        >
                            {errors.general}
                        </Typography>
                    )}
                    {submit}
                    <br />
                    <small>
                        don't have account yet? sign up{' '}
                        <Link to="/signup">here</Link>
                    </small>
                </form>
            </Grid>
            <Grid item sm />
        </Grid>
    );
};

const mapStateToProps = (state) => {
    return {
        errors: state.errorData,
        loading: state.loading,
        isAuthenticated: state.token !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (email, password) =>
            dispatch(actions.userLogin(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
