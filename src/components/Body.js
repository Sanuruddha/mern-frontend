import React, { Component } from 'react';

import { Row} from 'reactstrap';
import { Redirect } from "react-router";
import ItemGrid from './ItemGrid';
import AppNavBar from './AppNavBar';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { authenticateWithToken } from "../actions/authActions";
import { getItems } from "../actions/itemActions";
import LeftGrid from "./LeftGrid";

class Body extends Component {
    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.props.authenticateWithToken(token);
        } else {
            this.props.history.push('/login');
        }
        this.props.getItems();
    }
    render() {
        if (this.props.auth.loggedIn) {
            return (
                <div>
                    <AppNavBar/>
                    <Row>
                        <LeftGrid/>
                        <ItemGrid/>
                    </Row>
                </div>
            )
        } else {
            return (<Redirect to="/login"/>);
        }
    }
}

Body.propTypes = {
    authenticateWithToken: PropTypes.func.isRequired,
    getItems: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { authenticateWithToken, getItems })(Body);
