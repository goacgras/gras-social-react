import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

const Logout = ({ onLogout }) => {
    useEffect(() => {
        onLogout();
    }, [onLogout]);

    return <Redirect to="/login" />;
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.authLogout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);