import { addItem } from '../actions/itemActions';
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {connect} from "react-redux";
import PropTypes from "prop-types";

class ItemForm extends Component {

    state = {
        name: '',
        description: '',
        price: '',
        avatar: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('description', this.state.description);
        formData.append('price', this.state.price * 100);
        formData.append('avatar', this.state.avatar);
        this.props.addItem(formData);
        this.setState({
            name: '',
            description: '',
            price: '',
            avatar: ''
        });
    };

    getPhoto = (e) => {
        e.preventDefault();
        this.setState({
                avatar: e.target.files[0]
        });
    };

    render() {
        return (
            <Form className={'order-form'} onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup>
                    <Label for="exampleText">Name</Label>
                    <Input value={this.state.name} onChange={this.handleChange.bind(this)} type="text" name="name" id="exampleText" placeholder="Enter Name" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Description</Label>
                    <Input value={this.state.description} onChange={this.handleChange.bind(this)} type="tel" name="description" id="exampleText" placeholder="Add description" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Price</Label>
                    <Input value={this.state.price} onChange={this.handleChange.bind(this)} type="number" name="price" id="exampleText" placeholder="Price" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Add Image</Label>
                    <br/>
                    <input
                        onChange={this.getPhoto.bind(this)}
                        type="file"
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