import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import GrasButton from '../../components/UI/GrasButton/GrasButton';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

import classes from './Navbar.module.css';

const Navbar = ({ isAuthenticated }) => {
    return (
        <AppBar>
            <ToolBar className={classes.Container}>
                {isAuthenticated ? (
                    <React.Fragment>
                        <GrasButton tip="Post a scream!">
                            <AddIcon />
                        </GrasButton>
                        <Link to="/home">
                            <GrasButton tip="Home">
                                <HomeIcon />
                            </GrasButton>
                        </Link>
                        <GrasButton tip="notifications">
                            <Notifications />
                        </GrasButton>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/signup">
                            Signup
                        </Button>
                    </React.Fragment>
                )}
            </ToolBar>
        </AppBar>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Navbar);
