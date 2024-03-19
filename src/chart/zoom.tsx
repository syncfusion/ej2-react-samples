/**
 * Sample for Zooming in chart
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    SplineAreaSeries, DateTime, Legend, Zoom, ILoadedEventArgs, ChartTheme, ScrollBar
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

const SAMPLE_CSS = `
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

        #tailwind-gradient-chart stop {
            stop-color: #5A61F6;
        }

        #bootstrap5-gradient-chart stop {
            stop-color: #262E0B;
        }

        #material-dark-gradient-chart stop {
            stop-color: #9ECB08;
        }

        #fabric-dark-gradient-chart stop {
            stop-color: #4472c4;
        }

        #bootstrap-dark-gradient-chart stop {
            stop-color: #a16ee5;
        }

        #tailwind-dark-gradient-chart stop {
            stop-color: #8B5CF6;
        }

        #bootstrap5-dark-gradient-chart stop {
            stop-color: #5ECB9B;
        }

        #fluent-gradient-chart stop {
            stop-color: #614570;
        }

        #fluent-dark-gradient-chart stop {
            stop-color: #8AB113;
        }

        #material3-gradient-chart stop {
            stop-color: #6355C7;
        }
    
        #material3-dark-gradient-chart stop {
            stop-color: #4EAAFF;
        }

        .chart-gradient stop[offset="0"] {
            stop-opacity: 0.75;
        }

        .chart-gradient stop[offset="1"] {
            stop-opacity: 0;
        }
        `;
export function GetZoomingData(): any {
    let series1: Object[] = [];
    let point1: Object;
    let value: number = 80;
    let i: number;
    for (i = 1; i < 500; i++) {
        if (Math.random() > .5) {
            value += Math.random();
        } else {
            value -= Math.random();
        }
        point1 = { x: new Date(1960, i + 1, i), y: Math.round(value) };
        series1.push(point1);
    }
    return { 'series1': series1 };
}
export let data: any[] = GetZoomingData().series1;
let themes: string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark'];
let borderColor: string[] = ['#262E0B', '#5ECB9B', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#614570', '#8AB113', '#6355C7', '#4EAAFF'];

export class Zooming extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'DateTime', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 } }} load={this.load.bind(this)} primaryYAxis={{ title: 'Profit ($)', rangePadding: 'None', lineStyle: { width: 0 }, labelFormat: "${value}k", majorTickLines: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} chartArea={{ border: { width: 0 } }} legendSettings={{ visible: false }} zoomSettings={{ enableMouseWheelZooming: true, enablePinchZooming: true, enableSelectionZooming: true, mode: 'X', showToolbar: true }} title='Sales History of Product X' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[SplineAreaSeries, DateTime, Legend, Zoom, ScrollBar]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y' name='Product X' border={{ width: 2 }} animation={{ enable: false }} type='SplineArea' />
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
                        <linearGradient id="tailwind-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="bootstrap5-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="material-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fabric-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="bootstrap-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="tailwind-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="bootstrap5-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fluent-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fluent-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="material3-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="material3-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                    </defs>
                </svg>
                <div id="action-description">
                    <p>This sample demonstrates the zooming and panning features of the charts.</p>
                </div>
                <div id="description">
                    <p>This sample shows the following zooming and panning behaviors.</p>
                    <ul>
                        <li>Click and drag the mouse on a chart area to enable selection zooming.</li>
                        <li>Hover the mouse on the toolbar at the top right corner of chart area to switch between zooming and panning.</li>
                        <li>Pinch in and pinch out the chart area to zoom in or zoom out the chart in touch enabled devices.</li>
                        <li>Touch and drag to pan the chart.</li>
                        <li>Double tap to reset the zoomed chart.</li>
                    </ul>
                    <p>Chart component supports four types of zooming which can be set using <code>enableSelectionZooming</code>, <code>enablePinchZooming</code>, <code>enableMouseWheelZooming</code>, <code>enableDeferredZooming</code> property.</p>
                    <p>
                        Chart supports two mode of zooming which can be set using
                        <code><a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-zoomSettings.html#mode-string">mode</a></code> property.
                    </p>
                    <ul>
                        <li><code>XY</code> - Zoom the chart with respect to both the axis.</li>
                        <li><code>X</code> - Zoom the chart with respect to horizontal axis.</li>
                        <li><code>Y</code> - Zoom the chart with respect to vertical axis.</li>
                    </ul>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use zooming, we need to inject
                        <code>Zoom</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the Zooming can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/zooming/">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');

    };
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
        args.chart.series[0].fill = 'url(#' + selectedTheme.toLowerCase() + '-gradient-chart)';
        args.chart.series[0].border.color = borderColor[themes.indexOf(args.chart.theme.toLowerCase())];
    };
        
}