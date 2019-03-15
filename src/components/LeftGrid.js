import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ListContainer from './ListContainer';
import NewOrder from './NewOrder';
import { OPEN_ORDER_TAB, NEW_ORDER_TAB } from '../utils/consts'
import { changeActiveTab } from "../actions/tabActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class LeftGrid extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: OPEN_ORDER_TAB
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
        return (
            <Col style={{paddingLeft: '0', paddingRight: '0'}}  className={"custom-grid"}>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === OPEN_ORDER_TAB }, 'nav-link')}
                            onClick={() => { this.toggle(OPEN_ORDER_TAB); }}
                        >
                            <h3><strong>Open Orders</strong></h3>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === NEW_ORDER_TAB }, 'nav-link')}
                            onClick={() => { this.toggle(NEW_ORDER_TAB); }}
                        >
                            <h3><strong>New Order</strong></h3>
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId={OPEN_ORDER_TAB}>
                        <Row>
                            <Col sm="12">
                                <ListContainer/>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId={NEW_ORDER_TAB}>
                        <Row>
                            <Col sm="12">
                                <NewOrder/>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </Col>
        );
    }
}

LeftGrid.propTypes = {
    changeActiveTab: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    item: state.item,
    list: state.list
});

export default connect(mapStateToProps, { changeActiveTab })(LeftGrid);