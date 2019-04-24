import React, { Component } from "react";
import autoBind from "react-autobind";

class RadioOption extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        const participantVote = this.props.participantVote;
        const pollId = this.props.pollId;
        const pollOption = this.props.pollOption;
        const optionId = this.props.optionId;
        var countStep = 0;
        const avatar_paticipantVoter = participantVote.map(function (participantVote, key) {
            if (participantVote.option.poll_id === pollId && pollOption.id === participantVote.option.id) {
                countStep++
                if (countStep <= 4) {
                    return <div className="avatar-participant" key={key} tooltip={participantVote.participant.name}>
                        <img className="radio-img" src={participantVote.participant.user === null ? "/templates/votingsys/img/user/user-default.png" : "/templates/votingsys/img/user/" + participantVote.participant.user.avatar} />
                    </div>
                }
            }
        })
        const detailParticipantVote = participantVote.map(function (participantVote, key) {
            if (participantVote.option.poll_id === pollId && pollOption.id === participantVote.option.id) {
                return <React.Fragment key={key}>
                    <div className="more-participant-area-div">
                        <img src="/templates/votingsys/img/user/user-default.png" />
                        <div>
                            <span><i className="fa fa-user"></i>&nbsp;<span>{participantVote.participant.name}</span></span><br />
                            <span><i className="fa fa-envelope"></i>&nbsp;<span>{participantVote.participant.email}</span></span>
                        </div>
                    </div>
                    <div className="clear" />
                </React.Fragment>
            }
        })
        if (countStep > 4) {
            var showMoreParticipant = <React.Fragment>
                <div className="avatar-participant more-participant" data-toggle="modal" data-target={"#modalMoreParticipant" + optionId}>
                    <span>+{countStep - 4}</span>
                </div>
                <div className="modal fade" id={"modalMoreParticipant" + optionId} role="dialog">
                    <div className="modal-dialog modal-sm modal-on-votetab">
                        <div className="modal-content">
                            <div className="modal-header">
                                <input type="search" placeholder="Search" />
                            </div>
                            <div className="modal-body">
                                <div className="more-participant-area">
                                    {detailParticipantVote}
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </React.Fragment>
        }
        return (
            <React.Fragment>
                <div className="tab-horizon-div">
                    <label className="radio">
                        <span className="radio-span">
                            <input type="radio"
                                name={'optionOne' + this.props.pollOption.poll_id} value={this.props.pollOption.id}
                                onChange={this.props.handleChangedOption}
                                checked={this.props.option == this.props.pollOption.id ? true : ''}
                            />
                            <span className="radio__circle"></span>&nbsp;<p className="radio__text">{this.props.pollOption.name}</p>
                        </span>
                        <div className="avatar-participant">
                            {avatar_paticipantVoter}
                            {showMoreParticipant}
                        </div>
                    </label>
                </div>

            </React.Fragment  >
        );
    }
}
export default RadioOption;
