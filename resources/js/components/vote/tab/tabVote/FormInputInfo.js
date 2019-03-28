import React, { Component } from "react";
import autoBind from "react-autobind";
import Validator from '../../../utils/validator'

class FormInputInfo extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            name: '',
            email: '',
            option: '',
            errors: {},
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
                message: 'Vui lòng nhập email hợp lệ',
            },
        ];
        this.validator = new Validator(rules);
    }
    handleChangedName(e) {
        this.setState({
            name: e.target.value
        })
        this.getMessagErrorsValidate();
    }
    handleChangedEmail(e) {
        this.setState({
            email: e.target.value
        })

        this.getMessagErrorsValidate();
    }

    getMessagErrorsValidate() {
        this.setState(nextState => {
            return {
                errors: this.validator.validate(nextState)
            }
        });
    }

    handleChangedOption(e) {
        this.setState({
            option: e.target.value,
        })
    }
    formSubmit() {
        if (Object.keys(this.state.errors).length === 0) {
            this.props.handleSubmit(this.state.name, this.state.email, this.state.option)
        }
        this.getMessagErrorsValidate();
    }
    render() {
        const { errors } = this.state;
        return (
            <React.Fragment>
                <div className="switch-tab">
                    <button className={this.props.tabChildren == 2 ? "btn float-right switch-tab-button-active" : "btn float-right"} onClick={this.props.handleClickTabChildren2}>
                        <i className="fa fa-th-large"></i>
                    </button>
                    <button className={this.props.tabChildren == 1 ? "btn float-right switch-tab-button-active" : "btn float-right"} onClick={this.props.handleClickTabChildren1}>
                        <i className="fa fa-th-list"></i>
                    </button>
                </div>
                <div className="tab-content">
                    <div className={this.props.tabChildren == 1 ? "tab-horizon active-block" : "tab-horizon tab-none"}>
                        <div>
                            <label className="radio">
                                <input type="radio" name="answer" value="1" onChange={this.handleChangedOption} />
                                <span className="radio__circle"></span>&nbsp;<p className="radio__text">Có</p>
                                <img className="radio-img" src="/templates/votingsys/img/user/user-default.png" />
                                <img className="radio-img" src="/templates/votingsys/img/user/user-default.png" />
                            </label>
                        </div>
                        <div>
                            <label className="radio">
                                <input type="radio" name="answer" value="2" onChange={this.handleChangedOption} />
                                <span className="radio__circle"></span>&nbsp;<p className="radio__text">Không</p>
                            </label>
                        </div>
                    </div>
                    <div className={this.props.tabChildren == 2 ? "tab-time active-block" : "tab-time tab-none"}>
                        tab time here
                    </div>

                </div>
                <div className="info-submit">
                    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 col-xs-name-vote name-vote-mobile">
                        <div className="input-group required">
                            <span className="input-group-addon">
                                <i className="fa fa-user" aria-hidden="true"></i>
                            </span>

                            <input
                                className="form-control nameVote"
                                placeholder="Nhập tên của bạn..."
                                name="nameVote"
                                type="text"
                                value={this.state.name}
                                onChange={this.handleChangedName}

                            />
                        </div>
                        {errors.name && <div className="validation" ><i className="fa fa-exclamation-triangle"></i>{errors.name}</div>}

                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 col-xs-email-vote email-vote-mobile">
                        <div className="input-group required">
                            <span className="input-group-addon">
                                <i className="glyphicon glyphicon-envelope" aria-hidden="true"></i>
                            </span>

                            <input
                                className="form-control emailVote"
                                placeholder="Nhập địa chỉ email của bạn..."
                                name="emailVote"
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChangedEmail}
                            />
                        </div>
                        {errors.email && <div className="validation" ><i className="fa fa-exclamation-triangle"></i>{errors.email}</div>}

                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 col-btn-xs-vote btn-vote-mobile">
                        <span className="input-group-btn js-data-validate">

                            <button onClick={this.formSubmit} disabled={this.state.option === '' ? true : false} className="btn btn-success btn-vote" type="button">Bầu chọn</button>
                        </span>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}
export default FormInputInfo;
