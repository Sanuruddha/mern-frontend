import React, { Component } from 'react';
import { Redirect } from "react-router";
import Proptypes from 'prop-types';
import { connect } from "react-redux";
import { logout } from '../actions/authActions';

class Logout extends Component {

    componentWillMount() {
        this.props.logout();
    }

    render() {
        return (
            <Redirect to={'/'}/>
        );
    }
}

Logout.propTypes = {
    auth: Proptypes.object.isRequired,
    logout: Proptypes.func.isRequired
}

const mapStateToProps = state => (
    {
        auth: state.auth
    });

export default connect(mapStateToProps, { logout })(Logout);