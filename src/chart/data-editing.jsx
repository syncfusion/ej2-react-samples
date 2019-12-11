/**
 * Sample for Line Series
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ColumnSeries, LineSeries, Category, DataEditing, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
export let data1 = [
    { x: '2005', y: 21 }, { x: '2006', y: 60 },
    { x: '2007', y: 45 }, { x: '2008', y: 50 },
    { x: '2009', y: 74 }, { x: '2010', y: 65 },
    { x: '2011', y: 85 }
];
export let data2 = [
    { x: '2005', y: 21 }, { x: '2006', y: 22 },
    { x: '2007', y: 36 }, { x: '2008', y: 34 },
    { x: '2009', y: 54 }, { x: '2010', y: 55 },
    { x: '2011', y: 60 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
        .charts {
            align :center
        }`;
export class DataEdit extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{
            valueType: 'Category',
            minimum: -0.5,
            maximum: 6.5,
            labelPlacement: 'OnTicks',
            majorGridLines: { width: 0 },
        }} load={this.load.bind(this)} primaryYAxis={{
            rangePadding: 'None',
            minimum: 0,
            maximum: 100,
            interval: 20,
            title: 'Sales',
            labelFormat: '{value}%',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true }} width={Browser.isDevice ? '100%' : '60%'} title='Sales prediction of products' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[LineSeries, ColumnSeries, Category, DataEditing, Legend, Tooltip]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} dragSettings={{ enable: true }} xName='x' yName='y' name='Product A' width={2} marker={{ visible: true, width: 10, height: 10 }} type='Column' fill='#00BDAE'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} dragSettings={{ enable: true }} xName='x' yName='y' name='Product B' width={2} marker={{ visible: true, width: 10, height: 10 }} type='Line' fill='#357CD2'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                    This sample illustrates data editing feature in chart. Drag and drop the points to change the data values dynamically.
                </p>
                </div>
                <div id="description">
                    <p>
                    The draggable-points allows data to be moved around the chart. In addition to this, the module fires events such as dragStart, drag and dragComplete.
                  </p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use data editing, we need to inject
                        <code>DataEditing</code> module using <code>Chart.Inject(DataEditing)</code> method.
                  </p> <br>
                    </br>
                    <p>
                        More information on the Data Editing can be found in this
                        <a target="_blank" href="http://ej2.syncfusion.com/documentation/chart/api-dataEditing.html#properties">documentation section</a>.
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }
    ;
}
