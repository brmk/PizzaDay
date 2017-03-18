import React, { Component } from 'react';
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import Items from '../api/items'

export default class InsertItem extends Component {
    insertItem(event) {
        event.preventDefault();
        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        const prise = ReactDOM.findDOMNode(this.refs.priseInput).value.trim();
        itemInstert = {name:name,prise:prise,group:this.props.params.groupId}
        Meteor.call('Items.insert', itemInstert , (err, result) => {
            if (err) throw err;
            browserHistory.push('/group/'+this.props.params.groupId);
        });
    }
    render() {
        return (
            <div className="container">
                <h1>Add Item</h1>
                <div className="col-md-5">
                    <form>
                        <FormGroup className="relative" bsSize="large">
                            <ControlLabel className="label-form-insert">Name:</ControlLabel>
                            <FormControl className="inputName"
                                         type="text"
                                         name="name"
                                         ref="nameInput"
                                         pattern="2-[0-9]{3}-[0-9]{3}"
                            />
                        </FormGroup>
                        <FormGroup className="relative" bsSize="large">
                            <ControlLabel className="label-form-insert" >Prise:</ControlLabel>
                            <FormControl className="inputName"
                                         type="text"
                                         name="prise"
                                         ref="priseInput"
                                         pattern="\d+(\.\d{2})?"
                            />
                        </FormGroup>
                        <Button type="submit"
                                className="formButton"
                                onClick={this.insertItem.bind(this)}
                        >
                            <b>Add</b>
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}