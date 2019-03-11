import React, { Component } from 'react';
import {Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Item from "./Item";
import { connect } from "react-redux";
import { deleteItem, getItems } from "../actions/itemActions";
import PropTypes from "prop-types";
import classnames from "classnames";
import ItemForm from "./ItemForm";
import { NEW_ITEM_TAB, ITEMS_TAB } from '../utils/consts';
import { changeActiveTab } from "../actions/tabActions";

class ItemGrid extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: ITEMS_TAB
        };
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
        const { items } = this.props.item;
        if (items) return (
                <Col className={'custom-grid'}>
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
                                    <Container>
                                        <Row className={'item-grid-wrapper'}>
                                            {items.map((item) => (
                                                <Col  className={'limited-padding'} key={item._id} sm="12" md="6" lg="3">
                                                    <TransitionGroup className={"shopping-list"}>
                                                        <CSSTransition  key={item._id}
                                                                        timeout={500}
                                                                        classNames={'fade'}>
                                                            <Item selfItem={item}/>
                                                        </CSSTransition>
                                                    </TransitionGroup>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Container>
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
        else return (
            {"No items to show"}
        );
    }
}

ItemGrid.propTypes = {
    item: PropTypes.object.isRequired,
    changeActiveTab: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    item: state.item,
});

export default connect(mapStateToProps, {getItems, deleteItem, changeActiveTab})(ItemGrid);