/**
 * Sample for Circular Pie 3D chart.
 */
import * as React from "react";
import {
    CircularChart3D, PieSeries3D, CircularChartDataLabel3D, CircularChartLegend3D, CircularChartTooltip3D, CircularChartHighlight3D, CircularChart3DLoadedEventArgs, CircularChart3DTheme, CircularChart3DComponent, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, Inject
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let data1 = [    { 'x': 'Canada', y: 46, text: 'Canada: 46' },
{ 'x': 'Hungary', y: 30, text: 'Hungary: 30' },
{ 'x': 'Germany', y: 79, text: 'Germany: 79' },
{ 'x': 'Mexico', y: 13, text: 'Mexico: 13' },
{ 'x': 'China', y: 56, text: 'Greece: 26' },
{ 'x': 'India', y: 41, text: 'India: 41' },
{ 'x': 'Bangladesh', y: 25, text: 'Bangladesh: 25' },
{ 'x': 'United States', y: 32, text: 'United States: 32' },
{ 'x': 'Belgium', y: 34, text: 'Belgium: 34' }];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Circular 3D Chart.
 */
export class PieSeries extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div>
                        <CircularChart3DComponent id='charts' style={{ textAlign: "center" }} legendSettings={{ visible: false }} highlightMode='Point' tilt={-45} enableRotation={true} load={this.load.bind(this)} title='Berlin 2023 Special Olympics Gold Medals' loaded={this.onChartLoad.bind(this)} tooltip={{ enable: true, format: "<b>${point.x}</b><br> Gold Medals: <b>${point.y}</b>", header: "" }}>
                            <Inject services={[PieSeries3D, CircularChartDataLabel3D, CircularChartLegend3D, CircularChartTooltip3D, CircularChartHighlight3D]} />
                            <CircularChart3DSeriesCollectionDirective>
                                <CircularChart3DSeriesDirective dataSource={data1} xName='x' yName='y' explode={true} innerRadius='0%' radius={Browser.isDevice ? '45%' : '75%'} explodeOffset={Browser.isDevice ? '10%' : '30%'} dataLabel={{ visible: true, position: 'Outside', name: 'x', font: { fontWeight: '600' }, connectorStyle: { length: Browser.isDevice ? '20px' : '40px' } }}>
                                </CircularChart3DSeriesDirective>
                            </CircularChart3DSeriesCollectionDirective>
                        </CircularChart3DComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the gold medals from the Berlin 2023 Olympics using a 3D pie chart. Data points are
                        enhanced with tooltip.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure a 3D pie chart. The pie chart is a circular graphic,
                        which is ideal for displaying categories as a proportion or a percentage of the whole.
                        The radius of the pie chart can be customized using the <code>radius</code> property. You can rotate and tilt
                        the pie chart using a mouse or touch-enabled devices.
                    </p>
                    <p><code>Tooltip</code> is enabled in this example. To see the tooltip in action, hover over a point or tap on a
                        point on touch-enabled devices. </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        3D circular chart component features are segregated into individual feature-wise modules. To use pie series, you
                        need
                        to inject the <code>PieSeries3D</code> module into <code>services</code>.
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
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as CircularChart3DTheme;
    };

}
