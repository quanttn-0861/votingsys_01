import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';
import OptionPoll from './OptionPoll';
import InformationPoll from './InformationPoll';
import SettingPoll from './SettingPoll';
import MailParticipant from './MailParticipant';
import { handleInputChange } from '../utils/InputHandler';

export default class CreatePoll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            title: '',
            multiple: 1,
            description: '',
            date_close: '',
            location: '',
            nameOption: '',
            options: [],
        }
    }

    getStateFromInformationPoll = (name, email, title, multiple, description, date_close, location) => {
        this.setState({
            name: name,
            email: email,
            title: title,
            multiple: multiple,
            description: description,
            date_close: date_close,
            location: location,
        })
    }

    addOption = () => {
        this.state.options.push(this.state.nameOption)
        this.setState({
            nameOption: ""
        })
    }

    handleChangeNameOption = (e) => {
        this.setState({
            nameOption: e.target.value,
        })
    }

    deleteOption = (name) => {
        this.setState({
            options: this.state.options.filter(function (option) {
                return option !== name
            })
        })
    }

    handleSubmit = (e) => {
        this.state.options.push(this.state.nameOption)
        e.preventDefault()
        const url = window.Laravel.baseUrl + '/poll'
        const data = {
            name: this.state.name,
            email: this.state.email,
            title: this.state.title,
            multiple: this.state.multiple,
            description: this.state.description,
            date_close: this.state.date_close,
            location: this.state.location,
            options: this.state.options,
        }
        axios.post(url, data)
            .then(response => {
                console.log(response)
                this.props.history.push('/link-poll')
            })
            .catch(function (error) {
                console.log(error.response)
            })
    }

    render() {
        const deleteOption = this.deleteOption
        const optionItems = this.state.options.map(function (option, index) {
            return <OptionPoll key={index} option={option} deleteOption={deleteOption} />
        })
        const getInformationForm = this.getStateFromInformationPoll
        const informationForm = <InformationPoll getStateFromInformationPoll={getInformationForm} />
        return (
            <React.Fragment>
                <div className="body-form">
                    <form onSubmit={this.handleSubmit} id="msform">
                        <ul id="progressbar">
                            <li className="active" id="progress1">
                                <div></div>
                            </li>
                            <li id="progress2">
                                <div></div>
                            </li>
                            <li id="progress3">
                                <div></div>
                            </li>
                            <li id="progress4">
                                <div></div>
                            </li>
                        </ul>
                        <fieldset>
                            {
                                informationForm
                            }
                        </fieldset>
                        <fieldset>
                            <h2 className="fs-title">Tùy chọn</h2>
                            <div className="setting">
                                <div className="controls">
                                    {
                                        optionItems
                                    }
                                    <div className="option-choice">
                                        <div className="entry input-group col-xs-12">
                                            <input className="form-control" type="text" value={this.state.nameOption} onChange={this.handleChangeNameOption} placeholder="Type something" />
                                            <span className="input-group-btn">
                                                <button className="btn btn-success btn-add" onClick={this.addOption} type="button">
                                                    <span className="glyphicon glyphicon-plus"></span>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                    <br />
                                    <small>Press <span className="glyphicon glyphicon-plus gs"></span> to add another form option :)</small>
                                </div>
                            </div>
                            <input type="button" name="previous" className="previous action-button" value="Previous" />
                            <input type="button" name="next" className="next action-button" value="Next" />
                        </fieldset>
                        <fieldset>
                            <SettingPoll />
                        </fieldset>
                        <fieldset>
                            <MailParticipant />
                        </fieldset>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}
