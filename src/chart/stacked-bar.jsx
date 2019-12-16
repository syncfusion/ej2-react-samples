/**
 * Sample for stackingBar series
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingBarSeries, Tooltip } from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
export let data = [{ x: 'Jan', y: 6 }, { x: 'Feb', y: 8 }, { x: 'Mar', y: 12 }, { x: 'Apr', y: 15.5 },
    { x: 'May', y: 20 }, { x: 'Jun', y: 24 }];
export let data2 = [{ x: 'Jan', y: 6 }, { x: 'Feb', y: 8 }, { x: 'Mar', y: 11 }, { x: 'Apr', y: 16 },
    { x: 'May', y: 21 }, { x: 'Jun', y: 25 }];
export let data3 = [{ x: 'Jan', y: -1 }, { x: 'Feb', y: -1.5 }, { x: 'Mar', y: -2 }, { x: 'Apr', y: -2.5 },
    { x: 'May', y: -3 }, { x: 'Jun', y: -3.5 }];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class StackedBar extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{
            valueType: 'Category',
            majorGridLines: { width: 0 }
        }} width={Browser.isDevice ? '100%' : '60%'} chartArea={{ border: { width: 0 } }} primaryYAxis={{
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            labelFormat: '{value}%',
            edgeLabelPlacement: 'Shift'
        }} load={this.load.bind(this)} title='Sales Comparison' loaded={this.onChartLoad.bind(this)} tooltip={{ enable: true }}>
                        <Inject services={[StackingBarSeries, Category, Legend, Tooltip]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} width={2} xName='x' yName='y' name='Apple' type='StackingBar'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} width={2} xName='x' yName='y' name='orange' type='StackingBar'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data3} width={2} xName='x' yName='y' name='Wastage' type='StackingBar'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This sample visualizes sales comparison of different fruits with default stacked bar series in chart. Legend in the sample shows the information about the series.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the stacking bar type charts. Stacks the points in the series horizontally and also you can use <code>stackingGroup</code> property to group the stacking collection based on categories.
                        You can use <code>border</code>, <code>fill</code> properties to customize the horizontal bar. <code>dataLabel</code> is used to represent individual data and its value.
                    </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use stacking area series, we need to inject
                        <code>StackingBarSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the stacking bar series can be found in this &nbsp;
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
