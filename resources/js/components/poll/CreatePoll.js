import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';
import OptionPoll from './OptionPoll';
import InformationPoll from './InformationPoll';
import SettingPoll from './SettingPoll';
import MailParticipant from './MailParticipant';
import { handleInputChange } from '../utils/InputHandler';
import { withFormik } from 'formik';
import Validator from '../utils/validator'
import * as Yup from 'yup'

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
            fieldset: 1,
            errors: { error: "error" },
            addSetting: '',
            editSetting: '',
            disablePoll: '',
            maxVote: '',
            setPassword: '',
        };
        const rules = [
            {
                field: 'nameOption',
                method: 'isEmpty',
                validWhen: false,
                message: 'Vui lòng nhập đáp án bầu chọn trong poll này',
            },
        ];
        this.validator = new Validator(rules);
    }

    setFieldset1 = () => {
        this.setState({
            fieldset: 1
        })
        document.getElementById("line-option").classList.remove("line");
        document.getElementById("line-option").classList.add("line-deactive");
    }

    setFieldset2 = () => {
        this.setState({
            fieldset: 2
        })
        document.getElementById("progress-option").classList.add("active")
        document.getElementById("line-option").classList.add("line");
    }

    setFieldset3 = () => {
        this.setState({
            fieldset: 3
        })
        document.getElementById("progress-setting").classList.add("active")
        document.getElementById("line-setting").classList.add("line");
    }

    setFieldset4 = () => {
        this.setState({
            fieldset: 4
        })
        document.getElementById("progress-to-mail").classList.add("active")
        document.getElementById("line-to-mail").classList.add("line");
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

    getSettingForm = (addSettingOne, editSettingOne, disablePoll, maxVote, setPassword) => {
        this.setState({
            addSetting: addSettingOne,
            editSetting: editSettingOne,
            disablePoll: disablePoll,
            maxVote: maxVote,
            setPassword: setPassword,
        })
    }

    addOption = () => {
        this.state.options.push(this.state.nameOption)
        this.setState({
            nameOption: ""
        })
    }

    deleteOption = (name) => {
        this.setState({
            options: this.state.options.filter(function (option) {
                return option !== name
            })
        })
    }

    handleValidate = () => {
        let countErrors = Object.keys(this.state.errors).length;
        if (countErrors !== 0) {
            this.setState({
                errors: this.validator.validate(this.state),
            });
        } else {
            this.setFieldset3()
        }
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
            addSetting: this.state.addSetting,
            editSetting: this.state.editSetting,
            disablePoll: this.state.disablePoll,
            maxVote: this.state.maxVote,
            setPassword: this.state.setPassword,
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
        const { errors } = this.state;
        const deleteOption = this.deleteOption
        const optionItems = this.state.options.map(function (option, index) {
            return <OptionPoll key={index} option={option} deleteOption={deleteOption} />
        })
        const getInformationForm = this.getStateFromInformationPoll
        const informationForm = <InformationPoll getStateFromInformationPoll={getInformationForm} setFieldset2={this.setFieldset2} />
        const settingPoll = <SettingPoll getSettingForm={this.getSettingForm} setFieldset2={this.setFieldset2} setFieldset4={this.setFieldset4} />
        const mailParticipant = <MailParticipant handleSubmit={this.handleSubmit} setFieldset3={this.setFieldset3}/>
        return (
            <React.Fragment>
                <div className="body-form">
                    <div id="msform">
                        <ul id="progressbar">
                            <li className="active" id="progress-information">
                                <div id="line-information"></div>
                            </li>
                            <li id="progress-option">
                                <div id="line-option"></div>
                            </li>
                            <li id="progress-setting">
                                <div id="line-setting"></div>
                            </li>
                            <li id="progress-to-mail">
                                <div id="line-to-mail"></div>
                            </li>
                        </ul>
                        <fieldset className={this.state.fieldset === 1 ? "active-block" : "tab-none"}>
                            {
                                informationForm
                            }
                        </fieldset>
                        <fieldset className={this.state.fieldset === 2 ? "active-block" : "tab-none"}>
                            <h2 className="fs-title">Tùy chọn</h2>
                            <div className="setting">
                                <div className="controls">
                                    {
                                        optionItems
                                    }
                                    <div className="option-choice">
                                        <div className="entry input-group col-xs-12">
                                            <input className="form-control" type="text" name="nameOption" value={this.state.nameOption} onChange={handleInputChange.bind(this)} placeholder="Type something" />
                                            <span className="input-group-btn">
                                                <button className="btn btn-success btn-add" onClick={this.addOption} type="button">
                                                    <span className="glyphicon glyphicon-plus"></span>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                    {errors.nameOption && <div className="validation" style={{ display: 'block' }}>{errors.nameOption}</div>}
                                    <br />
                                    <small>Press <span className="glyphicon glyphicon-plus gs"></span> to add another form option :)</small>
                                </div>
                            </div>
                            <input type="button" name="previous" className="previous action-button" value="Previous" onClick={this.setFieldset1} />
                            <input type="button" name="next" className="next action-button" value="Next" onClick={this.handleValidate} />
                        </fieldset>
                        <fieldset className={this.state.fieldset === 3 ? "active-block" : "tab-none"}>
                            {
                                settingPoll
                            }
                        </fieldset>
                        <fieldset className={this.state.fieldset === 4 ? "active-block" : "tab-none"}>
                            {
                                mailParticipant
                            }
                        </fieldset>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
