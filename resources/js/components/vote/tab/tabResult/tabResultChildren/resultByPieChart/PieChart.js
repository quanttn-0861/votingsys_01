import React, { Component } from "react";
import autoBind from "react-autobind"
import Highcharts from 'highcharts';
import axios from 'axios'

class PieChart extends Component {
    constructor(props) {
        super(props);
        autoBind(this)
        this.state = {
            data: []
        }
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if (oldProps.arrOptionPieCharts !== newProps.arrOptionPieCharts) {
            this.setState({ data: newProps.arrOptionPieCharts })
        }
        this.highChartsRender();
    }

    highChartsRender() {
        Highcharts.chart('pieChart', {
            chart: {
                plotBackgroundColor: '#FAFAFA',
                plotBorderWidth: null,
                plotShadow: true,
                type: 'pie'
            },
            title: {
                text: 'Thống kê kết quả bầu chọn'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Vote',
                colorByPoint: true,
                data: this.state.data
            }]
        });
    }

    render() {
        return (
            <div id="pieChart" className={this.props.tabResult === "tab-pieChart" ? "chart tab-result-pieChart" : "chart tab-result-pieChart tab-none"}>
            </div>
        );
    }
}
export default PieChart;
