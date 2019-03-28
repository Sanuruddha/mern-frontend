import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import {connect} from "react-redux";
import PropTypes from "prop-types";

export class AppNavBar extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <Navbar
                dark expand={'sm'}
                className={'mb-5 nav-bar custom-nav'}>
                    <NavbarBrand href={'/'}>
                        <img alt={'Logo'} src="/img/logo2.png" width="100"/><h1>Simple POS</h1></NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className={'ml-auto'} navbar>
                            {/*renders logout button if already logged in*/}
                            <NavItem>
                                {
                                this.props.auth.loggedIn? (<NavLink href={'/logout'}>
                                    Logout
                                </NavLink>) : ('')
                                }
                            </NavItem>
                        </Nav>
                    </Collapse>
            </Navbar>
        )
    }
}

AppNavBar.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { })(AppNavBar);