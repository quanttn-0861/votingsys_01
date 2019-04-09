import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { handleInputChange } from '../utils/InputHandler';
import Validator from '../utils/validator'
import * as yup from 'yup';

export default class InformationPoll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            title: '',
            multiple: 1,
            description: '',
            date_close: new Date(),
            location: '',
            errors: { error: "error" },
        };
        const rules = [
            {
                field: 'name',
                method: 'isEmpty',
                validWhen: false,
                message: 'Vui lòng nhập tên để bầu chọn poll này',
            },
            {
                field: 'email',
                method: 'isEmpty',
                validWhen: false,
                message: 'Vui lòng nhập email để bầu chọn poll này',
            },
            {
                field: 'email',
                method: 'isEmail',
                validWhen: true,
                message: 'Email không đúng định dạng',
            },
            {
                field: 'title',
                method: 'isEmpty',
                validWhen: false,
                message: 'Vui lòng nhập tiêu đề poll',
            },
        ];
        this.validator = new Validator(rules);
    }

    handleChangeDateClose = (date) => {
        this.setState({
            date_close: date
        })
    }

    getMessagErrorsValidate() {
        this.setState(nextState => {
            return {
                errors: this.validator.validate(nextState)
            }
        });
    }

    getInformationForm = () => {
        let countErrors = Object.keys(this.state.errors).length;
        if (countErrors !== 0) {
            this.setState({
                errors: this.validator.validate(this.state),
            });
        } else {
            this.props.setFieldset2()
            this.props.getStateFromInformationPoll(
                this.state.name,
                this.state.email,
                this.state.title,
                this.state.multiple,
                this.state.description,
                this.state.date_close,
                this.state.location
        )}
    }
    render() {
        const { errors } = this.state;
        return (
            <React.Fragment>
                <h2 className="fs-title">Thông tin</h2>
                <div className="input">
                    <span className="input-group-text">
                        <i className="fa fa-user" aria-hidden="true"></i>
                    </span>
                    <input type="text" name="name"
                        className="form-control input-inf"
                        placeholder="Nhập tên bạn..."
                        value={this.state.name}
                        onChange={handleInputChange.bind(this)}
                        aria-describedby="basic-addon1" />
                    {errors.name && <div className="validation" style={{ display: 'block' }}>{errors.name}</div>}
                </div>
                <div className="input">
                    <span className="input-group-text">
                        <i className="fa fa-envelope"
                            aria-hidden="true">
                        </i>
                    </span>
                    <input type="text" name="email"
                        className="component form-control input-inf"
                        placeholder="Nhập địa chỉ email của bạn..."
                        value={this.state.email}
                        onChange={handleInputChange.bind(this)}
                        aria-describedby="basic-addon1" />
                    {errors.email && <div className="validation" style={{ display: 'block' }}>{errors.email}</div>}
                </div>
                <div className="input">
                    <span className="input-group-text">
                        <i className="fa fa-text-width"
                            aria-hidden="true">
                        </i>
                    </span>
                    <input type="text" name="title"
                        className="form-control input-inf"
                        placeholder="Nhập tiêu đề poll..."
                        value={this.state.title}
                        onChange={handleInputChange.bind(this)}
                        aria-describedby="basic-addon1" />
                    {errors.title && <div className="validation" style={{ display: 'block' }}>{errors.title}</div>}
                </div>
                <div className="input">
                    <select name="multiple"
                        className="form-control"
                        value={this.state.multiple}
                        onChange={handleInputChange.bind(this)}>
                        <option value="1">
                            Một đáp án
                        </option>
                        <option value="2">
                            Nhiều đáp án
                        </option>
                    </select>
                </div>
                <textarea name="description"
                    className="form-control input-textarea"
                    rows="4"
                    value={this.state.description}
                    onChange={handleInputChange.bind(this)}
                    placeholder="Nhập mô tả cho poll này...">
                </textarea>
                <div className="input">
                    <span className="input-group-text">
                        <i className="fa fa-clock-o"
                            aria-hidden="true">
                        </i>
                    </span>
                    <div className='col-sm-6 datetime'>
                        <DatePicker
                            className="form-control datetime-input"
                            selected={this.state.date_close}
                            onSelect={this.handleChangeDateClose}
                            onChange={this.handleChangeDateClose}
                        />
                    </div>
                </div>
                <div className="input">
                    <span className="input-group-text">
                        <i className="fa fa-map-marker"
                            aria-hidden="true">
                        </i>
                    </span>
                    <input type="text"
                        name="location"
                        className="form-control input-inf"
                        value={this.state.location}
                        onChange={handleInputChange.bind(this)}
                        placeholder="Nhập vị trí..."
                        aria-describedby="basic-addon1"
                        id="pac-input" />
                </div>
                <input type="button"
                    name="next"
                    className="next action-button"
                    onClick={this.getInformationForm}
                    value="Next" />
            </React.Fragment>
        );
    }
}
