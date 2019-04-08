import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { handleInputChange } from '../utils/InputHandler';

export default class LinkPoll extends Component {
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
        };
    }

    informationForm = () => {
        this.props.getStateFromInformationPoll(
            this.state.name, 
            this.state.email,
            this.state.title,
            this.state.multiple,
            this.state.description,
            this.state.date_close,
            this.state.location
        )
    }

    handleChangeDateClose = (date) => {
        this.setState({
            date_close: date
        })
    }

    render() {
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
                </div>
                <div className="input">
                    <span className="input-group-text">
                        <i className="fa fa-envelope"
                            aria-hidden="true">
                        </i>
                    </span>
                    <input type="text" name="email"
                        className="form-control input-inf"
                        placeholder="Nhập địa chỉ email của bạn..."
                        value={this.state.email}
                        onChange={handleInputChange.bind(this)}
                        aria-describedby="basic-addon1" />
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
                        onClick={this.informationForm}
                        value="Next" />
            </React.Fragment>
        );
    }
}
