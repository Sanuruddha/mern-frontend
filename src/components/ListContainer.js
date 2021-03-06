import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {  getLists, selectList } from "../actions/listActions";
import OrderList from './OrderList';
import { Row, Col, Spinner } from "reactstrap";

class ListContainer extends Component {
    state = {
        activeList: ''
    };
    componentDidMount() {
        this.props.getLists(this.props.auth.user.id);
    }

    setActiveList = (id) => {
        this.setState({
            activeList: id
        });
        this.props.selectList(id);
    };

    render() {
        const { lists, loading } = this.props.list;
        // checks if the order lists are loading
        if (!loading) {
            let renderLists = [];
            if (lists) {
                // filters open and non empty orders
                renderLists = lists.filter(list => list.status !== 1 && list.items.length > 0);
            }
            if (renderLists.length > 0) {
                // renders open and non empty orders if exist
                return (
                    <Col>
                        <Row className={'order-grid'}>
                            {renderLists.map(({_id, name}) => (
                                <OrderList activeList={this.state.activeList} key={_id} name={name} id={_id}
                                           setActiveList={this.setActiveList}/>
                            ))}
                        </Row>
                    </Col>)
            } else {
                return (
                    <Col>
                        <h4>No orders to display</h4>
                    </Col>
                )
            }

        } else return (
            // renders a spinner while loading
            <Col>
                <Spinner style={{ width: '3rem', height: '3rem' }} />
            </Col>
        );
    }
}

ListContainer.propTypes = {
    getLists: PropTypes.func.isRequired,
    selectList: PropTypes.func.isRequired,
    list: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    list: state.list,
    auth: state.auth
});

export default connect(mapStateToProps, { getLists, selectList })(ListContainer);