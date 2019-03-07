import React from 'react';
import { Col, Row ,Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { addToList, removeFromList } from "../actions/listActions";

class OpenOrderModal extends React.Component {

    toggleModal = () => {
        this.props.toggle();
    };

    addItemToList = (listId, itemId) => {
        this.props.addToList(listId, itemId);
    };

    removeItemFromList = (listId, itemId) => {
        this.props.removeFromList(listId, itemId);
    };

    render() {
        let total = 0;
        return (
            <div>
                <Modal centered={true} fade={false} isOpen={this.props.isOpen} toggle={this.toggleModal.bind(this)}>
                    <ModalHeader toggle={this.toggleModal.bind(this)}>{this.props.modalHeader}</ModalHeader>
                    <ModalBody>
                        {this.props.items.map(item => {
                            total = total + item.price * item.count / 100
                            return (
                                <div key={item._id}>
                                    <Row>
                                        <Col sm={10}>
                                            {item.name} | {item.count} | {(item.price * item.count / 100).toFixed()}</Col>
                                        <Col sm={2}>
                                            <button type="button" value="plus" onClick={this.addItemToList.bind(this, this.props.id, item.id)}>
                                                +
                                            </button>
                                            <button type="button" value="minus" onClick={this.removeItemFromList.bind(this, this.props.id, item.id)}>
                                                -
                                            </button>
                                        </Col>
                                    </Row>
                                </div>

                            )
                        })}
                        {
                            <div>
                                <br/>
                                <Row>
                                    <Col sm={8}></Col>
                                    <Col sm={2}>
                                        {'Total :'}
                                    </Col>
                                    <Col sm={2}>
                                        {total.toString()}
                                    </Col>
                                </Row>
                            </div>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color={this.props.cancelColor}  onClick={this.toggleModal.bind(this)}>{this.props.modalCancelLabel}</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}


OpenOrderModal.propTypes = {
    addToList: PropTypes.func.isRequired,
    removeFromList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { addToList,removeFromList })(OpenOrderModal);
