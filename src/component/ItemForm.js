import { addItem } from '../actions/itemActions';
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../styles/index.css';
import {connect} from "react-redux";
import PropTypes from "prop-types";

class ItemForm extends Component {

    state = {
        name: '',
        description: '',
        price: 0
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addItem({
            name: this.state.name,
            description: this.state.description,
            price: this.state.price * 100
        });

    };

    render() {
        return (
            <Form className={'order-form'} onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup>
                    <Label for="exampleText">Name</Label>
                    <Input onChange={this.handleChange.bind(this)} type="text" name="name" id="exampleText" placeholder="Enter Name" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Description</Label>
                    <Input onChange={this.handleChange.bind(this)} type="tel" name="description" id="exampleText" placeholder="Add description" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Price</Label>
                    <Input onChange={this.handleChange.bind(this)} type="number" name="price" id="exampleText" placeholder="Price" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Add Image</Label>
                    <br/>
                    <input type="file"
                           id="avatar" name="avatar"
                           accept="image/png, image/jpeg"/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}

ItemForm.propTypes = {
    addItem: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { addItem })(ItemForm);