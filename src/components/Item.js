import React, { Component } from 'react';
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardTitle,
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from "prop-types";
import CardHeader from "reactstrap/es/CardHeader";
import { addToList, updateNewList } from "../actions/listActions";
import CardText from "reactstrap/es/CardText";

class Item extends Component {
    constructor(props) {
        super(props);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    state = {
        open: false,
        name: '',
        description: ''
    };

    toggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    onChangeInput(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    addToList = () => {
        if (this.props.tab.openOrders)
            this.props.addToList(this.props.list.selectedList, this.props.selfItem._id);
        if (this.props.tab.newOrder) {
            let index = this.props.list.newList.items.map(item => item.id ).indexOf(this.props.selfItem._id);
            let updatedItems = [];
            if (index > -1)
                updatedItems = this.props.list.newList.items.map(item => {
                    if (item.id === this.props.selfItem._id) {
                        item.count++;
                    }
                    return item;
                });
            else {
                updatedItems = [...this.props.list.newList.items, { id: this.props.selfItem._id, count : 1 }];
            }
            this.props.updateNewList({
                ...this.props.list.newList,
                items: updatedItems
            });
        }
    };

    render() {
        const item = this.props.selfItem;
        return (
            <div>
                <Card>
                    <CardHeader style={{color: '#ffffff', backgroundColor : '#8b918b', padding: '5px'}}>
                        <CardTitle>
                            <h6>{item.name.toUpperCase()}</h6>
                        </CardTitle>
                    </CardHeader>
                    <CardImg top style={{width: "100%"}} className={'p-1'}
                        src={`/img/${item.imgPath}`}
                             alt="Card image cap" />
                    <CardBody className={'p-1'}>
                        <CardText className={'p-1 mb-1'}>{(item.price / 100).toFixed(2) + ' LKR'}</CardText>
                        <Button className={'add-btn'} color={'success'}
                                onClick={this.addToList.bind(this)}
                        >
                            <i className="fa fa-plus"></i>
                        </Button>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

Item.propTypes = {
    list: PropTypes.object.isRequired,
    tab: PropTypes.object.isRequired,
    selfItem: PropTypes.object.isRequired,
    addToList: PropTypes.func.isRequired,
    updateNewList: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    list: state.list,
    tab: state.tab
});

export default connect(mapStateToProps, { addToList, updateNewList })(Item);