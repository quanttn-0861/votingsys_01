import React, { Component } from "react";
import autoBind from "react-autobind"

class RowComment extends Component {
    constructor(props) {
        super(props);
        autoBind(this)
        this.state = {
        }
    }
    diff_time(date_now, date_create) {

        var diff = (date_now.getTime() - date_create.getTime()) / 1000;
        var diff_seconds = Math.abs(Math.round(diff));
        var diff_minutes = Math.abs(Math.round(diff / 60));
        var diff_hours = Math.abs(Math.round(diff / (60 * 60)));
        var diff_dates = Math.abs(Math.round(diff / (60 * 60 * 24)));
        if (diff_seconds > 60) {
            if (diff_minutes > 60) {
                if (diff_hours > 24) {
                    return diff_dates + ' ' + "ngày trước"
                } return diff_hours + ' ' + "giờ trước"
            } return diff_minutes + ' ' + "phút trước"
        } return diff_seconds + ' ' + "giây trước"
    }
    render() {
        const comment = this.props.comment;
        const date_create = new Date(this.props.comment.created_at);
        const date_now = new Date();
        const diff_time = this.diff_time(date_now, date_create);

        return (
            <React.Fragment>
                <li>
                    <div className="comment-main-level">
                        <div className="comment-avatar">
                            <img src={comment.user !== null ? "/templates/votingsys/img/user/" + comment.user.avatar : "/templates/votingsys/img/user/user-default.png"} alt={comment.name} />
                        </div>
                        <div className="comment-box">
                            <div className="comment-head">
                                <h6 className="comment-name"><a href="#">{comment.name}</a></h6>
                                <span>{diff_time}</span>
                                <i className="fa fa-trash"></i>
                            </div>
                            <div className="comment-content">
                                {comment.content}
                            </div>
                        </div>
                    </div>
                </li>
            </React.Fragment>
        );
    }
}
export default RowComment;
