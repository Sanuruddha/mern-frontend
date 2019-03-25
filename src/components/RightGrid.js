import React, { Component } from 'react';
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { connect } from "react-redux";
import { deleteItem, getItems } from "../actions/itemActions";
import PropTypes from "prop-types";
import classnames from "classnames";
import ItemForm from "./ItemForm";
import { NEW_ITEM_TAB, ITEMS_TAB } from '../utils/consts';
import { changeActiveTab } from "../actions/tabActions";
import ItemGridTab from './ItemGridTab';

class RightGrid extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: ITEMS_TAB
        };
    }
    componentDidMount() {
        this.props.getItems();
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.props.changeActiveTab(this.state.activeTab, tab);
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
                <Col style={{paddingLeft: '0', paddingRight: '0'}} className={'custom-grid'}>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === ITEMS_TAB }, 'nav-link')}
                                onClick={() => { this.toggle(ITEMS_TAB); }}
                            >
                                <h3><strong>Items</strong></h3>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === NEW_ITEM_TAB }, 'nav-link')}
                                onClick={() => { this.toggle(NEW_ITEM_TAB); }}
                            >
                                <h3><strong>Item Management</strong></h3>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId={ITEMS_TAB}>
                            <Row>
                                <Col sm="12">
                                    <ItemGridTab/>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId={NEW_ITEM_TAB}>
                            <Row>
                                <Col sm="12">
                                    <ItemForm/>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </Col>
            );
    }
}

RightGrid.propTypes = {
    changeActiveTab: PropTypes.func.isRequired,
    getItems: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {getItems, deleteItem, changeActiveTab})(RightGrid);