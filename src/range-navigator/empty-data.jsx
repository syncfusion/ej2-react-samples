/**
 * Sample for Range Navigator Print
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, AreaSeries, RangenavigatorSeriesCollectionDirective, RangenavigatorSeriesDirective, RangeNavigatorComponent, RangeTooltip, Inject, DateTime, Tooltip } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { chartData } from './stock-data';
export let zoomFactor;
export let zoomPosition;
export let stockData = [];
export let startDate = new Date(2012, 4, 2);
for (let i = 0; i <= 250; i++) {
    stockData.push(chartData[i]);
    if (i > 45 && 50 > i) {
        stockData[i].open = null;
    }
    else if (i > 95 && 100 > i) {
        stockData[i].open = null;
    }
    else if (i > 145 && 150 > i) {
        stockData[i].open = null;
    }
    else if (i > 195 && 200 > i) {
        stockData[i].open = null;
    }
    else if (i > 245 && 250 > i) {
        stockData[i].open = null;
    }
}
export let themes = ['Material', 'Fabric', 'Bootstrap', 'Highcontrast'];
export let borderColor = ['#00bdae', '#4472c4', '#a16ee5', '#79ECE4'];
export let regionColor = ['rgba(0, 189, 174, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(161, 110, 229, 0.3)', 'rgba(121, 236, 228, 0.3)'];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px;
    }
    #days {
        font-size: 15px;
        font-style: normal;
        font-family: "Segoe UI";
        font-weight: 500;
        text-anchor: middle;
        transform: none;
        opacity: 1;
    }
    #control-container {
        padding: 0px !important;
    }

    #material-gradient-chart stop {
        stop-color: #00bdae;
    }

    #fabric-gradient-chart stop {
        stop-color: #4472c4;
    }

    #bootstrap-gradient-chart stop {
        stop-color: #a16ee5;
    }

    #bootstrap4-gradient-chart stop {
        stop-color: #a16ee5;
    }

    #highcontrast-gradient-chart stop {
        stop-color: #79ECE4;
    }

    .chart-gradient stop[offset="0"] {
        stop-opacity: 0.9;
    }

    .chart-gradient stop[offset="1"] {
        stop-opacity: 0.3;
    }
`;
export class EmptyData extends SampleBase {
    constructor() {
        super(...arguments);
        this.chartRendered = false;
    }
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                <div className="row" style={{ textAlign: "center" }}>
                <div id="days">AAPL 2012-17</div>
                </div>
                <div className="row">
                    <RangeNavigatorComponent id='rangenavigator' ref={rangenav => this.rangeInstance = rangenav} style={{ textAlign: "center" }} labelPosition='Outside' valueType='DateTime' majorTickLines={{
            width: 0
        }} majorGridLines={{
            width: 0
        }} tooltip={{ enable: true, displayMode: 'Always' }} value={[new Date('2013-12-27'), new Date('2015-03-23')]} width={Browser.isDevice ? '100%' : '80%'} load={this.rangeLoad.bind(this)} changed={this.changed.bind(this)}>
                        <Inject services={[AreaSeries, RangeTooltip, DateTime]}/>
                        <RangenavigatorSeriesCollectionDirective>
                            <RangenavigatorSeriesDirective dataSource={stockData} xName='x' yName='open' type='Area' width={2}>
                            </RangenavigatorSeriesDirective>
                        </RangenavigatorSeriesCollectionDirective>
                    </RangeNavigatorComponent>
                    </div>
                <div className="row">
                    <ChartComponent id='charts' ref={chart => this.chartInstance = chart} style={{ textAlign: "center" }} primaryXAxis={{
            valueType: 'DateTime',
            crosshairTooltip: { enable: true },
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 }
        }} primaryYAxis={{
            labelFormat: '${value}',
            minimum: 40,
            maximum: 140,
            interval: 20,
            majorTickLines: { width: 0 }, lineStyle: { width: 0 }
        }} width={Browser.isDevice ? '100%' : '80%'} load={this.chartLoad.bind(this)} height='350' chartArea={{ border: { width: 0 } }} tooltip={{
            enable: true, shared: true
        }}>
                        <Inject services={[AreaSeries, DateTime, Tooltip]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={stockData} xName='x' yName='open' animation={{ enable: false }} border={{ width: 2 }} type='Area' width={2} name='AAPL'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                </div>
                <svg style={{ height: '0' }}>
                <defs>
                    <linearGradient id="material-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="fabric-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap4-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="highcontrast-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                </defs>
            </svg>
                <div id="action-description">
                    <p>
                        This sample illustrates the functionality of empty points in the range navigator series.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render empty points in range navigator. Tooltip is enabled in this example, to see the tooltip in action, while the selected range is changed.
                    </p>
                </div>
            </div>);
    }
    changed(args) {
        if (this.chartInstance && this.chartRendered) {
            this.chartInstance.primaryXAxis.zoomFactor = args.zoomFactor;
            this.chartInstance.primaryXAxis.zoomPosition = args.zoomPosition;
            this.chartInstance.dataBind();
        }
        else {
            zoomFactor = args.zoomFactor;
            zoomPosition = args.zoomPosition;
        }
    }
    ;
}
