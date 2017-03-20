import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Items } from '../api/items.js';
import Spinner from './Spinner'




class RenderCart extends Component{
    deleteThisCart(){
            Meteor.call('Cart.remove', this.props.cart._id );
    }
    render(){
        if (this.props.loading) {
            return <Spinner/>;
        }
        return (
            <tr>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.prise*this.props.cart.Quantity+"$"}</td>
                <td>{this.props.cart.Quantity}</td>
                <td>
                    <button className="delete" onClick={this.deleteThisCart.bind(this)}>
                        &times;
                    </button>
                </td>
            </tr>
        );
    }
}

Request.propTypes = {
    cart: PropTypes.object.isRequired,
};

export default createContainer((props) => {
    const itemSubs = Meteor.subscribe('items');
    return {
        loading: !itemSubs.ready(),
        item: Items.findOne({_id:props.cart.ItemId}),
    };
},RenderCart);