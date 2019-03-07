import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { updateNewList, createList } from '../actions/listActions';

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

    render() {
        let number = 0;
        let total = 0;
        return (
            <Form className={'order-form'} onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup>
                    <Label for="exampleText">Customer Name</Label>
                    <Input onChange={this.handleChange.bind(this)} type="text" name="name" id="exampleText" placeholder="Enter Name" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Add Items</Label>
                    <div className="custom-table">
                        <table className="table">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Item</th>
                                <th scope="col">Count</th>
                                <th scope="col">Price</th>
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
                                        <th scope="row">{++number}</th>
                                        <td>{item.name}</td>
                                        <td>{item.count}</td>
                                        <td>{item.price * item.count / 100}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <th scope="col">{""}</th>
                                <th scope="col">{""}</th>
                                <th scope="col">{total? "Total": ""}</th>
                                <th scope="col">{total? total: ''}</th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}

OrderForm.propTypes = {
    list: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    updateNewList: PropTypes.func.isRequired,
    createList: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    list: state.list,
    item: state.item
});

export default connect(mapStateToProps, { updateNewList, createList })(OrderForm);