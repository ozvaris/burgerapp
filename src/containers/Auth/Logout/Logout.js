import React, { useEffect } from 'react';
import {  Redirect } from "react-router-dom";

import * as actions from '../../../store/actions/index'

import { connect } from 'react-redux';

const Logout = props => {

    useEffect(() => {
        props.onLogout();
    }, []);

    return <Redirect to="/"/>;

}

const mapStateToProps = state => {
    return {
        

    }
}

const mapDispatchToProps = dispatch => {
    return {
       onLogout: () => dispatch(actions.logout())

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);

