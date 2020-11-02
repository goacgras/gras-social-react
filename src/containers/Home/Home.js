import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Profile from '../../components/userProfile/Profile/Profile';

import Grid from '@material-ui/core/Grid';
import Scream from '../../components/scream/Scream/Scream';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';

const Home = ({ screams, onGetAllScreams, screamLoading }) => {
    // console.log(props);
    useEffect(() => {
        onGetAllScreams();
    }, [onGetAllScreams]);

    let screamsPage = <Spinner />;
    if (!screamLoading) {
        screamsPage = screams.map((scream, i) => (
            <Scream key={i} scream={scream} />
        ));
    }

    return (
        <Grid container spacing={5}>
            <Grid item sm={8} xs={12}>
                {screamsPage}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile />
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => {
    return {
        screams: state.scream.screams,
        screamLoading: state.scream.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllScreams: () => dispatch(actions.getAllScreams())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
