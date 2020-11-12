import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Scream from '../../components/scream/Scream/Scream';
import Spinner from '../../components/UI/Spinner/Spinner';
import StaticProfile from '../../components/userProfile/StaticProfile/StaticProfile';

import Grid from '@material-ui/core/Grid';

import * as actions from '../../store/actions/index';

const User = ({ screams, isLoading, onGetUserDetails }) => {
    const { userHandle } = useParams();
    const { screamId } = useParams();
    const [profile, setProfile] = useState(null);
    const [screamIdParam, setScreamIdParam] = useState(null);

    useEffect(() => {
        if (screamId) {
            setScreamIdParam(screamId);
        }
    }, [screamId]);

    useEffect(() => {
        onGetUserDetails(userHandle);
        axios
            .get(`/user/${userHandle}`)
            .then((res) => {
                setProfile(res.data.user);
            })
            .catch((err) => console.log(err));
    }, [onGetUserDetails, userHandle]);

    let screamsMarkup = isLoading ? (
        <Spinner />
    ) : screams === null ? (
        <p>User hasn't scream yet...</p>
    ) : !screamIdParam ? (
        screams.map((scream) => (
            <Scream key={scream.screamId} scream={scream} />
        ))
    ) : (
        screams.map((scream) => {
            if (scream.screamId !== screamIdParam)
                return <Scream key={scream.screamId} scream={scream} />;
            else
                return <Scream key={scream.screamId} scream={scream} openDlg />;
        })
    );

    return (
        <Grid container spacing={5}>
            <Grid item sm={8} xs={12}>
                {screamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                {profile === null ? (
                    <p>loading profile...</p>
                ) : (
                    <StaticProfile profile={profile} />
                )}
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => {
    return {
        screams: state.scream.screams,
        isLoading: state.scream.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetUserDetails: (handle) => dispatch(actions.getUserDetails(handle))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
