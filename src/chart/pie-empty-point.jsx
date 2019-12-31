/**
 * Sample for empty for Pie chart
 */
import * as React from "react";
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationDataLabel, AccumulationTooltip, PieSeries } from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
export let data1 = [
    { x: 'Rice', y: 80 }, { x: 'Wheat', y: null }, { x: 'Oil', y: 70 },
    { x: 'Corn', y: 60 }, { x: 'Gram', y: null },
    { x: 'Milk', y: 70 }, { x: 'Peas', y: 80 },
    { x: 'Fruit', y: 60 }, { x: 'Butter', y: null }
];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class PieEmptyPoint extends SampleBase {
    constructor() {
        super(...arguments);
        this.droplist = [
            { value: 'Drop' },
            { value: 'Average' },
            { value: 'Zero' }
        ];
    }
    mode() {
        this.pie.series[0].emptyPointSettings.mode = this.modeElement.value;
        this.pie.refresh();
    }
    ;
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-8'>
                        <AccumulationChartComponent id='pie-chart' ref={pie => this.pie = pie} title='Annual Product-Wise Profit Analysis' load={this.load.bind(this)} legendSettings={{ visible: false }} tooltip={{ enable: true, format: '${point.x} : <b>${point.y}</b>' }} loaded={this.onChartLoad.bind(this)}>
                            <Inject services={[PieSeries, AccumulationDataLabel, AccumulationTooltip]}/>
                            <AccumulationSeriesCollectionDirective>
                                <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' name='Profit' dataLabel={{
            visible: true, position: 'Inside', font: {
                fontWeight: '600',
                color: '#ffffff'
            }
        }} emptyPointSettings={{ fill: '#e6e6e6' }}>
                                </AccumulationSeriesDirective>
                            </AccumulationSeriesCollectionDirective>
                        </AccumulationChartComponent>
                    </div>
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Empty Point Mode: </div></td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <DropDownListComponent width="120px" id="selmode" change={this.mode.bind(this)} ref={d => this.modeElement = d} dataSource={this.droplist} fields={{ text: 'value', value: 'value' }} value="Drop"/>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                <p>
                This sample illustrates an organization’s annual product-wise profit analysis with the empty point functionality in pie series.  The Mode of empty point can be changed by using <code>Empty Point Mode</code> in property panel.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the empty points. You can use <code>border</code>,
                    <code>fill</code>, <code>mode</code> properties to customize the empty points.
                </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                    <p>
                        More information on the empty points can be found in this &nbsp;
                    <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                </p>
                </div>
            </div>);
    }
    onChartLoad(args) {
        let chart = document.getElementById('pie-chart');
        chart.setAttribute('title', '');
        chart.setAttribute('align', 'center');
    }
    ;
}
