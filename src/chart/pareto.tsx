/**
 * Sample for Pareto chart
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ILoadedEventArgs, AxesDirective, AxisDirective,
    Category, ColumnSeries, Legend, Tooltip, ChartTheme,ParetoSeries, LineSeries
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export let data1: any[] = [
    { x: 'Traffic', y: 56 }, { x: 'Child Care', y: 44.8 },
    { x: 'Transport', y: 27.2 }, { x: 'Weather', y: 19.6 },
    { x: 'Emergency', y: 6.6 }
];

export class ParetoChart extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{ title: 'Defects', interval: 1, valueType: 'Category', majorGridLines: { width: 0 }, minorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, lineStyle: { width: 0 }, }}
                        primaryYAxis={{ title: 'Frequency', minimum: 0, maximum: 150, interval: 30, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 } }}
                        chartArea={{ border: { width: 0 } }}
                        load={this.load.bind(this)}
                        title='Defect vs Frequency' loaded={this.onChartLoad.bind(this)}
                        legendSettings={{ visible: false }}
                        width={Browser.isDevice ? '100%' : '60%'}
                        tooltip={{ enable: true, shared: true }}
                    >
                        <Inject services={[Category, ColumnSeries, Legend, LineSeries, Tooltip,ParetoSeries]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='Defect' type='Pareto'  width={2} marker={{ visible: true, width: 10, height: 10 }}>
                            </SeriesDirective>
                           
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    <div style={{ float: 'right', marginRight: '10px' }}>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates a pareto chart with line and column series. Trackball shows the information about the data point
                closest to the mouse
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the pareto charts. Pareto charts are used to find the cumulative
        values of of data in different categories. You can use <code>border</code>,
        <code>fill</code> properties to customize the vertical rectangle. <code>dataLabel</code> is used to represent individual
                        data and its value.
    </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
    </p>
                    <br />
                    <p style={{ "font-weight": 500 }}>Injecting Module</p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use pareto series, we need to inject
        <code>ParetoSeries</code>,<code>ColumnSeries</code> and <code>LineSeries</code> module using
        <code>Chart.Inject(ParetoSeries, ColumnSeries, LineSeries)</code> method.
    </p>
                    <p>
                        More information on the column series can be found in this
        <a target="_blank" href="http://ej2.syncfusion.com/documentation/chart/api-series.html#type-chartseriestype">documentation
                            section
        </a>.
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