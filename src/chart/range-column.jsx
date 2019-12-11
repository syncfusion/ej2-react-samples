/**
 * Sample for RangeColumn series
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, RangeColumnSeries, Category, Tooltip, Legend } from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
export let data = [
    { x: 'Sun', low: 3.1, high: 10.8 },
    { x: 'Mon', low: 5.7, high: 14.4 }, { x: 'Tue', low: 8.4, high: 16.9 },
    { x: 'Wed', low: 10.6, high: 19.2 },
    { x: 'Thu', low: 8.5, high: 16.1 }, { x: 'Fri', low: 6.0, high: 12.5 },
    { x: 'Sat', low: 1.5, high: 6.9 }
];
export let data1 = [
    { x: 'Sun', low: 2.5, high: 9.8 },
    { x: 'Mon', low: 4.7, high: 11.4 }, { x: 'Tue', low: 6.4, high: 14.4 },
    { x: 'Wed', low: 9.6, high: 17.2 },
    { x: 'Thu', low: 7.5, high: 15.1 }, { x: 'Fri', low: 3.0, high: 10.5 },
    { x: 'Sat', low: 1.2, high: 7.9 }
];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class RangeColumn extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 } }} primaryYAxis={{ labelFormat: '{value}˚C', maximum: 20, edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }} title='Temperature Variation' loaded={this.onChartLoad.bind(this)} load={this.load.bind(this)} chartArea={{ border: { width: 0 } }} width={Browser.isDevice ? '100%' : '60%'} tooltip={{
            enable: true
        }}>
                        <Inject services={[RangeColumnSeries, Tooltip, Category, Legend]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} name='India' xName='x' low='low' high='high' type='RangeColumn'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data1} name='Germany' xName='x' low='low' high='high' type='RangeColumn'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This sample visualizes the maximum and minimum temperatures for a week of different countries with default range column series in the chart. Tooltip shows the information about the data points.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the range column type chart. You can use <code>border</code>,
                        <code>fill</code> properties to customize the Columns. <code>dataLabel</code> are used to represent individual data
                        and its value.
                    </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                    </p>

                    <p><b>Injecting Module</b></p>
                    <p>
                        chart component features are segregated into individual feature-wise modules. To use range column series, we need to Injecting
                        <code>RangeColumnSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the range column series can be found in this &nbsp;
                        <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                    </p>
                </div>
            </div>);
    }
    onChartLoad(args) {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    }
    ;
}
