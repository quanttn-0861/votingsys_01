import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { handleInputChange } from '../utils/InputHandler';
import { handleOptionChange } from '../utils/HandleOptionChange';
import SimpleReactValidator from 'simple-react-validator';

export default class SettingPoll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addSetting: 'no_addSetting',
            editSetting: 'no_editSetting',
            disablePoll: false,
            maxVote: 0,
            setPassword: 'no_setpassword',
        }
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Vui lòng không để trống ô này',
                max: 'Số lượng bầu chọn không được vượt quá 10000'
            },
        });
    }

    handleSettingForm = () => {
        if ((this.state.setPassword !== 'no_setpassword') || (this.state.maxVote !== 0)) {
            if (this.validator.fieldValid('setPassword') && this.validator.fieldValid('maxVote')) {
                this.props.getSettingForm(this.state.addSetting, 
                    this.state.editSetting,
                    this.state.disablePoll,
                    this.state.maxVote,
                    this.state.setPassword);
                this.props.setFieldset4();
            } else {
                this.validator.showMessages();
                this.forceUpdate();
            } 
        } else {
            this.props.getSettingForm(this.state.addSetting, 
                this.state.editSetting,
                this.state.disablePoll,
                this.state.maxVote,
                this.state.setPassword);
            this.props.setFieldset4();
        }
    }

    handleClickAddSetting = () => {
        if (this.state.addSetting === "no_addSetting") {
            this.setState({
                addSetting: "is_wsm"
            })
        } else {
            this.setState({
                addSetting: "no_addSetting"
            })
        }
        $("#panel-checkbox1").slideToggle("normal");
    }

    handleClickEditSetting = () => {
        if (this.state.editSetting === "no_editSetting") {
            this.setState({
                editSetting: "invisible_result"
            })
        } else {
            this.setState({
                editSetting: "no_editSetting"
            })
        }
        $("#panel-checkbox2").slideToggle("normal");
    }

    handleDisablePoll = () => {
        if (this.state.disablePoll === false) {
            this.setState({
                disablePoll: true,
            })
        } else {
            this.setState({
                disablePoll: false,
            })
        }
    }

    handleClickMaxVote = () => {
        if (this.state.maxVote === 0) {
            this.setState({
                maxVote: ""
            })
        } else {
            this.setState({
                maxVote: 0
            })
        }
        $("#panel-checkbox3").slideToggle("normal");
    }

    handleClickSetPassword = () => {
        if (this.state.setPassword === 'no_setpassword') {
            this.setState({
                setPassword: "",
            })
        } else {
            this.setState({
                setPassword: 'no_setpassword'
            })
        }
        $("#panel-checkbox4").slideToggle("normal");
    }

    render() {
        return (
            <React.Fragment>
                <h2 className="fs-title">Cài đặt</h2>
                <div className="switch-button">
                    <div className="style-checkbox style-button-toggle" onClick={this.handleClickAddSetting}>
                        <input type="checkbox" data-toggle="toggle" data-onstyle="info" defaultChecked={this.state.addSetting === "no_addSetting" ? "" : "true"} />
                    </div>
                    <label className="style-label-setting"> Cho phép người tham gia thêm tùy chọn mới </label>
                    <div className="panel-checkbox" id="panel-checkbox1">
                        <div className="form-check">
                            <input
                                type="radio"
                                name="addSetting"
                                value="is_wsm"
                                defaultChecked={this.state.addSetting === "is_wsm" ? "" : "true"}
                                onChange={handleOptionChange.bind(this)}
                                className="form-check-input"
                            />
                            <label className="form-check-label">
                                Yêu cầu phải đăng nhập tài khoản wsm
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="addSetting"
                                value="required_name"
                                defaultChecked={this.state.addSetting === "required_name"}
                                onChange={handleOptionChange.bind(this)}
                                className="form-check-input"
                            />
                            <label className="form-check-label">
                                Nhập tên và email
                            </label>
                        </div>
                    </div>

                    <div className="clear"></div>

                    <div className="style-checkbox style-button-toggle" onClick={this.handleClickEditSetting}>
                        <input type="checkbox" data-toggle="toggle" data-onstyle="info" defaultChecked={this.state.editSetting === "no_editSetting" ? "" : "true"} />
                    </div>
                    <label className="style-label-setting"> Cho phép chỉnh sửa tùy chọn </label>
                    <div className="panel-checkbox" id="panel-checkbox2">
                        <div className="form-check">
                            <input
                                type="radio"
                                name="editSetting"
                                value="invisible_result"
                                checked={this.state.editSetting === "invisible_result"}
                                onChange={handleOptionChange.bind(this)}
                                className="form-check-input"
                            />
                            <label className="form-check-label">
                                Ân tất cả thông tin/ kết quả bầu chọn
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="editSetting"
                                value="display_number_vote"
                                checked={this.state.editSetting === "display_number_vote"}
                                onChange={handleOptionChange.bind(this)}
                                className="form-check-input"
                            />
                            <label className="form-check-label">
                                Chỉ hiển thị số lượng người bầu chọn
                          </label>
                        </div>
                    </div>
                    <div className="clear"></div>

                    <div className="style-checkbox style-button-toggle" onClick={this.handleDisablePoll}>
                        <input type="checkbox" data-toggle="toggle" data-onstyle="info" defaultChecked={this.state.disablePoll === false ? "" : "true"} />
                    </div>
                    <label className="style-label-setting"> Vô hiệu hóa bầu chọn </label>

                    <div className="clear"></div>

                    <div className="style-checkbox style-button-toggle" onClick={this.handleClickMaxVote}>
                        <input type="checkbox" data-toggle="toggle" data-onstyle="info" defaultChecked={this.state.maxVote === 0 ? "" : "true"} />
                    </div>
                    <label className="style-label-setting"> Đặt số lượng bầu chọn tối đa </label>
                    <div className="panel-checkbox" id="panel-checkbox3">
                        <div className="input link-edit">
                            <span className="input-group-text">
                                <i className="fa fa-list-ol" aria-hidden="true"></i>
                            </span>
                            <input type="number"
                                name="maxVote"
                                className="form-control input-inf"
                                aria-describedby="basic-addon1"
                                value={this.state.maxVote}
                                onChange={handleOptionChange.bind(this)} 
                            />
                        {<div className="validation" style={{ display: 'block' }}>{this.validator.message('maxVote', this.state.maxVote, 'required|max:4')}</div>}
                        </div>
                    </div>

                    <div className="clear"></div>
                    
                    <div className="style-checkbox style-button-toggle" onClick={this.handleClickSetPassword}>
                        <input type="checkbox" data-toggle="toggle" data-onstyle="info" defaultChecked={this.state.setPassword === 'no_setpassword' ? "" : "true"} />
                    </div>
                    <label className="style-label-setting style-field-password"> Đặt mật khẩu </label>
                    <div className="panel-checkbox" id="panel-checkbox4">
                        <div className="input link-edit link-edit2">
                            <span className="input-group-text">
                                <i className="fa fa-key" aria-hidden="true"></i>
                            </span>
                            <input type="password" 
                                className="form-control input-inf"
                                name="setPassword"
                                id="password-field" 
                                aria-describedby="basic-addon1"
                                value={this.state.setPassword}
                                onChange={handleOptionChange.bind(this)}
                            />
                        <span className="input-group-text key-span toggle-password fa fa-eye" toggle="#password-field"></span>
                        {<div className="validation" style={{ display: 'block' }}>{this.validator.message('setPassword', this.state.setPassword, 'required')}</div>}
                        </div>
                    </div>
                </div>
                <div className="clear"></div>
                <input type="button" name="previous" className="previous action-button" value="Previous" onClick={this.props.setFieldset2} />
                <input type="button" name="next" className="next action-button" value="Next" onClick={this.handleSettingForm} />
            </React.Fragment>
        );
    }
}
