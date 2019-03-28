import React, { Component } from 'react';
import { Row} from 'reactstrap';
import { Redirect } from "react-router";
import RightGrid from './RightGrid';
import AppNavBar from './AppNavBar';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { authenticateWithToken } from "../actions/authActions";
import { getItems } from "../actions/itemActions";
import LeftGrid from "./LeftGrid";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class Body extends Component {
    componentDidMount() {
        // checks for an auth token in the local storage
        const token = localStorage.getItem('token');
        if (token) {
            this.props.authenticateWithToken(token);
        } else {
            this.props.history.push('/login');
        }
    }
    render() {
        //renders body if logged in, else redirects to login page
        if (this.props.auth.loggedIn) {
            return (
                <div>
                    <AppNavBar/>
                    <ToastContainer newestOnTop pauseOnFocusLoss={false}/>
                    <Row style={{marginRight: '0', marginLeft: '0'}}>
                        <LeftGrid/>
                        <RightGrid/>
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
