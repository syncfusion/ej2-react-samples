import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, FieldList, Inject } from '@syncfusion/ej2-react-pivotview';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import * as rData from './pivot-data/rData.json';
/**
 * PivotView Aggregation Sample.
*/
/* tslint:disable */
let data = rData.data;
let dataSourceSettings = {
    enableSorting: true,
    formatSettings: [{ name: 'ProCost', format: 'C' }],
    drilledMembers: [{ name: 'EnerType', items: ['Biomass', 'Free Energy'] }],
    columns: [
        { name: 'EnerType', caption: 'Energy Type' },
        { name: 'EneSource', caption: 'Energy Source' }
    ],
    expandAll: false,
    rows: [
        { name: 'Year', caption: 'Production Year' },
        { name: 'HalfYear', caption: 'Half Year' },
        { name: 'Quarter', caption: 'Quarter Year' }
    ],
    values: [
        { name: 'PowUnits', caption: 'Units (GWh)' },
        { name: 'ProCost', caption: 'Cost (MM)' }
    ],
    filters: []
};
let pivotObj;
const SAMPLE_CSS = `
.e-pivotview {
    width: 100%;
    height: 100%;
}`;
export class Aggregation extends SampleBase {
    constructor() {
        super(...arguments);
        this.fields = { text: 'text', value: 'value' };
        this.mVal = 'Sum';
        this.qData = [
            { 'value': 'Max', 'text': 'Max' }, { 'value': 'Min', 'text': 'Min' },
            { 'value': 'Count', 'text': 'Count' }, { 'value': 'Sum', 'text': 'Sum' },
            { 'value': 'Avg', 'text': 'Average' }, { 'value': 'DistinctCount', 'text': 'Distinct Count' },
            { 'value': 'Product', 'text': 'Product' }, { 'value': 'Index', 'text': 'Index' },
            { 'value': 'PopulationStDev', 'text': 'Population StDev' }, { 'value': 'SampleStDev', 'text': 'Sample StDev' },
            { 'value': 'RunningTotals', 'text': 'Running Totals' }, { 'value': 'DifferenceFrom', 'text': 'Difference From' },
            { 'value': 'PercentageOfDifferenceFrom', 'text': '% of Difference From' }, { 'value': 'PercentageOfGrandTotal', 'text': '% of Grand Total' },
            { 'value': 'PercentageOfColumnTotal', 'text': '% of Column Total' }, { 'value': 'PercentageOfRowTotal', 'text': '% of Row Total' },
            { 'value': 'PercentageOfParentTotal', 'text': '% of Parent Total' }, { 'value': 'PercentageOfParentColumnTotal', 'text': '% of Parent Column Total' },
            { 'value': 'PercentageOfParentRowTotal', 'text': '% of Parent Row Total' }
        ];
        this.cData = [
            { 'value': 'Max', 'text': 'Max' }, { 'value': 'Min', 'text': 'Min' },
            { 'value': 'Sum', 'text': 'Sum' }, { 'value': 'Avg', 'text': 'Average' },
            { 'value': 'Product', 'text': 'Product' }, { 'value': 'Index', 'text': 'Index' },
            { 'value': 'PopulationStDev', 'text': 'Population StDev' }, { 'value': 'SampleStDev', 'text': 'Sample StDev' },
            { 'value': 'RunningTotals', 'text': 'Running Totals' }, { 'value': 'DifferenceFrom', 'text': 'Difference From' },
            { 'value': 'PercentageOfDifferenceFrom', 'text': '% of Difference From' }, { 'value': 'PercentageOfGrandTotal', 'text': '% of Grand Total' },
            { 'value': 'PercentageOfColumnTotal', 'text': '% of Column Total' }, { 'value': 'PercentageOfRowTotal', 'text': '% of Row Total' },
            { 'value': 'PercentageOfParentTotal', 'text': '% of Parent Total' }, { 'value': 'PercentageOfParentColumnTotal', 'text': '% of Parent Column Total' },
            { 'value': 'PercentageOfParentRowTotal', 'text': '% of Parent Row Total' }
        ];
    }
    onLoad() {
        if (data[0].Year === undefined) {
            let date;
            for (let ln = 0, lt = data.length; ln < lt; ln++) {
                date = new Date(data[ln].Date.toString());
                let dtYr = date.getFullYear();
                let dtMn = date.getMonth();
                let dtdv = (dtMn + 1) / 3;
                data[ln].Year = 'FY ' + dtYr;
                data[ln].Quarter = dtdv <= 1 ? 'Q1 ' + ('FY ' + dtYr) : dtdv <= 2 ? 'Q2 ' + ('FY ' + dtYr) :
                    dtdv <= 3 ? 'Q3 ' + ('FY ' + dtYr) : 'Q4 ' + ('FY ' + dtYr);
                data[ln].HalfYear = (dtMn + 1) / 6 <= 1 ? 'H1 ' + ('FY ' + dtYr) : 'H2' + ('FY ' + dtYr);
                delete (data[ln].Date);
            }
        }
        pivotObj.dataSourceSettings.dataSource = data;
    }
    changeBalance(e) {
        this.setSummaryType('PowUnits', e.value);
    }
    changeQuantity(e) {
        this.setSummaryType('ProCost', e.value);
    }
    setSummaryType(fieldName, summaryType) {
        let isAvail = false;
        for (let vCnt = 0; vCnt < pivotObj.dataSourceSettings.values.length; vCnt++) {
            if (pivotObj.dataSourceSettings.values[vCnt].name === fieldName) {
                pivotObj.dataSourceSettings.values[vCnt].type = summaryType;
                isAvail = true;
            }
        }
        if (isAvail) {
            pivotObj.updateDataSource();
        }
    }
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div className='col-lg-9 adaptive'>
                        <PivotViewComponent id='PivotView' ref={(pivotview) => { pivotObj = pivotview; }} load={this.onLoad} dataSourceSettings={dataSourceSettings} showFieldList={true} width={'100%'} height={'300'} gridSettings={{ columnWidth: 140 }}>
                            <Inject services={[FieldList]}/>
                        </PivotViewComponent>
                    </div>
                    <div className='col-lg-3 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div>
                                                
                                                <DropDownListComponent id='mode' floatLabelType={'Auto'} placeholder={'Units'} width={'100%'} dataSource={this.qData} fields={this.fields} value={this.mVal} change={this.changeBalance.bind(this)}/>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div>
                                                
                                                <DropDownListComponent id='mode' floatLabelType={'Auto'} placeholder={'Cost'} width={'100%'} dataSource={this.cData} fields={this.fields} value={this.mVal} change={this.changeQuantity.bind(this)}/>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>

                </div>
                <div id="action-description">
                    <p>This sample demonstrates the aggregate types like sum, average, min, max, count, distinct count, and more in the pivot table for quick business analysis. End users can also change the aggregation type of each field bound to the value axis in the field list at runtime.</p>
                </div>
                <div id="description">
                    <p>
                        In this sample, you can change the aggregate types for value fields using the dropdown list separately. The aggregate type can be set using the <code>type</code> property of the value field. The built-in aggregates are:
                    </p>
                    <p>
                        <code>Sum</code>, <code>Average</code>, <code>Min</code>, <code>Max</code>, <code>Count</code>, <code>Distinct Count</code>, <code>Product</code>,
                        <code>Index</code>, <code>Population StDev</code>, <code>Sample StDev</code>, <code>Population Var</code>, <code>Sample Var</code>, <code>Running Totals</code>,
                        <code>Difference From</code>, <code>% of Difference From</code>, <code>% of Grand Total</code>, <code>% of Column Total</code>, <code>% of Row Total</code>,
                        <code>% of Parent Total</code>, <code>% of Parent Column Total</code>, <code>% of Parent Row Total.</code>
                    </p>
                    <p>
                        To achieve aggregation through UI, navigate to <b>"User Interaction > Field List"</b> sample and click and open the value field settings menu to experience the same.
                    </p>
                </div>
            </div>);
    }
}
