import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { handleInputChange } from '../utils/InputHandler';

export default class SettingPoll extends Component {
    render() {
        return (
            <React.Fragment>
                <h2 className="fs-title">Cài đặt</h2>
                <div className="switch-button">
                    <div className="checkbox" id="flip-checkbox1">
                        <input type="checkbox" data-toggle="toggle" data-onstyle="info" />
                        <label> Cho phép người tham gia thêm tùy chọn mới </label>
                    </div>
                    <div className="panel-checkbox" id="panel-checkbox1">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios1" id="exampleRadios1" value="option1" defaultChecked />
                            <label className="form-check-label">
                                Yêu cầu phải đăng nhập tài khoản wsm
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios1" id="exampleRadios1" value="option1" defaultChecked />
                            <label className="form-check-label">
                                Nhập tên
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios1" id="exampleRadios1" defaultChecked />
                            <label className="form-check-label">
                                Nhập email
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios1" id="exampleRadios1" defaultChecked />
                            <label className="form-check-label">
                                Nhập tên và email
                          </label>
                        </div>
                    </div>

                    <div className="clear"></div>

                    <div className="checkbox" id="flip-checkbox2">
                        <input type="checkbox" data-toggle="toggle" data-onstyle="info" />
                        <label> Cho phép chỉnh sửa tùy chọn </label>
                    </div>
                    <div className="clear"></div>
                    <div className="panel-checkbox" id="panel-checkbox2">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios3" id="exampleRadios2" defaultChecked />
                            <label className="form-check-label">
                                Ân tất cả thông bầu chọn
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios3" id="exampleRadios2" defaultChecked />
                            <label className="form-check-label">
                                Chỉ hiển thị số lượng người bầu chọn
                          </label>
                        </div>
                    </div>
                    <div className="clear"></div>
                    <div className="checkbox">
                        <input type="checkbox" data-toggle="toggle" data-onstyle="info" />
                        <label> Vô hiệu hóa bầu chọn </label>
                    </div>
                    <div className="clear"></div>
                    <div className="checkbox" id="flip-checkbox3">
                        <input type="checkbox" data-toggle="toggle" data-onstyle="info" />
                        <label> Đặt số lượng bầu chọn tối đa </label>
                    </div>
                    <div className="panel-checkbox" id="panel-checkbox3">
                        <div className="input link-edit">
                            <span className="input-group-text"><i className="fa fa-list-ol" aria-hidden="true"></i></span>
                            <input type="number" className="form-control input-inf"
                                aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className="clear"></div>
                    <div className="checkbox" id="flip-checkbox4">
                        <input type="checkbox" data-toggle="toggle" data-onstyle="info" />
                        <label> Đặt mật khẩu </label>
                    </div>
                    <div className="panel-checkbox" id="panel-checkbox4">
                        <div className="input link-edit link-edit2">
                            <span className="input-group-text"><i className="fa fa-key" aria-hidden="true"></i></span>
                            <input type="password" className="form-control input-inf" id="password-field" aria-describedby="basic-addon1" />
                            <span className="input-group-text key-span toggle-password fa fa-eye" toggle="#password-field"></span>
                        </div>
                    </div>
                </div>
                <div className="clear"></div>
                <button name="previous" className="previous action-button" type="button">Previous</button>
                <button name="next" className="next action-button" type="button">Next</button>
            </React.Fragment>
        );
    }
}
