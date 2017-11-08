/**
 * Zooming and Panning sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    AreaSeries, DateTime, Legend, Zoom, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

const SAMPLE_CSS = `
    #gradient-chart stop {
		stop-color: #BDEDE9;
	}
	#gradient-chart stop[offset="0"] {
		stop-opacity: 0.75;
	}
	#gradient-chart stop[offset="1"] {
		stop-opacity: 0;
	}`;
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
        point1 = { x: new Date(1950, i + 2, i), y: value.toFixed(1) };
        series1.push(point1);
    }
    return { 'series1': series1 };
}
export let data: any[] = GetZoomingData().series1;

export class Zooming extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            title: 'Years',
                            valueType: 'DateTime',
                            skeleton: 'yMMM',
                            edgeLabelPlacement: 'Shift',
                            majorGridLines: { width: 0 }
                        }}
                        load={this.load.bind(this)}
                        primaryYAxis={{
                            title: 'Profit ($)',
                            rangePadding: 'None',
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 }
                        }}
                        width={Browser.isDevice ? '100%' : '80%'}
                        chartArea={{ border: { width: 0 } }}
                        legendSettings={{ visible: false }}
                        zoomSettings={{
                            enableMouseWheelZooming: true, enablePinchZooming: true,
                            enableSelectionZooming: true, mode: 'X'
                        }}
                        title='Sales History of Product X' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[AreaSeries, DateTime, Legend, Zoom]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y' name='Product X' border={{ width: 0.5, color: '#00bdae' }}
                                animation={{ enable: false }} fill='url(#gradient-chart)' type='Area'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <svg style={{ height: '0' }}>
                    <defs>
                        <linearGradient id="gradient-chart" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0" />
                            <stop offset="1" />
                        </linearGradient>
                    </defs>
                </svg>
                <div id="action-description">
                    <p>
                        This sample demonstrates zooming feature in chart. You can pinch on chart or by using mouse scroll, zooming on a chart can be performed.
                    </p>
                </div>
                <div id="description">
                    <p>This sample demonstrates the zooming and panning behavior in chart.</p>
                    <ul>
                        <li>Click and drag the mouse on a chart area to enable selection zooming.</li>
                        <li>Hover the mouse on the toolbar at the top right corner of chart area to switch between zooming and panning.</li>
                        <li>Pinch in and pinch out the chart area to zoom in or zoom out the chart in touch enabled devices.</li>
                        <li>Touch and drag to pan the chart.</li>
                        <li>Double tap to reset the zoomed chart.</li>
                    </ul>
                    <p>Chart component supports four types of zooming which can be set using <code>enableSelectionZooming</code>, <code>enablePinchZooming</code>, <code>enableMouseWheelZooming</code>, <code>enableDeferredZooming</code> property.</p>
                    <p>Chart supports two mode of zooming which can be set using
                        <code><a target="_blank"
                            href="http://ej2.syncfusion.com/react/documentation/chart/api-zoomSettings.html#mode-string">mode</a></code> property.
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
                        More information on the Zooming can be found in this &nbsp;
                        <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-zoomSettings.html#properties">documentation section</a>.
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
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    };
}