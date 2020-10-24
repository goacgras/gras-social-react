import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Profile from '../../components/Profile/Profile';

import Grid from '@material-ui/core/Grid';
import Scream from '../../components/Scream/Scream';
// import Spinner from '../../components/UI/Spinner/Spinner';

const Home = () => {
    const [screams, setScreams] = useState([]);

    useEffect(() => {
        axios
            .get('/screams')
            .then((res) => {
                setScreams(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <Grid container spacing={5}>
            <Grid item sm={8} xs={12}>
                {screams.map((scream, i) => (
                    <Scream
                        key={i}
                        userImage={scream.userImage}
                        userHandle={scream.userHandle}
                        createdAt={scream.createdAt}
                        body={scream.body}
                    />
                ))}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile />
            </Grid>
        </Grid>
    );
};

export default Home;
