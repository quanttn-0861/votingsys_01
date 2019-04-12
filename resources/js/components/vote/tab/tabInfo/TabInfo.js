import React, { Component } from "react";
import RowComment from './RowComment'
import FormComment from './FormComment'
import axios from 'axios'
import autoBind from "react-autobind"

class TabInfo extends Component {
    constructor(props) {
        super(props);
        autoBind(this)
        this.state = {
            pollId: '',
            pollInfo: [],
            pollOption: [],
            participantVote: [],
            comments: [],
            location: '',
        }
    }
    componentDidMount() {
        axios.get(window.Laravel.baseUrl + '/api/vote')
            .then(response => {
                const { pollInfo, pollId, comments } = response.data;
                const locationStr = pollInfo.location.substr(0, 20);
                this.setState({
                    pollInfo: pollInfo,
                    pollId: pollId,
                    comments: comments,
                    locationStr: locationStr,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    setcomments(data) {
        this.setState({
            comments: data
        })
    }

    handleSubmit(name, content, pollId, newComments) {
        let url = window.Laravel.baseUrl + '/api/comment'
        const data = {
            name: name,
            content: content,
            poll_id: pollId,
        }

        axios.post(url, data)
            .then((response) => {
                console.log(response);

                this.setState({
                    comments: newComments
                })
            })
            .catch(function (error) {
                console.log(error)
            })


    }
    render() {
        const rowComment = this.state.comments.map((comment, key) => {
            return <RowComment key={key} comment={comment} />
        })
        const countComment = this.state.comments.length;

        return (
            <React.Fragment>
                <div className={this.props.tab == 2 ? "tabs-stage-div active-block" : "tabs-stage-div tab-none"}>

                    <p className="tab-voting-title">{this.state.pollInfo.title}</p>
                    <p className="tab-voting-descrip">{this.state.pollInfo.description}</p>
                    <p className="poll-info-not-xs">
                        <span className="span-info label label-success fa fa-time poll-details">
                            <i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp;{this.state.pollInfo.created_at}
                        </span>
                        <span>
                            <i className="fa fa-user" aria-hidden="true"></i>&nbsp;
                            <label className="label-poll-info">{this.state.pollInfo.name}</label>
                        </span>
                        <span className="span-location-poll" tooltip={this.state.pollInfo.location}>
                            <i className="fa fa-map-marker marker-comment" aria-hidden="true"></i>&nbsp;
                            {this.state.locationStr}...
                        </span>
                    </p>
                    <div className="clear" />
                    <div className="comment-area">
                        <div className="comment-area-head">
                            <span>{countComment} bình luận</span>
                        </div>
                        <div className="comment-area-body">
                            <div className="comments-container">
                                <ul id="comments-list" className="comments-list comments-list-content">
                                    {rowComment}
                                </ul>
                                <div className="comment-line" />
                            </div>
                            <br />
                            <FormComment handleSubmit={this.handleSubmit} pollId={this.state.pollId} comments={this.state.comments} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default TabInfo;
