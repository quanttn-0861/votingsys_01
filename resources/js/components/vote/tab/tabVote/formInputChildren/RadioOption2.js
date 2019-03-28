import React, { Component } from "react";
import autoBind from "react-autobind";

class RadioOption2 extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return (
            <React.Fragment>
                <td>
                    <label className="radio radio-list">
                        <input type="radio" name="answer2" value={this.props.pollOption.id}
                            onChange={this.props.handleChangedOption}
                            checked={this.props.option == this.props.pollOption.id ? true : ''}
                        />
                        <span className="radio__circle"></span>
                    </label>
                </td>
            </React.Fragment >
        );
    }
}
export default RadioOption2;
