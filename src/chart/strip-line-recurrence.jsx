/**
 * Sample for stripline recurrence
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, ColumnSeries, DateTime, Tooltip, StripLine } from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
export let data1 = [
    { x: new Date(1970, 1, 1), y: 16500 }, { x: new Date(1975, 1, 1), y: 16000 }, { x: new Date(1980, 1, 1), y: 15400 },
    { x: new Date(1985, 1, 1), y: 15800 }, { x: new Date(1990, 1, 1), y: 14000 }, { x: new Date(1995, 1, 1), y: 10500 },
    { x: new Date(2000, 1, 1), y: 13300 }, { x: new Date(2005, 1, 1), y: 12800 }
];
export let data2 = [{ x: new Date(1970, 1, 1), y: 8000 }, { x: new Date(1975, 1, 1), y: 7600 }, { x: new Date(1980, 1, 1), y: 6400 },
    { x: new Date(1985, 1, 1), y: 3700 }, { x: new Date(1990, 1, 1), y: 7200 }, { x: new Date(1995, 1, 1), y: 2300 },
    { x: new Date(2000, 1, 1), y: 4000 }, { x: new Date(2005, 1, 1), y: 4800 }];
const SAMPLE_CSS = `
    .control-container {
		padding: 0px !important;
    }`;
export class Striplinerecurrence extends SampleBase {
    xIndex() {
        this.chartInstance.primaryXAxis.stripLines[0].visible = this.xcheckElement.checked;
    }
    ;
    yIndex() {
        this.chartInstance.primaryYAxis.stripLines[0].visible = this.ycheckElement.checked;
    }
    ;
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-8'>
                        <ChartComponent id='charts' ref={chart => this.chartInstance = chart} primaryXAxis={{
            valueType: 'DateTime', interval: 5, intervalType: 'Years', majorGridLines: { width: 0 },
            edgeLabelPlacement: 'Shift',
            minimum: new Date(1965, 1, 1), maximum: new Date(2010, 1, 1),
            stripLines: [{
                    startFromAxis: true, size: 5, sizeType: 'Years', isRepeat: true, repeatEvery: 10, visible: true,
                    color: 'rgba(167,169,171, 0.1)'
                }]
        }} chartArea={{ border: { width: 0 } }} load={this.load.bind(this)} primaryYAxis={{
            minimum: 0, maximum: 18000, interval: 2000, majorGridLines: { color: 'rgba(167,169,171, 0.3)' },
            majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' },
            stripLines: [
                {
                    startFromAxis: true, size: 2000, isRepeat: true, repeatEvery: 4000, visible: true,
                    color: 'rgba(167,169,171, 0.1)'
                }
            ]
        }} tooltip={{
            enable: true, format: ' Year: ${point.x}<br> Tons Per Day: ${point.y}'
        }} loaded={this.onChartLoad.bind(this)} title='World Pollution Report'>
                            <Inject services={[ColumnSeries, DateTime, Category, Legend, Tooltip, StripLine]}/>
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y' width={2} type='Column' name='AllSources'>
                                </SeriesDirective>
                                <SeriesDirective dataSource={data2} xName='x' yName='y' width={2} type='Column' name='Autos && Light Trucks'>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>X Axis:</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <input type="checkbox" id="xIndex" defaultChecked={true} onChange={this.xIndex.bind(this)} style={{ marginLeft: '-5px' }} ref={d => this.xcheckElement = d}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Y Axis:</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <input type="checkbox" id="yIndex" defaultChecked={true} onChange={this.yIndex.bind(this)} style={{ marginLeft: '-5px' }} ref={d => this.ycheckElement = d}/>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the Olympic medal count in Rio with default column series in the chart.
                        Data points values are showed by using data label.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the column type charts. Column type charts are used for comparing
                        the frequency, count, total or average of data in different categories. You can use <code>border</code>,
                        <code>fill</code> properties to customize the vertical rectangle. <code>dataLabel</code> is used to represent individual
                        data and its value.
                </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                    <br></br>
                    <p>Injecting Module</p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject
        <code>ColumnSeries</code> module using <code>Chart.Inject(ColumnSeries)</code> method.
    </p>
                    <p>
                        More information on the column series can be found in this
        <a target="_blank" href="http://ej2.syncfusion.com/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
    </p>
                </div>
            </div>);
    }
    onChartLoad(args) {
        document.getElementById('charts').setAttribute('title', '');
    }
    ;
}
