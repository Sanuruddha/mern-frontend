import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { updateNewList, createList, clearList } from '../actions/listActions';

class OrderForm extends Component {
    handleChange = (e) => {
        this.props.updateNewList({
                ...this.props.list.newList,
                [e.target.name] : e.target.value
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createList(this.props.list.newList);
    };
    handleClear = (e) => {
        e.preventDefault();
        this.props.clearList(this.props.list.newList);
    };
    handleIncrement = (id, e) => {
        e.preventDefault();
        let index = this.props.list.newList.items.map(item => item.id ).indexOf(id);
        let updatedItems = [];
        if (index > -1)
            updatedItems = this.props.list.newList.items.map(item => {
                if (item.id === id) {
                    item.count++;
                }
                return item;
            });
        this.props.updateNewList({
            ...this.props.list.newList,
            items: updatedItems
        });
    };

    handleDecrement = (id, e) => {
        e.preventDefault();
        let index = this.props.list.newList.items.map(item => item.id ).indexOf(id);
        let updatedItems = [...this.props.list.newList.items];
        if (index > -1)
            if (updatedItems[index].count > 1)
                updatedItems[index].count --;
            else if (updatedItems[index].count === 1)
                updatedItems.splice(index, 1);
        this.props.updateNewList({
            ...this.props.list.newList,
            items: updatedItems
        });
    };
    render() {
        let number = 0;
        let total = 0;
        return (
            <Form className={'order-form'}>
                <FormGroup>
                    <Label for="exampleText">Customer Name</Label>
                    <Input value={this.props.list.newList.name} onChange={this.handleChange.bind(this)} type="text" name="name" id="exampleText" placeholder="Enter Name" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Add Items</Label>
                    <div className="custom-table">
                        <table className="table">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col" className="td-left">#</th>
                                <th scope="col" className="td-left">Item</th>
                                <th scope="col" className="td-right">Count</th>
                                <th scope="col" className="td-right">Price</th>
                                <th scope="col" className="td-right">+/-</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.list.newList.items.map(list_item => {
                                const item = this.props.item.items.filter(item => item._id === list_item.id)[0];
                                return {...item, count: list_item.count}
                            }).map(item => {
                                total += item.price * item.count / 100;
                                return (
                                    <tr key={item._id}>
                                        <th scope="row" className="td-left">{++number}</th>
                                        <td className="td-left">{item.name}</td>
                                        <td className="td-right">{item.count}</td>
                                        <td className="td-right">{item.price * item.count / 100}</td>
                                        <td className="td-right">
                                            <button onClick={this.handleIncrement.bind(this, item._id)}>+</button>
                                            <button onClick={this.handleDecrement.bind(this, item._id)}>-</button>
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <th scope="col">{""}</th>
                                <th scope="col">{""}</th>
                                <th scope="col">{""}</th>
                                <th scope="col" className="td-right">{total? "Total": ""}</th>
                                <th scope="col" className="td-right">{total? total: ''}</th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </FormGroup>
                <Row>
                    <Col/><Col/><Col/>
                    <Col>
                        <Button style={{border: '0', width: '100%'}} className={'dan'} onClick={this.handleClear.bind(this)}>Clear</Button>
                    </Col>
                    <Col>
                        <Button style={{border: '0', width: '100%'}} className={'suc'} onClick={this.handleSubmit.bind(this)}>Submit</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

OrderForm.propTypes = {
    list: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    updateNewList: PropTypes.func.isRequired,
    createList: PropTypes.func.isRequired,
    clearList: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    list: state.list,
    item: state.item
});

export default connect(mapStateToProps, { updateNewList, createList, clearList })(OrderForm);