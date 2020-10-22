import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import classes from './Navbar.module.css';

const Navbar = () => {
    return (
        <AppBar>
            <ToolBar className={classes.Container}>
                <Button color="inherit" component={Link} to="/login">
                    Login
                </Button>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                    Signup
                </Button>
                <NavLink to="/logout">Logout</NavLink>
            </ToolBar>
        </AppBar>
    );
};

export default Navbar;
