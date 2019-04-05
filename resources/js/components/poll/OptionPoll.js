import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Validator from '../utils/validator'
import { handleInputChange } from '../utils/InputHandler';

export default class OptionPoll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
        }
    }

    addOptionPoll = () => {
        this.props.addOption(this.state.name)
    }

    deleteOptionPoll = () => {
        this.props.deleteOption(this.props.option)
    }

    render() {
        return (
            <React.Fragment>
                <div className="option-choice">
                    <div className="entry input-group col-xs-12">
                        <input className="form-control" type="text" name="name" value={this.props.option} onChange={handleInputChange.bind(this)} placeholder="Type something" />
                        <span className="input-group-btn">
                            <button className="btn btn-danger btn-remove" onClick = {this.deleteOptionPoll} type="button">
                                <span className="glyphicon glyphicon-minus"></span>
                            </button>
                        </span>
                    </div>
                </div>
                <br />
            </React.Fragment>
        );
    }
}
