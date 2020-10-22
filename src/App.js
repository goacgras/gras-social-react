import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { MuiThemeProvider } from '@material-ui/core/styles/';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';
import Navbar from './components/Navbar/Navbar';

import './App.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#00bcd4',
            dark: '#008394',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff6333',
            main: '#ff3d00',
            dark: '#b22a00',
            contrastText: '#fff',
        },
    },
    typography: {
        useNextVariants: true,
    },
});

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/" component={Home} />
                    </Switch>
                </div>
            </div>
        </MuiThemeProvider>
    );
}

export default App;
