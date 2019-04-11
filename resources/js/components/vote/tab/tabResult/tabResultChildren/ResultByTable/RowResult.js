import React, { Component } from "react";
import autoBind from "react-autobind"

class ResultByTable extends Component {
    constructor(props) {
        super(props);
        autoBind(this)
    }

    render() {
        return (
            <React.Fragment>
                <div className={this.props.numerical % 2 === 0 ? "cell-table-big" : "cell-table-big background-gray"} style={{ "transitionDelay": `${this.props.numerical * .01}s` }} key={this.props.numerical}>
                    <div className="cell-table">
                        {this.props.serialOption}
                    </div>
                    <div className="cell-table">
                        {this.props.pollOption.name}
                    </div>
                    <div className="cell-table">
                        <span className="badge">{this.props.countByOption}</span>
                    </div>
                    <div className="cell-table">
                        {this.props.maxCountOption === this.props.countByOption ? <img src="/templates/votingsys/img/icon-medal.png" width="40px" /> : ""}
                    </div>
                </div>
                <div className="clear" />
            </React.Fragment >
        );
    }
}
export default ResultByTable;
