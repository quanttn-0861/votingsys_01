import React, { Component } from "react";
import autoBind from "react-autobind";

class RowVote extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        const optionId = this.props.participantVote.option_id;
        const participantName = this.props.participantVote.participant.name;
        const participantEmail = this.props.participantVote.participant.email;
        const rowVote = this.props.pollOption.map(function (option) {
            return <React.Fragment key={option.id}>
                <td>{option.id === optionId ? <i className="fa fa-check"></i> : ''}</td>
            </React.Fragment>
        });
        return (
            <React.Fragment>
                <tr>
                    <th className="table-option">
                        <div className="">
                            <a href="#" className="fa fa-pencil"></a>
                            <a href="#" className="fa fa-trash"></a>
                        </div>
                    </th>
                    <td className="table-name">{participantName}</td>
                    <td className="table-name">{participantEmail}</td>
                    {rowVote}
                </tr>
            </React.Fragment >
        );
    }
}
export default RowVote;
