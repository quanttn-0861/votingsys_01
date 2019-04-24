import React, { Component } from "react";
import autoBind from "react-autobind";
import RadioOption from './RadioOption'
import SimpleReactValidator from 'simple-react-validator';

class FormInputInfo extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            name: '',
            email: '',
            option: '',
            count: 0,

        };
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Vui lòng nhập :attribute của bạn !',
                email: 'Email không đúng định dạng.',
            },
        });
    }

    handleInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        const email = e.target.email;

        this.setState({
            [name]: value,
            [email]: value,
        });
    }

    handleChangedOption(e) {
        this.setState({
            option: e.target.value,
        })
    }
    formSubmit() {
        if (this.validator.allValid()) {
            this.props.handleSubmit(this.state.name, this.state.email, this.state.option)
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }

    }

    render() {
        const participantVote = this.props.participantVote;
        const pollId = this.props.pollId;
        const option = this.state.option;
        const handleChangedOption = this.handleChangedOption;
        const radioOption = this.props.pollOption.map(function (pollOption) {
            return <RadioOption
                key={pollOption.id}
                pollOption={pollOption}
                optionId={pollOption.id}
                pollId={pollId} option={option}
                participantVote={participantVote}
                handleChangedOption={handleChangedOption} />
        })

        return (
            <React.Fragment>
                <div className="tab-content">
                    <div className={this.props.tabChildren == 1 ? "tab-horizon active-block" : "tab-horizon tab-none"}>
                        {radioOption}
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
                        {<div className="validation">{this.validator.message('tên', this.state.name, 'required')}</div>}

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
                        {<div className="validation">{this.validator.message('email', this.state.email, 'required|email')}</div>}
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
