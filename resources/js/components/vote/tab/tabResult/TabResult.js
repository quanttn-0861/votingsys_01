import React, { Component } from "react";
import autoBind from "react-autobind"
import axios from 'axios'
import ResultByTable from './tabResultChildren/ResultByTable/ResultByTable'
import PieChart from './tabResultChildren/resultByPieChart/PieChart'
import BarChart from './tabResultChildren/resultByBarChart/BarChart'

class TabResult extends Component {
    constructor(props) {
        super(props);
        autoBind(this)
        this.state = {
            tabResult: "tab-table",
            pollId: '',
            pollInfo: [],
            pollOption: [],
            pollOptionFake: [],
            participantVote: [],
        }
    }
    componentDidMount() {
        axios.get(window.Laravel.baseUrl + '/api/vote')
            .then(response => {
                const { pollInfo, pollOption, participantVote, pollId } = response.data;
                this.setState({
                    pollInfo: pollInfo,
                    pollOptionFake: pollOption,
                    participantVote: participantVote,
                    pollId: pollId,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    componentDidUpdate(oldProps) {
        const newProps = this.props
        const pollOptionFake = this.state.pollOptionFake
        if (oldProps.tab !== newProps.tab) {
            this.setState({ pollOption: pollOptionFake })
        }
    }
    handleClickTabResult1() {
        const pollOptionFake = this.state.pollOptionFake
        this.setState({
            tabResult: "tab-table",
            pollOption: pollOptionFake
        })
    }
    handleClickTabResult2() {
        this.setState({
            tabResult: "tab-barChart",
            pollOption: [],
        })
    }
    handleClickTabResult3() {
        this.setState({
            tabResult: "tab-pieChart",
            pollOption: [],
        })
    }

    render() {
        let sumOption = 0;
        let arrOptionPieCharts = [];
        let arrOptionBarCharts = [];
        const participantVote = this.state.participantVote;
        this.state.pollOptionFake.map(function (pollOption) {
            const countByOption = participantVote.filter((countVote) => countVote.option_id === pollOption.id).length;
            sumOption = sumOption + countByOption;
        });
        this.state.pollOptionFake.map(function (pollOption) {
            const countByOption = participantVote.filter((countVote) => countVote.option_id === pollOption.id).length;
            arrOptionPieCharts.push({ name: pollOption.name, y: (countByOption / sumOption * 100) })
            arrOptionBarCharts.push({ name: pollOption.name, y: countByOption })
        });

        return (
            <React.Fragment>
                <div className={this.props.tab == 3 ? "tabs-stage-div active-block" : "tabs-stage-div tab-none"}>
                    <div className="switch-tab float-left">
                        <button className={this.state.tabResult == "tab-pieChart" ? "btn float-right switch-tab-button-active" : "btn float-right"} onClick={this.handleClickTabResult3}>
                            <i className="fa fa-pie-chart"></i>
                        </button>
                        <button className={this.state.tabResult == "tab-barChart" ? "btn float-right switch-tab-button-active" : "btn float-right"} onClick={this.handleClickTabResult2}>
                            <i className="fa fa-bar-chart"></i>
                        </button>
                        <button id="button-tab-table" className={this.state.tabResult == "tab-table" ? "btn float-right switch-tab-button-active" : "btn float-right"} onClick={this.handleClickTabResult1}>
                            <i className="fa fa-table"></i>
                        </button>
                    </div>
                    <div className="clear" />
                    <div>
                        <ResultByTable
                            tabResult={this.state.tabResult}
                            handleClickTabResult1={this.handleClickTabResult1}
                            pollOption={this.state.pollOption}
                            participantVote={this.state.participantVote}
                            pollId={this.state.pollId}
                        />
                        <BarChart
                            tabResult={this.state.tabResult}
                            arrOptionBarCharts={arrOptionBarCharts}
                        />
                        <PieChart
                            tabResult={this.state.tabResult}
                            arrOptionPieCharts={arrOptionPieCharts}
                        />
                    </div>
                </div>
            </React.Fragment >
        );
    }
}
export default TabResult;
