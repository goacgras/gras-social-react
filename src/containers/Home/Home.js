import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Profile from '../../components/Profile/Profile';

import Grid from '@material-ui/core/Grid';
import Scream from '../Scream/Scream';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';

const Home = ({
    isAuthenticated,
    userLoading,
    credentials,
    screams,
    onUploadUserImage,
    onUpdateUserDetails,
    onGetAllScreams,
    screamLoading
}) => {
    // console.log(props);
    useEffect(() => {
        onGetAllScreams();
    }, [onGetAllScreams]);

    let screamsPage = <Spinner />;
    if (!screamLoading) {
        screamsPage = screams.map((scream, i) => (
            <Scream
                key={i}
                userImage={scream.userImage}
                userHandle={scream.userHandle}
                createdAt={scream.createdAt}
                body={scream.body}
                likeCount={scream.likeCount}
                commentCount={scream.commentCount}
                screamId={scream.screamId}
            />
        ));
    }

    return (
        <Grid container spacing={5}>
            <Grid item sm={8} xs={12}>
                {screamsPage}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile
                    isAuthenticated={isAuthenticated}
                    userLoading={userLoading}
                    credentials={credentials}
                    onUploadUserImage={onUploadUserImage}
                    onUpdateUserDetails={onUpdateUserDetails}
                />
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => {
    return {
        credentials: state.user.credentials,
        userLoading: state.user.loading,
        isAuthenticated: state.auth.token !== null,
        screams: state.scream.screams,
        screamLoading: state.scream.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUploadUserImage: (formData) =>
            dispatch(actions.uploadUserImage(formData)),
        onUpdateUserDetails: (userDetails) =>
            dispatch(actions.editUserDetails(userDetails)),
        onGetAllScreams: () => dispatch(actions.getAllScreams())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
