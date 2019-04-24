import React, { Component } from "react";
import autoBind from "react-autobind";

class RowResultModal extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        const optionId = this.props.participantVote.option_id;
        const participantName = this.props.participantVote.participant.name;
        const participantEmail = this.props.participantVote.participant.email;
        const rowResultModal = this.props.pollOption.map(function (option) {
            return <React.Fragment key={option.id}>
                <td>{option.id === optionId ? <i className="fa fa-check"></i> : ''}</td>
            </React.Fragment>
        });
        return (
            <React.Fragment>
                <tr>
                    <td className="table-name" colSpan="2">{participantName}</td>
                    <td className="table-name">{participantEmail}</td>
                    {rowResultModal}

                </tr>
            </React.Fragment >
        );
    }
}
export default RowResultModal;
