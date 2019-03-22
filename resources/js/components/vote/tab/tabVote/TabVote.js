import React, { Component } from "react";
import autoBind from "react-autobind";
import FormInputInfo from './FormInputInfo'
import axios from 'axios'
import history from '../../../history'

class TabVote extends Component {
    constructor(props) {
        super(props);
        autoBind(this);

    }
    handleClickTabChildren1() {
        this.props.handleClickTabChildren1()
    }
    handleSubmit(name, email, option) {
        let url = window.Laravel.baseUrl + '/vote'
        const data = {
            name: name,
            email: email,
            option: option
        }
        axios.post(url, data)
            .then(response => {
                console.log(response)
                alert('Vote Success!')
                // history.push('/link-poll')
            })
            .catch(function (error) {
                console.log(error.response)
            })

    }
    render() {
        return (
            <React.Fragment>
                <div className={this.props.tab == 1 ? "tabs-stage-div active-block" : "tabs-stage-div tab-none"}>
                    <p className="tab-voting-title">title here</p>
                    <p className="tab-voting-descrip">description here</p>
                    <label className="poll-count poll-count-mobile">
                        <span className="label label-primary fa fa-user poll-details">
                            <span className="count-participant"> 0</span>
                        </span>
                        <span className="label label-info fa fa-comment poll-details">
                            <span className="comment-count"> 0</span>
                        </span>
                        <span className="label label-success fa fa-time poll-details">
                            2019-03-20 14:29:07
                                </span>
                        <span className="span-date-close span-date-close-mobile poll-details2" data-placement="top" data-toggle="tooltip" title="" data-original-title="Thời gian đóng bầu chọn">
                            Thời gian đóng bầu chọn: <i>21-03-2019 14:28</i>
                        </span>
                    </label>

                    <FormInputInfo
                        handleSubmit={this.handleSubmit}
                        tabChildren={this.props.tabChildren}
                        handleClickTabChildren2={this.props.handleClickTabChildren2}
                        handleClickTabChildren1={this.props.handleClickTabChildren1}
                    />
                </div>
            </React.Fragment>
        );
    }
}
export default TabVote;
