import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, FieldList, Inject, PivotChart } from '@syncfusion/ej2-react-pivotview';
import { SampleBase } from '../common/sample-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import './pivot-chart.css';
/**
 * PivotView Sample with Chart integration.
 */
/* tslint:disable */
let Pivot_Data = pivotData.data;
let dataSourceSettings = {
    enableSorting: true,
    rows: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    columns: [{ name: 'Country' }, { name: 'Products' }],
    valueSortSettings: { headerDelimiter: ' - ' },
    dataSource: Pivot_Data,
    expandAll: false,
    drilledMembers: [{ name: 'Year', items: ['FY 2015'] }],
    formatSettings: [{ name: "Amount", format: "C" }],
    values: [{ name: "Amount", caption: "Sales Amount" }],
    filters: []
};
export class ChartIntegration extends SampleBase {
    constructor() {
        super(...arguments);
        this.fields = { text: 'text', value: 'value' };
        this.chartTypes = [
            { 'value': 'Column', 'text': 'Column' },
            { 'value': 'Bar', 'text': 'Bar' },
            { 'value': 'Line', 'text': 'Line' },
            { 'value': 'Spline', 'text': 'Spline' },
            { 'value': 'Area', 'text': 'Area' },
            { 'value': 'SplineArea', 'text': 'SplineArea' },
            { 'value': 'StepLine', 'text': 'StepLine' },
            { 'value': 'StepArea', 'text': 'StepArea' },
            { 'value': 'StackingColumn', 'text': 'StackingColumn' },
            { 'value': 'StackingBar', 'text': 'StackingBar' },
            { 'value': 'StackingArea', 'text': 'StackingArea' },
            { 'value': 'StackingColumn100', 'text': 'StackingColumn100' },
            { 'value': 'StackingBar100', 'text': 'StackingBar100' },
            { 'value': 'StackingArea100', 'text': 'StackingArea100' },
            { 'value': 'Scatter', 'text': 'Scatter' },
            { 'value': 'Bubble', 'text': 'Bubble' },
            { 'value': 'Polar', 'text': 'Polar' },
            { 'value': 'Radar', 'text': 'Radar' },
            { 'value': 'Pareto', 'text': 'Pareto' },
        ];
    }
    ddlOnChange(args) {
        this.pivotObj.chartSettings.chartSeries.type = args.value;
    }
    chartOnLoad(args) {
        let selectedTheme = location.hash.split("/")[1];
        selectedTheme = selectedTheme ? selectedTheme : "Material";
        args.chart.theme =
            selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1);
    }
    render() {
        return (<div className='control-pane'>
                <div className='col-lg-9 control-section'>
                    <PivotViewComponent id='PivotView' ref={d => this.pivotObj = d} dataSourceSettings={dataSourceSettings} width={'100%'} height={'450'} showFieldList={true} displayOption={{ view: 'Chart' }} chartSettings={{ title: 'Sales Analysis', chartSeries: { type: "Column" }, load: this.chartOnLoad.bind(this) }}>
                        <Inject services={[PivotChart, FieldList]}/>
                    </PivotViewComponent>
                </div>
                <div className='col-lg-3 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div>
                                            <DropDownListComponent placeholder={'Chart Types'} floatLabelType={'Auto'} fields={this.fields} change={this.ddlOnChange.bind(this)} id="charttypes" index={0} enabled={true} dataSource={this.chartTypes}/>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates rendering a pivot chart using pivot data. Users can explore the data through drill-up and drill-down operations by clicking the grouping labels. The field list can also be used to change the report at runtime.</p>
                </div>
                <div id="description">
                    <p>
                        In this sample, the pivot table plots chart based on the pivot report which is mentioned.
                        This can be achieved by setting the property <code>displayOption.view</code> as <code>Chart</code>. The built-in
                        options are:
                    </p>
                    <p>
                        <code>Table</code> -> Plots pivot table only which is default,
                    </p>
                    <p>
                        <code>Chart</code> -> Plots pivot chart only,
                    </p>
                    <p>
                        <code>Both</code> -> Plots both pivot table and pivot chart,
                    </p>
                    <p>
                        You can change the chart types using the dropdown list separately.
                        The chart types can be set using the property <code>chartSettings.chartSeries.type</code>. The built-in chart
                        types are:
                    </p>
                    <p><code>Column</code></p>
                    <p><code>Line</code></p>
                    <p><code>Spline</code></p>
                    <p><code>Bar</code></p>
                    <p><code>Area</code></p>
                    <p><code>StepArea</code></p>
                    <p><code>SplineArea</code></p>
                    <p><code>StackingColumn</code></p>
                    <p><code>StackingArea</code></p>
                    <p><code>StackingBar</code></p>
                    <p><code>StepLine</code></p>
                    <p><code>Pareto</code></p>
                    <p><code>Bubble</code></p>
                    <p><code>Scatter</code></p>
                    <p><code>StackingColumn100</code></p>
                    <p><code>StackingBar100</code></p>
                    <p><code>StackingArea100</code></p>
                    <p><code>Polar</code></p>
                    <p><code>Radar</code></p>
                    In the sample, the field list option is enabled, through which you can see the result in the chart by altering
        the report dynamically.
                    <p>
                        <strong>Injecting Module:</strong>
                    </p>
                    <p>
                        The pivot table features are segregated into individual modules. To take advantage of chart support, we need
                        to inject the
                                    <code> PivotChart</code> module into the
                                    <code> services</code>.
                    </p>
                </div>
            </div>);
    }
}
