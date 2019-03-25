import React, { Component } from 'react';
import {Col, Container, Row, Spinner} from "reactstrap";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Item from "./Item";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class ItemGridTab extends Component {
    render() {
        const { items, loading } = this.props.item;
        if (!loading) {
            if (items.length > 0) {
                return (
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
                )
            } else {
                return (
                    <Col>
                        <h4>No items to display</h4>
                    </Col>
                )
            }

        } else {
            return (
                <Col>
                    <Spinner style={{ width: '3rem', height: '3rem' }} />
                </Col>
            )
        }

    }
}

ItemGridTab.propTypes = {
    item: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(mapStateToProps, {})(ItemGridTab);