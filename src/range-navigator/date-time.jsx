/**
 * Sample for DateTime Axis Range Navigator
 */
import * as React from "react";
import { RangeNavigatorComponent, AreaSeries, DateTime, Crosshair, Inject, SeriesCollectionDirective, SeriesDirective, RangeTooltip, RangenavigatorSeriesCollectionDirective, RangenavigatorSeriesDirective, ChartComponent, ChartAnnotation, SplineSeries, Tooltip } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { stockData } from './stock-data';
import { SampleBase } from '../common/sample-base';
export let zoomFactor;
export let zoomPosition;
export let themes = ['Material', 'Fabric', 'Bootstrap', 'Highcontrast'];
export let borderColor = ['#00bdae', '#4472c4', '#a16ee5', '#79ECE4'];
export let regionColor = ['rgba(0, 189, 174, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(161, 110, 229, 0.3)', 'rgba(121, 236, 228, 0.3)'];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
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
export class DateTimeAxis extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                <div className="row" style={{ textAlign: "center" }}>
                    <div id="days">EUR Exchange Rate from USD</div>
                </div>
                 <div className="row">
                    <RangeNavigatorComponent id='rangenavigator' ref={rangenavigator => this.rangenavigator1 = rangenavigator} style={{ textAlign: "center" }} labelPosition='Outside' valueType='DateTime' majorTickLines={{
            width: 0
        }} tooltip={{ enable: true, format: 'yyyy/MM/dd', displayMode: 'Always' }} value={[new Date('2011-01-01'), new Date('2013-12-31')]} width={Browser.isDevice ? '100%' : '80%'} load={this.rangeLoad.bind(this)} changed={this.changed.bind(this)}>
                        <Inject services={[AreaSeries, DateTime, RangeTooltip]}/>
                        <RangenavigatorSeriesCollectionDirective>
                            <RangenavigatorSeriesDirective dataSource={stockData} xName='x' yName='y' type='Area' width={2} animation={{ enable: false }} border={{ width: 2 }}>
                            </RangenavigatorSeriesDirective>
                        </RangenavigatorSeriesCollectionDirective>
                    </RangeNavigatorComponent>
                    </div>
                <div className="row">
                    <ChartComponent id='charts' ref={chart => this.chart1 = chart} style={{ textAlign: "center" }} primaryXAxis={{
            valueType: 'DateTime',
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 }
        }} primaryYAxis={{
            labelFormat: 'n1',
            minimum: 0.6,
            maximum: 1,
            interval: 0.1,
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 }
        }} width={Browser.isDevice ? '100%' : '80%'} axisLabelRender={this.labelRender.bind(this)} load={this.chartLoad.bind(this)} height='350' chartArea={{ border: { width: 0 } }} tooltip={{
            enable: true, shared: true
        }} crosshair={{
            enable: false,
            lineType: 'None'
        }}>
                        <Inject services={[Crosshair, DateTime, SplineSeries, Tooltip, ChartAnnotation]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective name='Rate' type='Spline' dataSource={stockData} xName='x' yName='y' width={2}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
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
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes rendering of date-time in the range navigator with exchange rate analysis of EUR to USD.
                    </p>
                </div>
                <div id="description">
                    <p>
                        Date-time data is used in this sample, and the selected range values are showed with tooltip. 
                        Date-time axis uses date-time scale and displays date-time values as axis labels. 
                        To render date-time axis, set the <code>valueType</code> to <code>DateTime</code>. 
                        Format of the axis label will be calculated based on the intervalType of the range navigator. 
                        You can also directly set the format using the labelFormat property. 
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                    The range navigator component features are segregated into individual feature-wise modules. To use area series, inject the
                        <code>AreaSeries</code> module using
                        <code>RangeNavigator.Inject(AreaSeries)</code> method. To use date time axis, inject the
                        <code>DateTime</code> module using
                        <code>RangeNavigator.Inject(DateTime)</code> method.
                    </p>
                </div>
            </div>);
    }
    changed(args) {
        if (this.chart1 && this.chartRendered) {
            this.chart1.primaryXAxis.zoomFactor = args.zoomFactor;
            this.chart1.primaryXAxis.zoomPosition = args.zoomPosition;
            this.chart1.dataBind();
        }
        else {
            zoomFactor = args.zoomFactor;
            zoomPosition = args.zoomPosition;
        }
    }
    ;
    labelRender(args) {
        if (args.axis.name === 'primaryYAxis') {
            args.text = '€' + args.text;
        }
    }
    chartLoad(args) {
        args.chart.primaryXAxis.zoomFactor = zoomFactor;
        args.chart.primaryXAxis.zoomPosition = zoomPosition;
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
        this.chartRendered = true;
    }
    ;
    rangeLoad(args) {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
        let rangeTheme = args.rangeNavigator.theme;
        args.rangeNavigator.series[0].type = "Area";
        args.rangeNavigator.series[0].fill = 'url(#' + rangeTheme.toLowerCase() + '-gradient-chart)';
        args.rangeNavigator.series[0].border.color = borderColor[themes.indexOf(rangeTheme)];
    }
    ;
}
