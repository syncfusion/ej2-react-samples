/**
 * Sample for Circular 3D Chart with legend.
 */
import * as React from "react";
import {
    PieSeries3D, CircularChartDataLabel3D, CircularChartLegend3D, CircularChartTooltip3D, CircularChartHighlight3D, CircularChart3DLoadedEventArgs, CircularChart3DTheme, CircularChart3DComponent, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, Inject
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let data1 = [
    { 'x': 'Chrome', y: 62.92, text: '62.92%' },
    { 'x': 'Internet Explorer', y: 6.12, text: '6.12%' },
    { 'x': 'Opera', y: 3.15, text: '3.15%' },
    { 'x': 'Edge', y: 5.5, text: '5.5%' },
    { 'x': 'Safari', y: 19.97, text: '19.97%' },
    { 'x': 'Others', y: 2.34, text: '2.34%' }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Circular 3D Chart with legend.
 */
export class PieWithLegend extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div>
                        <CircularChart3DComponent id='charts' style={{ textAlign: "center" }} legendSettings={{
                            visible: true,
                            enableHighlight: true,
                            position: Browser.isDevice ? 'Bottom' : 'Right',
                        }} load={this.load.bind(this)} highlightMode='Point' title='Browser Market Shares in November 2023' loaded={this.onChartLoad.bind(this)} rotation={15} tilt={-15} tooltip={{ enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>', header: "" }}>
                            <Inject services={[PieSeries3D, CircularChartDataLabel3D, CircularChartLegend3D, CircularChartTooltip3D, CircularChartHighlight3D]} />
                            <CircularChart3DSeriesCollectionDirective>
                                <CircularChart3DSeriesDirective dataSource={data1} xName='x' yName='y' innerRadius='55%' radius='75%' dataLabel={{
                                    visible: true, position: 'Inside', enableRotation: true,
                                    font: { fontWeight: '600' }, name: 'text', connectorStyle: { length: '20px' }
                                }}>
                                </CircularChart3DSeriesDirective>
                            </CircularChart3DSeriesCollectionDirective>
                        </CircularChart3DComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample shows the browser market share using a 3D donut chart with a legend displayed on the right side of the chart.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render a 3D donut chart with a legend. The legend provides information about
                        the data points in the chart. Clicking on a legend item can collapse the corresponding data point, and hovering
                        over a legend item can highlight the data point.
                    </p>
                    <p><code>Tooltip</code> is enabled in this example. To see the tooltip in action, hover over a point or tap on a point on touch-enabled devices.</p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        3D circular chart component features are segregated into individual feature-wise modules. To use legend, you need
                        to inject the <code>CircularChartLegend3D</code> module into <code>services</code>.
                    </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: CircularChart3DLoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };

    public load(args: CircularChart3DLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as CircularChart3DTheme;
    };

}
