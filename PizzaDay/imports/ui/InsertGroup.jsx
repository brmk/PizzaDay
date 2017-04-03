import React, { Component } from 'react';
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

export default class InsertGroup extends Component {
    insertGroup(event) {
        event.preventDefault();

        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        groupInstert = {name:name,mainUser:Meteor.user()._id};
        Meteor.call('Groups.insert', groupInstert , (error, result) => {
            if (error)
                $.notify(error.reason, {type: "danger" });
            else
                browserHistory.push('/');
        });
    };
    uploadFile(event) {
        event.preventDefault();
        var files = $("input.file_bag")[0].files;
        S3.upload({
                files:files,
                path:"/images/"
            },function(e,r){
                console.log(e,r);
        });
    }
    render() {
        return (
            <div className="container">
                <h1>Add Group</h1>
                <div className="col-md-5 upload-area">
                    <form >
                            <FormGroup className="relative" bsSize="large">
                                <ControlLabel className="label-form-insert">Name:</ControlLabel>
                                <FormControl className="inputName"
                                    type="text"
                                    name="name"
                                    ref="nameInput"
                             />
                            </FormGroup>
                        <FormGroup className="relative" bsSize="large">
                            <ControlLabel>Image:</ControlLabel>
                                <p>
                                    Click or Drag a File Here to Upload
                                    <input type="file" className="file_bag"/>
                                    <button onClick={this.uploadFile.bind(this)}>Upload</button>
                                </p>
                        </FormGroup>
                            <Button type="submit"
                                    className="formButton"

                            >
                                <b>Add</b>
                            </Button>
                    </form>
                </div>
            </div>
        );
    }
}