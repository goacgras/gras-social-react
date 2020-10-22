import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
// import { Redirect } from 'react-router-dom'

import AppIcon from '../../assets/image/icon.png';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './styles';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [authenticated, setAuthenticated] = useState(false);
    const classes = useStyles();

    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);

        const userData = {
            email: email,
            password: password
        };

        axios
            .post('/login', userData)
            .then((res) => {
                console.log(res.data);
                setLoading(false);
                setAuthenticated(true);
            })
            .catch((err) => {
                setErrors(err.response.data);
                setLoading(false);
            });
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
    if (authenticated) {
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

export default Login;

// {
//     "tabWidth": 4,
//     "singleQuote": true
// }
