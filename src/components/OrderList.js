import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Col } from 'reactstrap';
import { getItems } from '../actions/itemActions'
import { closeList, removeList } from '../actions/listActions';
import classnames from "classnames";
import ConfirmationModal from './ConfirmationModal';
import OpenOrderModal from './OpenOrderModal';

class OrderList extends Component {
    state = {
        confirmationModal: false,
        orderListModal: false,
        checkoutConformationModal: false
    };

    toggle = () => {
        this.setState(prevState => ({
            confirmationModal: !prevState.confirmationModal
        }));
    };

    toggleCheckout = () => {
        this.setState(prevState => ({
            checkoutConformationModal: !prevState.checkoutConformationModal
        }));
    };

    toggleOrderModal = () => {
        this.setState(prevState => ({
            orderListModal: !prevState.orderListModal
        }));
    }

    onDeleteClick = () => {
        console.log('deleting');
        this.props.removeList(this.props.id);

    };

    onCheckoutClick = () => {
        const { lists } = this.props.list;
        const list = lists.filter(list => list._id === this.props.id)[0];
        this.props.closeList({
            ...list,
            status: 1
        });
    };

    setActiveList = (id) => {
        this.props.setActiveList(id);
    };

    openOrder = () => {
        this.toggleOrderModal();
    };

    render() {
        const { lists } = this.props.list;
        const _id = this.props.id;
        const name = this.props.name;
        // get the self order list
        const list = lists.filter(list => list._id === _id).shift();
        // items is an object id array
        // populates the items array with relevant items from item state
        const items =list.items.map(listitem => {
            const item = this.props.item.items.filter(item => item._id === listitem.id).shift();
            if (item)
                return {...listitem, price: item.price, name: item.name};
            return null
        }).filter(listitem => listitem !== null);
        let sum = 0;
        if (items.length > 0) {
            sum = items.map(item => item.price * item.count / 100).reduce((total, value) => total + value, 0).toFixed(2);
        }
        return (
            <Col className={'limited-padding'} sm="4">
                <div
                    onClick={this.setActiveList.bind(this, _id)}
                    className={classnames({ active_list: this.props.activeList === _id }, 'card')}>
                    <div className={'card-body-wrapper'}>
                        <OpenOrderModal
                            id={_id}
                            isOpen={this.state.orderListModal}
                            toggle={this.toggleOrderModal.bind(this)}
                            modalBodyText={'Opened Order'}
                            modalHeader={name}
                            modalConfirmationLabel={'Delete'}
                            modalCancelLabel={'Close'}
                            cancelColor={"secondary"}
                            confirmColor={"danger"}
                            items={items}
                        />
                        <div className={'.card-header:first-child'} style={{color: '#ffffff', backgroundColor : '#8b918b', padding: '5px'}}><h5>{name}</h5></div>
                        <table className={'m-1 border'}>
                            <tbody>
                            <tr>
                                <th style={{width: '50%'}} className={'text-left'}>Item</th>
                                <th style={{width: '10%'}} className={'text-right'}>Qty</th>
                                <th style={{width: '40%'}} className={'text-right'}>Price</th>
                            </tr>
                        {items.map(item => (
                            <tr key={item._id}>
                                <td style={{width: '50%'}} className={'text-left'}>{
                                    item.name.charAt(0).toUpperCase() + item.name.slice(1)
                                }</td>
                                <td style={{width: '10%'}} className={'text-right'}>{item.count}</td>
                                <td style={{width: '40%'}} className={'text-right'}>{(item.price * item.count / 100).toFixed(2)}</td>
                            </tr>
                        ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="price" style={{color: '#000000'}}> {sum} LKR</p>
                    <button className={'suc ml-1 mr-1 mt-1 view-btn'} onClick={this.openOrder.bind(this)}>
                                    <span className={'icon-span'}>
                                        View
                                    </span>
                    </button>
                    <div className={'card-button-wrapper m-1'}>
                        <span className={'card-button'}>
                            <div>
                                <button className={'suc'} onClick={this.toggleCheckout.bind(this)}>
                                    <span role="img" className={'icon-span'} aria-label="Check">
                                        <i className="fa fa-check"></i>
                                    </span>
                                </button>
                                <ConfirmationModal
                                    onConfirm={this.onCheckoutClick.bind(this)}
                                    isOpen={this.state.checkoutConformationModal}
                                    toggle={this.toggleCheckout.bind(this)}
                                    modalBodyText={'Are you sure you want to check out this order?'}
                                    modalHeader={'Confirmation'}
                                    modalConfirmationLabel={'Checkout'}
                                    modalCancelLabel={'Cancel'}
                                    cancelColor={"secondary"}
                                    confirmColor={"success"}
                                />
                            </div>
                        </span>
                        <span className={'card-button'}>
                            <div>
                                <button className={'dan'} onClick={this.toggle.bind(this)}>
                                    <span className={'icon-span'}>
                                        <i className="fa fa-times"></i>
                                    </span>
                                </button>
                                <ConfirmationModal
                                    onConfirm={this.onDeleteClick.bind(this)}
                                    isOpen={this.state.confirmationModal}
                                    toggle={this.toggle.bind(this)}
                                    modalBodyText={'You are about to delete an Order List. Are you sure you want to delete?'}
                                    modalHeader={'Confirmation'}
                                    modalConfirmationLabel={'Delete'}
                                    modalCancelLabel={'Cancel'}
                                    cancelColor={"secondary"}
                                    confirmColor={"danger"}
                                />
                            </div>
                        </span>
                    </div>
                </div>
            </Col>
        );
    }
}

OrderList.propTypes = {
    getItems: PropTypes.func.isRequired,
    removeList: PropTypes.func.isRequired,
    closeList: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    item: state.item,
    list: state.list
});

export default connect(mapStateToProps, { getItems, removeList, closeList })(OrderList);

