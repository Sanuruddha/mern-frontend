import React, { Component } from 'react';
import {
    Container, Row, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { authenticate, authenticateWithToken } from "../actions/authActions";
import AppNavBar from './AppNavBar';
import { Redirect } from 'react-router';
import history from '../history';
import '../styles/index.css';

class Login extends Component {
    state = {
        username: '',
        password: '',
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.props.authenticateWithToken(token);
        } else {
            this.props.history.push('/login');
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.authenticate(this.state);
        history.push('/dashboard');
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render() {
        if (this.props.auth.loggedIn) {
            return (
                <Redirect to={'/dashboard'}/>
            )
        }
        else {
            return (
                <div>
                    <AppNavBar/>
                    <Container style={{maxWidth: '30rem', minWidth: '20rem'}} className="App col-6">
                        <h2 style={{textAlign: 'center', paddingTop: '6rem'}}>Sign In</h2>
                        <Form className="form">
                            <Row className={'added-padding'}>
                                <FormGroup style={{width: '100%'}}>
                                    <Label>Username</Label>
                                    <Input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </FormGroup>
                            </Row>
                            <Row className={'added-padding'}>
                                <FormGroup style={{width: '100%'}}>
                                    <Label for="examplePassword">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="examplePassword"
                                        placeholder="********"
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </FormGroup>
                            </Row>
                            <Row className={'added-padding'}>
                            <Button
                                style={{width: '100%'}}
                                onClick={this.handleSubmit.bind(this)}
                            >Login</Button>
                            </Row>
                        </Form>
                    </Container>
                </div>
            );
        }
    }
}

Login.propTypes = {
    authenticate: PropTypes.func.isRequired,
    authenticateWithToken: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { authenticate, authenticateWithToken})(Login);