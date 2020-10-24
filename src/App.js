import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { MuiThemeProvider } from '@material-ui/core/styles/';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeData from './util/theme';

import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';
import Navbar from './components/Navbar/Navbar';
import Logout from './components/Logout/Logout';

import * as actions from './store/actions/index';

import './App.css';

const theme = createMuiTheme(themeData);

function App({ isAuthenticated, onTryAutoSignup }) {
    useEffect(() => {
        onTryAutoSignup();
    }, [onTryAutoSignup]);

    let routes = (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
        </Switch>
    );

    if (isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/logout" component={Logout} />
                <Route exact path="/" component={Home} />
                <Redirect to="/" />
            </Switch>
        );
    }

    return (
        <MuiThemeProvider theme={theme}>
            <Navbar />
            <div className="container">{routes}</div>
        </MuiThemeProvider>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
