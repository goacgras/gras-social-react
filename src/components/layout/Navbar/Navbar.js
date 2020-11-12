import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import GrasButton from '../../UI/GrasButton/GrasButton';
import PostScream from '../../scream/PostScream/PostScream';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';
import Notifications from '../Notifications/Notifications';

import classes from './Navbar.module.css';
import * as actions from '../../../store/actions/index';

const Navbar = ({ isAuthenticated, isLoading, onPostScream, errors }) => {
    return (
        <AppBar>
            <ToolBar className={classes.Container}>
                {isAuthenticated ? (
                    <React.Fragment>
                        <PostScream
                            isLoading={isLoading}
                            onPostScream={onPostScream}
                            errors={errors}
                        />
                        <Link to="/home">
                            <GrasButton tip="Home">
                                <HomeIcon />
                            </GrasButton>
                        </Link>
                        <Notifications />
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
        isAuthenticated: state.auth.token !== null,
        isLoading: state.scream.loadingPost,
        errors: state.scream.errorData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPostScream: (newScream) => dispatch(actions.postScream(newScream))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
