/**
 * Sample for Indexed Category Axis
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, LineSeries, ColumnSeries, Tooltip, Crosshair } from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
export let data1 = [
    { x: 'Myanmar', y: 7.3 },
    { x: 'India', y: 7.9 },
    { x: 'Bangladesh', y: 6.8 },
    { x: 'Cambodia', y: 7.0 },
    { x: 'China', y: 6.9 },
];
export let data2 = [
    { x: 'Poland', y: 2.7 },
    { x: 'Australia', y: 2.5 },
    { x: 'Singapore', y: 2.0 },
    { x: 'Canada', y: 1.4 },
    { x: 'Germany', y: 1.8 }
];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class IndexedAxis extends SampleBase {
    onChange() {
        this.chartInstance.primaryXAxis.isIndexed = this.dropElement.checked;
        if (this.chartInstance.primaryXAxis.isIndexed) {
            this.chartInstance.series[0].type = 'Column';
            this.chartInstance.series[1].type = 'Column';
            this.chartInstance.series[0].marker.visible = false;
            this.chartInstance.series[1].marker.visible = false;
            this.chartInstance.primaryXAxis.labelRotation = 0;
            this.chartInstance.crosshair.line.width = 1;
        }
        else {
            this.chartInstance.series[0].type = 'Line';
            this.chartInstance.series[1].type = 'Line';
            this.chartInstance.series[0].marker.visible = true;
            this.chartInstance.series[1].marker.visible = true;
            this.chartInstance.primaryXAxis.labelRotation = 90;
            this.chartInstance.crosshair.line.width = 0;
        }
        this.chartInstance.refresh();
    }
    ;
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-9'>
                        <ChartComponent id='charts' ref={chart => this.chartInstance = chart} primaryXAxis={{
            valueType: 'Category',
            interval: 1,
            edgeLabelPlacement: 'Shift',
            crosshairTooltip: { enable: true },
            isIndexed: true
        }} primaryYAxis={{
            title: 'GDP Growth Rate',
            labelFormat: '{value}%'
        }} chartArea={{ border: { width: 0 } }} load={this.load.bind(this)} title="Real GDP Growth" loaded={this.onChartLoad.bind(this)} tooltip={{ enable: true, shared: true }} crosshair={{ enable: true, lineType: 'Vertical' }}>
                            <Inject services={[Legend, Category, LineSeries, ColumnSeries, Tooltip, Crosshair]}/>
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y' name='2015' width={2} type='Column' marker={{ visible: false, height: 10, width: 10 }}>
                                </SeriesDirective>
                                <SeriesDirective dataSource={data2} xName='x' yName='y' name='2016' width={2} type='Column' marker={{ visible: false, height: 10, width: 10 }}>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className='col-md-3 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Indexed:</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <input type="checkbox" id="isIndexed" defaultChecked={true} onChange={this.onChange.bind(this)} style={{ marginLeft: '-5px' }} ref={d => this.dropElement = d}/>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                <p>
                This sample demonstrates the rendering of indexed category axis in the chart by using two series.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to indexed axis in chart. For indexed category axis you can use <code>isIndexed</code> property.
                </p>
                    <p>
                        Hover the chart area to view trackball and its tooltip. Touch and hold to enable trackball in touch enabled devices.
            </p>
                    <p>
                        More information on the indexed axis can be found in this &nbsp;
                   <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
               </p>
                </div>
            </div>);
    }
    onChartLoad(args) {
        document.getElementById('charts').setAttribute('title', '');
    }
    ;
}
