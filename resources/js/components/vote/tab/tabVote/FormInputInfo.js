import React, { Component } from "react";
import autoBind from "react-autobind";
import Validator from '../../../utils/validator'
import RowVote from './RowVote'
import RadioOption2 from './formInputChildren/RadioOption2'
import RadioOption1 from './formInputChildren/RadioOption1'

class FormInputInfo extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            name: '',
            email: '',
            option: '',
            errors: {},
            count: 0,
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
    handleInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        const email = e.target.email;

        this.setState({
            [name]: value,
            [email]: value,
        });
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
        const option = this.state.option;
        const pollId = this.props.pollId;
        const pollOption = this.props.pollOption;
        const participantVote = this.props.participantVote;
        const handleChangedOption = this.handleChangedOption;
        const nameOption = this.props.pollOption.map(function (option) {
            return <React.Fragment key={option.id}>
                <th className="table-optionName">{option.name}</th>
            </React.Fragment>
        });
        const rowVote = this.props.participantVote.map(function (participantVote) {
            if (participantVote.option.poll_id === pollId) {
                return <RowVote key={participantVote.id} participantVote={participantVote} pollOption={pollOption} />
            }
        });
        const countByOption = this.props.pollOption.map(function (option) {
            const countByOption = participantVote.filter((countVote) => countVote.option_id === option.id).length;
            return <React.Fragment key={option.id}><th className="table-result">{countByOption}</th></React.Fragment>
        });
        const radioOption2 = this.props.pollOption.map(function (pollOption) {
            return <RadioOption2 key={pollOption.id} pollOption={pollOption} option={option} handleChangedOption={handleChangedOption} />
        });
        const radioOption1 = this.props.pollOption.map(function (pollOption) {
            return <RadioOption1 key={pollOption.id} pollOption={pollOption} option={option} handleChangedOption={handleChangedOption} />
        })
        const countParticipantVote = this.props.participantVote.filter((countVote) => countVote.option.poll_id === this.props.pollId).length;

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
                        {radioOption1}
                    </div>
                    <div className={this.props.tabChildren == 2 ? "tab-time active-block" : "tab-time tab-none"}>
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr className="table-head">
                                    <th colSpan="3"> {countParticipantVote} Người bầu chọn</th>
                                    {countByOption}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="table-head">
                                    <th className="table-option"></th>
                                    <td className="table-name bold">Tên</td>
                                    <td className="table-name bold">Email</td>
                                    {nameOption}
                                </tr>
                                {rowVote}
                                <tr>
                                    <th className="table-option">
                                    </th>
                                    <td></td>
                                    <td></td>
                                    {radioOption2}
                                </tr>
                            </tbody>
                        </table>
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
                                name="name"
                                type="text"
                                value={this.state.name}
                                onChange={this.handleInputChange}

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
                                name="email"
                                type="email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
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
