import React, { Component } from "react";
import autoBind from "react-autobind";

class TabVoteChildren extends Component {
    constructor(props) {
        super(props);
        autoBind(this);

    }
    handleClickTabChildren1() {
        this.props.handleClickTabChildren1()
    }
    render() {
        return (
            <React.Fragment>
                <div className="switch-tab">
                    <button className={this.props.tabChildren == 2 ? "btn float-right switch-tab-button-active" : "btn float-right"} onClick={this.props.handleClickTabChildren2}>
                        <i className="fa fa-th-large"></i>
                    </button>
                    <button className={this.props.tabChildren == 1 ? "btn float-right switch-tab-button-active" : "btn float-right"} onClick={this.props.handleClickTabChildren1}>
                        <i className="fa fa-th-list"></i>
                    </button>
                </div>
                <div className="tab-content">
                    <div className={this.props.tabChildren == 1 ? "tab-horizon active-block" : "tab-horizon tab-none"}>
                        <div>
                            <label className="radio">
                                <input type="radio" name="pets" />
                                <span className="radio__circle"></span>&nbsp;<p className="radio__text">Có</p>
                                <img className="radio-img" src="/templates/votingsys/img/user/user-default.png" />
                                <img className="radio-img" src="/templates/votingsys/img/user/user-default.png" />
                            </label>
                        </div>
                        <div>
                            <label className="radio">
                                <input type="radio" name="pets" />
                                <span className="radio__circle"></span>&nbsp;<p className="radio__text">Không</p>
                            </label>
                        </div>
                    </div>
                    <div className={this.props.tabChildren == 2 ? "tab-time active-block" : "tab-time tab-none"}>
                        tab time here
                        </div>

                </div>
            </React.Fragment>
        );
    }
}
export default TabVoteChildren;
