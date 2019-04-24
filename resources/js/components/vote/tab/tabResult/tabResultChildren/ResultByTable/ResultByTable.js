import React, { Component } from "react";
import autoBind from "react-autobind"
import RowResult from './RowResult'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import RowResultModal from './RowResultModal'

class ResultByTable extends Component {
    constructor(props) {
        super(props);
        autoBind(this)
        this.state = {
            searchString: '',
        }
    }
    handleChangeInput(e) {
        this.setState({
            searchString: e.target.value
        })
    }
    render() {
        let maxCountOption = 0;
        let serialOption = 0;
        const pollId = this.props.pollId;
        const pollOption = this.props.pollOption;
        var participantVote = this.props.participantVote,
            participantVoteModal = this.props.participantVote,
            searchString = this.state.searchString.trim().toLowerCase();
        if (searchString.length > 0) {
            participantVoteModal = participantVoteModal.filter(function (i) {
                return i.participant.name.toLowerCase().match(searchString);
            });
        }
        pollOption.map(function (pollOption) {
            const countByOption = participantVote.filter((countVote) => countVote.option_id === pollOption.id).length;
            if (countByOption > maxCountOption) {
                maxCountOption = countByOption;
            }
        })
        const rowResult = pollOption.map((pollOption, i) => {
            serialOption++;
            const countByOption = participantVote.filter((countVote) => countVote.option_id === pollOption.id).length;
            return <RowResult key={i} serialOption={serialOption} pollOption={pollOption} countByOption={countByOption} maxCountOption={maxCountOption} numerical={i} />
        })

        const nameOption = pollOption.map(function (option) {
            return <React.Fragment key={option.id}>
                <th className="table-optionName">{option.name}</th>
            </React.Fragment>
        });
        const rowResultModal = participantVoteModal.map(function (participantVote) {
            if (participantVote.option.poll_id === pollId) {
                return <RowResultModal key={participantVote.id} participantVote={participantVote} pollOption={pollOption} />
            }
        });
        const countByOption = pollOption.map(function (option) {
            const countByOption = participantVote.filter((countVote) => countVote.option_id === option.id).length;
            return <React.Fragment key={option.id}><th className="table-result">{countByOption}</th></React.Fragment>
        });
        const countParticipantVote = participantVote.filter((countVote) => countVote.option.poll_id === this.props.pollId).length;
        return (
            <React.Fragment>
                <div className={this.props.tabResult === "tab-table" ? "tab-result-table" : "tab-result-table tab-none"}>
                    <a className="btn10" data-toggle="modal" data-target="#resultModal">
                        <i className="fa fa-eye"></i>
                        <span>Xem chi tiết bầu chọn</span>
                        <div className="transition"></div>
                    </a>
                    <div className="modal fade" id="resultModal" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <input type="search" placeholder="Search" value={this.state.searchString} onChange={this.handleChangeInput} />
                                </div>
                                <div className="modal-body">
                                    <table className="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr className="table-head">
                                                <th colSpan="3" style={{ "textAlign": "center" }}> {countParticipantVote} Người bầu chọn</th>
                                                {countByOption}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="table-head">
                                                <td className="table-name bold" colSpan="2">Tên</td>
                                                <td className="table-name bold">Email</td>
                                                {nameOption}
                                            </tr>
                                            {rowResultModal}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table-result">
                        <div className="table-result-head">
                            <div className="cell-table">
                                STT
                            </div>
                            <div className="cell-table">
                                Tùy chọn
                            </div>
                            <div className="cell-table">
                                Số lượng
                            </div>
                            <div className="cell-table">

                            </div>
                        </div>
                        <div className="clear" />
                        <ReactCSSTransitionGroup
                            className="body-table"
                            transitionName="example"
                            transitionAppear={true}
                            transitionAppearTimeout={300}
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}
                        >
                            {rowResult}
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}
export default ResultByTable;
