import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
                        <table style={{width: '100%'}}>
                            <tbody>
                                <tr>
                                    <th>Item</th>
                                    <th className={'text-right'}>Count</th>
                                    <th className={'text-right'}>Price</th>
                                    <th className={'text-right'}>Add/Remove</th>
                                </tr>
                                {this.props.items.map(item => {
                                    total = total + item.price * item.count / 100
                                    return (
                                        <tr key={item._id}>
                                            <td>
                                                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                            </td>
                                            <td className={'text-right'}>
                                                {item.count}
                                            </td>
                                            <td className={'text-right'}>
                                                {(item.price * item.count / 100).toFixed()}
                                            </td>
                                            <td className={'text-right'}>
                                            <button type="button" value="plus" onClick={this.addItemToList.bind(this, this.props.id, item.id)}>
                                                <i className="fa fa-plus"></i>
                                            </button>
                                                <button type="button" value="minus" onClick={this.removeItemFromList.bind(this, this.props.id, item.id)}>
                                                    <i className="fa fa-minus"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                <tr>
                                    <td colspan="4" className={'text-right'}>
                                        <b>{'Total :'}{total.toString()}</b>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
