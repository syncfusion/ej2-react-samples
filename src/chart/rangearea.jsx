/**
 * Sample for Range Area Series
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, DateTime, SeriesDirective, Inject, Category, RangeAreaSeries, Zoom } from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
let series1 = [];
let value = 35;
let point1;
for (let i = 1; i < 100; i++) {
    if (Math.random() > .5) {
        value += Math.random();
    }
    else {
        value -= Math.random();
    }
    point1 = { x: new Date(2017, 1, 1 + i), high: value, low: value - 10 };
    series1.push(point1);
}
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class RangeArea extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' ref={chart => this.chartInstance = chart} style={{ textAlign: "center" }} load={this.load.bind(this)} seriesRender={this.seriesRender.bind(this)} primaryXAxis={{
            valueType: 'DateTime',
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 }
        }} legendSettings={{ visible: false }} zoomSettings={{
            enableSelectionZooming: true,
            mode: 'X'
        }} primaryYAxis={{
            labelFormat: '{value}˚C',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 }
        }} chartArea={{ border: { width: 0 } }} width={Browser.isDevice ? '100%' : '80%'} title='Temperature Variation' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[RangeAreaSeries, Category, DateTime, Zoom]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={series1} border={{
            width: 2
        }} xName='x' high='high' opacity={0.4} marker={{
            visible: false,
            height: 8, width: 8, opacity: 1,
            dataLabel: { visible: false, position: 'Outer' }
        }} low='low' animation={{ enable: true }} name='India' type='RangeArea'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This sample visualizes the maximum and minimum temperatures  of different months with default range area series in the chart. Zoom the chart to check the temperature for week or day.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the range area type charts.
                       You can use <code>border</code>, <code>fill</code> properties to customize the vertical rect. <code>dataLabel</code> is used to represent individual data and its value.
                   </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                   </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use RangeArea series, we need to inject
                       <code>RangeAreaSeries</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the range area series can be found in this &nbsp;
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
    seriesRender(args) {
        let theme = args.series.chart.theme;
        let color;
        if (theme === 'Material') {
            color = '#004c46';
        }
        else if (theme === 'Bootstrap') {
            color = '#402c5c';
        }
        else {
            color = '#1b2e4e';
        }
        args.series.border.color = color;
    }
}
