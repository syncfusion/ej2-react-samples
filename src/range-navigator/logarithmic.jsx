/**
 * Sample for Logarithmic Axis Range Navigator
 */
import * as React from "react";
import { Inject, ChartComponent, Logarithmic, StepAreaSeries, StepLineSeries, SeriesCollectionDirective, SeriesDirective, Tooltip, Crosshair, RangeNavigatorComponent, RangenavigatorSeriesCollectionDirective, RangenavigatorSeriesDirective, RangeTooltip } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
export let zoomFactor;
export let zoomPosition;
export let data = [];
export let max = 100;
for (let i = 0; i < 100; i++) {
    data.push({
        x: Math.pow(10, i * 0.1),
        y: Math.floor(Math.random() * (80 - 30 + 1)) + 30
    });
}
export let themes = ['Material', 'Fabric', 'Bootstrap', 'Highcontrast'];
export let borderColor = ['#00bdae', '#4472c4', '#a16ee5', '#79ECE4'];
export let regionColor = ['rgba(0, 189, 174, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(161, 110, 229, 0.3)', 'rgba(121, 236, 228, 0.3)'];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px;
    }
    #title{
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
export class LogarithmicAxis extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                <div className="row" style={{ textAlign: "center" }}>
                        <div id="title">Inflation vs Goods Consumers</div>
                    </div>
                 <div className="row">
                 <RangeNavigatorComponent id='rangenavigator' ref={rangenavigator => this.rangenavigator1 = rangenavigator} style={{ textAlign: "center" }} labelPosition='Outside' valueType='Logarithmic' tooltip={{ enable: true }} interval={1} value={[4, 6]} labelIntersectAction='None' width={Browser.isDevice ? '100%' : '80%'} load={this.rangeLoad.bind(this)} labelRender={this.renderLabel.bind(this)} tooltipRender={this.renderTooltip.bind(this)} changed={this.changed.bind(this)}>
                    <Inject services={[StepLineSeries, Logarithmic, RangeTooltip]}/>
                    <RangenavigatorSeriesCollectionDirective>
                            <RangenavigatorSeriesDirective dataSource={data} xName='x' yName='y' type='StepLine' width={2}>
                            </RangenavigatorSeriesDirective>
                        </RangenavigatorSeriesCollectionDirective>
                    </RangeNavigatorComponent>
                    </div>
                     <div className="row">
                    <ChartComponent id='charts' ref={chart => this.chart1 = chart} style={{ textAlign: "center" }} primaryXAxis={{
            valueType: 'Logarithmic',
            crosshairTooltip: { enable: false },
            interval: 1,
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 },
            title: 'Numers of Goods Consumers'
        }} primaryYAxis={{
            minimum: 0, maximum: 100,
            title: 'Inflation',
            labelFormat: '{value}%',
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 }
        }} width={Browser.isDevice ? '100%' : '80%'} height='350' load={this.chartLoad.bind(this)} chartArea={{ border: { width: 0 } }} crosshair={{
            enable: false,
            lineType: 'Vertical'
        }}>
                        <Inject services={[StepAreaSeries, Logarithmic, Tooltip, Crosshair]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y' border={{ width: 2 }} type='StepArea' animation={{ enable: false }} marker={{ visible: true }} width={2}>
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
                    <div id="action-description">
                        <p>
                            This sample demonstrates rendering logarithmic axis in the range navigator.
                        </p>
                    </div>
                    <div id="description">
                        <p>
                            Logarithmic axis uses logarithmic scale and it is very useful in visualizing when the data has values with both lower order of magnitude (eg: 10^-6) and higher order of magnitude (eg: 10^6).
                            To render Logarithmic axis, set <code>valueType</code> to <code>Logarithmic</code>. 
                            Tooltip is enabled in this example, to see the tooltip in action, while the selected range is changed.
                        </p>
                        <br></br>
                        <p><b>Injecting Module</b></p>
                        <p>
                            The range navigator component features are segregated into individual feature-wise modules. To use logarithmic axis, inject the  <code>Logarithmic</code> module using the
                            <code>RangeNavigator.Inject(Logarithmic)</code> method.
                        </p>
                    </div>
            </div>
        </div>);
    }
    changed(args) {
        if (this.chart1) {
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
    renderLabel(args) {
        args.text = (+args.text).toExponential().toLocaleUpperCase();
    }
    ;
    renderTooltip(args) {
        args.text = [(+(+args.text).toFixed(1)).toExponential(1).toString().toLocaleUpperCase()];
    }
    ;
}
