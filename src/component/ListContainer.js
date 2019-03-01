import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {  getLists, selectList } from "../actions/listActions";
import OrderList from './OrderList';
import { Row, Col } from "reactstrap";
import '../styles/index.css';

class ListContainer extends Component {
    state = {
        activeList: ''
    };
    componentDidMount() {
        this.props.getLists();
    }

    setActiveList = (id) => {
        this.setState({
            activeList: id
        });
        this.props.selectList(id);
    };

    render() {
        const { lists } = this.props.list;
        const renderLists = lists.filter(list => list.status !== 1 && list.items.length > 0);
        return (
            <Col>
                <Row className={'order-grid'}>
                    {renderLists.map(({_id, name}) => (
                        <OrderList activeList={this.state.activeList} key={_id} name={name} id={_id} setActiveList={this.setActiveList}/>
                    ))}
                </Row>
            </Col>
        );
    }
}

ListContainer.propTypes = {
    getLists: PropTypes.func.isRequired,
    selectList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    list: state.list,
});

export default connect(mapStateToProps, { getLists, selectList })(ListContainer);