/**
 * Sample for Range Area Series
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, DateTime, SeriesDirective, Inject, Category, SplineRangeAreaSeries, Tooltip, Legend } from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
export let data = [
    { x: "Jan", high: 14, low: 4 },
    { x: "Feb", high: 17, low: 7 },
    { x: "Mar", high: 20, low: 10 },
    { x: "Apr", high: 22, low: 12 },
    { x: "May", high: 20, low: 10 },
    { x: "Jun", high: 17, low: 7 },
    { x: "Jul", high: 15, low: 5 },
    { x: "Aug", high: 17, low: 7 },
    { x: "Sep", high: 20, low: 10 },
    { x: "Oct", high: 22, low: 12 },
    { x: "Nov", high: 20, low: 10 },
    { x: "Dec", high: 17, low: 7 }
];
export let data1 = [
    { x: "Jan", high: 29, low: 19 },
    { x: "Feb", high: 32, low: 22 },
    { x: "Mar", high: 35, low: 25 },
    { x: "Apr", high: 37, low: 27 },
    { x: "May", high: 35, low: 25 },
    { x: "Jun", high: 32, low: 22 },
    { x: "Jul", high: 30, low: 20 },
    { x: "Aug", high: 32, low: 22 },
    { x: "Sep", high: 35, low: 25 },
    { x: "Oct", high: 37, low: 27 },
    { x: "Nov", high: 35, low: 25 },
    { x: "Dec", high: 32, low: 22 }
];
const SAMPLE_CSS = `
      .control-fluid {
          padding: 0px !important;
      }`;
export class SplineRangeArea extends SampleBase {
    render() {
        return (<div className='control-pane'>
                 <style>
                     {SAMPLE_CSS}
                 </style>
                 <div className='control-section'>
                     <ChartComponent id='charts' ref={chart => this.chartInstance = chart} style={{ textAlign: "center" }} load={this.load.bind(this)} primaryXAxis={{
            valueType: 'Category',
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 }
        }} primaryYAxis={{
            labelFormat: '{value}˚C',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minimum: 0,
            maximum: 40
        }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true }} legendSettings={{ visible: true }} width={Browser.isDevice ? '100%' : '80%'} title='Monthly Temperature Range' loaded={this.onChartLoad.bind(this)}>
                         <Inject services={[SplineRangeAreaSeries, Category, DateTime, Tooltip, Legend]}/>
                         <SeriesCollectionDirective>
                             <SeriesDirective dataSource={data} border={{ width: 2 }} xName='x' high='high' opacity={0.4} marker={{ visible: false }} low='low' animation={{ enable: true }} name='England' type='SplineRangeArea'>
                             </SeriesDirective>
                             <SeriesDirective dataSource={data1} border={{ width: 2 }} xName='x' high='high' opacity={0.4} marker={{ visible: false }} low='low' animation={{ enable: true }} name='India' type='SplineRangeArea'>
                             </SeriesDirective>
                         </SeriesCollectionDirective>
                     </ChartComponent>
                 </div>
                 <div id="action-description">
                     <p>
                         This sample shows the monthly difference in temperature between two different countries using the spline range area series in the chart.
                     </p>
                 </div>
                 <div id="description">
                     <p>
                         In this example, you can see how to render and configure the spline range area type chart.
                         You can use <code>dashArray</code>, <code>width</code>, <code>fill</code> properties to customize the spline range area.
                         <code>marker</code> and <code>dataLabel</code> are used to represent individual data and its value.
                     </p>
                     <p>
                         Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                     </p>
                     <br></br>
                     <p><b>Injecting Module:</b></p>
                     <p>
                         Chart component features are segregated into individual feature-wise modules. To use SplineRangeArea series, we need to inject
                         <code>SplineRangeAreaSeries</code> module into <code>services</code>.
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
    load(args) {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    }
    ;
}
