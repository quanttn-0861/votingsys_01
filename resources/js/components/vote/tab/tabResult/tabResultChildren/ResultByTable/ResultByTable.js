import React, { Component } from "react";
import autoBind from "react-autobind"
import RowResult from './RowResult'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ResultByTable extends Component {
    constructor(props) {
        super(props);
        autoBind(this)
    }
    render() {
        let maxCountOption = 0;
        let serialOption = 0;
        const participantVote = this.props.participantVote;
        this.props.pollOption.map(function (pollOption) {
            const countByOption = participantVote.filter((countVote) => countVote.option_id === pollOption.id).length;
            if (countByOption > maxCountOption) {
                maxCountOption = countByOption;
            }
        })
        const rowResult = this.props.pollOption.map((pollOption, i) => {
            serialOption++;
            const countByOption = participantVote.filter((countVote) => countVote.option_id === pollOption.id).length;
            return <RowResult key={i} serialOption={serialOption} pollOption={pollOption} countByOption={countByOption} maxCountOption={maxCountOption} numerical={i} />
        })

        return (
            <React.Fragment>
                <div className={this.props.tabResult === "tab-table" ? "tab-result-table" : "tab-result-table tab-none"}>
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
