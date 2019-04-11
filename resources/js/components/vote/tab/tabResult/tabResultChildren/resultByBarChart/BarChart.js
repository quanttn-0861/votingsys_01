import React, { Component } from "react";
import autoBind from "react-autobind"
import Highcharts from 'highcharts';

class BarChart extends Component {
    constructor(props) {
        super(props);
        autoBind(this)
        this.state = {
            data: []
        }
    }
    componentDidUpdate(oldProps) {
        const newProps = this.props
        if (oldProps.arrOptionBarCharts !== newProps.arrOptionBarCharts) {
            this.setState({ data: newProps.arrOptionBarCharts })
        }
        this.highChartsRender();
    }
    highChartsRender() {
        Highcharts.chart('barChart', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Thống kê kết quả bầu chọn'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Tổng số lượt vote'
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
            },

            "series": [
                {
                    "name": "Poll",
                    "colorByPoint": true,
                    "data": this.state.data
                }
            ]
        });
    }
    render() {
        return (
            <div id="barChart" className={this.props.tabResult === "tab-barChart" ? "chart tab-result-barChart" : "chart tab-result-barChart tab-none"}>
            </div>
        );
    }
}
export default BarChart;
