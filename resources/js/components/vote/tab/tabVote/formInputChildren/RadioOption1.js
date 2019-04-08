import React, { Component } from "react";
import autoBind from "react-autobind";

class RadioOption1 extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <label className="radio">
                        <input type="radio"
                            name={'optionOne' + this.props.pollOption.poll_id} value={this.props.pollOption.id}
                            onChange={this.props.handleChangedOption}
                            checked={this.props.option == this.props.pollOption.id ? true : ''}
                        />
                        <span className="radio__circle"></span>&nbsp;<p className="radio__text">{this.props.pollOption.name}</p>
                        {/* <img className="radio-img" src="/templates/votingsys/img/user/user-default.png" /> */}
                    </label>
                </div>
            </React.Fragment >
        );
    }
}
export default RadioOption1;
