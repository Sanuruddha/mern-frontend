import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from "prop-types";

class ConfirmationModal extends React.Component {

    toggleModal = () => {
        this.props.toggle();
    };

    handleConfirmation = () => {
        this.props.onConfirm();
        this.toggleModal();
    };

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.toggleModal.bind(this)}>
                    <ModalHeader toggle={this.toggleModal.bind(this)}>{this.props.modalHeader}</ModalHeader>
                    <ModalBody>
                        {this.props.modalBodyText}
                    </ModalBody>
                    <ModalFooter>
                        <Button color={this.props.cancelColor}  onClick={this.toggleModal.bind(this)}>{this.props.modalCancelLabel}</Button>
                        <Button color={this.props.confirmColor}  onClick={this.handleConfirmation.bind(this)}>{this.props.modalConfirmationLabel}</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

ConfirmationModal.propTypes = {
    modalHeader: PropTypes.string.isRequired,
    modalCancelLabel: PropTypes.string.isRequired,
    modalConfirmationLabel: PropTypes.string.isRequired,
    cancelColor: PropTypes.string.isRequired,
    confirmColor: PropTypes.string.isRequired,
    modalBodyText: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired
};

export default ConfirmationModal;