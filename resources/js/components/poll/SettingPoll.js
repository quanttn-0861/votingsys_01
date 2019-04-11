import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { handleInputChange } from '../utils/InputHandler';
import { handleOptionChange } from '../utils/HandleOptionChange';

export default class SettingPoll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addSetting: "no_addSetting",
            editSetting: "no_editSetting",
            disablePoll: false,
        }
    }

    handleSettingForm = () => {
        this.props.getSettingForm(this.state.addSetting, this.state.editSetting, this.state.disablePoll);
        this.props.setFieldset4();
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
    render() {    
        console.log("Set edit setting:", this.state.editSetting);  
        console.log("Disable poll:", this.state.disablePoll);
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

                    <div className="style-checkbox style-button-toggle" id="flip-checkbox3">
                        <input type="checkbox" data-toggle="toggle" data-onstyle="info" />
                    </div>
                    <label className="style-label-setting"> Đặt số lượng bầu chọn tối đa </label>
                    <div className="panel-checkbox" id="panel-checkbox3">
                        <div className="input link-edit">
                            <span className="input-group-text"><i className="fa fa-list-ol" aria-hidden="true"></i></span>
                            <input type="number" className="form-control input-inf"
                                aria-describedby="basic-addon1" />
                        </div>
                    </div>

                    <div className="clear"></div>
                    
                    <div className="style-checkbox style-button-toggle" id="flip-checkbox4">
                        <input type="checkbox" data-toggle="toggle" data-onstyle="info" />
                    </div>
                    <label className="style-label-setting"> Đặt mật khẩu </label>
                    <div className="panel-checkbox" id="panel-checkbox4">
                        <div className="input link-edit link-edit2">
                            <span className="input-group-text"><i className="fa fa-key" aria-hidden="true"></i></span>
                            <input type="password" className="form-control input-inf" id="password-field" aria-describedby="basic-addon1" />
                            <span className="input-group-text key-span toggle-password fa fa-eye" toggle="#password-field"></span>
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
