import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, IDataOptions, IDataSet, FieldList, Inject, SummaryTypes, LoadEventArgs } from '@syncfusion/ej2-react-pivotview';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import * as rData from './pivot-data/rData.json';
import './aggregation.css';

/**
 * PivotView Aggregation Sample.
*/
/* tslint:disable */
let data: IDataSet[] = (rData as any).data;
let dataSourceSettings: IDataOptions = {
    enableSorting: true,
    formatSettings: [{ name: 'PowUnits', format: 'N' }, { name: 'ProCost', format: 'C' }],
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

function Aggregation () {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let pivotObj: PivotViewComponent;

    let fields: object = { text: 'text', value: 'value' };

    let mVal: string = 'Sum';

    let qData: { [key: string]: Object }[] = [
        { 'value': 'Max', 'text': 'Max' }, { 'value': 'Min', 'text': 'Min' },
        { 'value': 'Count', 'text': 'Count' }, { 'value': 'Sum', 'text': 'Sum' },
        { 'value': 'Avg', 'text': 'Average' }, { 'value': 'Median', 'text': 'Median' }, { 'value': 'DistinctCount', 'text': 'Distinct Count' },
        { 'value': 'Product', 'text': 'Product' }, { 'value': 'Index', 'text': 'Index' },
        { 'value': 'PopulationStDev', 'text': 'Population StDev' }, { 'value': 'SampleStDev', 'text': 'Sample StDev' },
        { 'value': 'RunningTotals', 'text': 'Running Totals' }, { 'value': 'DifferenceFrom', 'text': 'Difference From' },
        { 'value': 'PercentageOfDifferenceFrom', 'text': '% of Difference From' }, { 'value': 'PercentageOfGrandTotal', 'text': '% of Grand Total' },
        { 'value': 'PercentageOfColumnTotal', 'text': '% of Column Total' }, { 'value': 'PercentageOfRowTotal', 'text': '% of Row Total' },
        { 'value': 'PercentageOfParentTotal', 'text': '% of Parent Total' }, { 'value': 'PercentageOfParentColumnTotal', 'text': '% of Parent Column Total' },
        { 'value': 'PercentageOfParentRowTotal', 'text': '% of Parent Row Total' }
    ];

    let cData: { [key: string]: Object }[] = [
        { 'value': 'Max', 'text': 'Max' }, { 'value': 'Min', 'text': 'Min' },
        { 'value': 'Sum', 'text': 'Sum' }, { 'value': 'Avg', 'text': 'Average' }, { 'value': 'Median', 'text': 'Median' },
        { 'value': 'Product', 'text': 'Product' }, { 'value': 'Index', 'text': 'Index' },
        { 'value': 'PopulationStDev', 'text': 'Population StDev' }, { 'value': 'SampleStDev', 'text': 'Sample StDev' },
        { 'value': 'RunningTotals', 'text': 'Running Totals' }, { 'value': 'DifferenceFrom', 'text': 'Difference From' },
        { 'value': 'PercentageOfDifferenceFrom', 'text': '% of Difference From' }, { 'value': 'PercentageOfGrandTotal', 'text': '% of Grand Total' },
        { 'value': 'PercentageOfColumnTotal', 'text': '% of Column Total' }, { 'value': 'PercentageOfRowTotal', 'text': '% of Row Total' },
        { 'value': 'PercentageOfParentTotal', 'text': '% of Parent Total' }, { 'value': 'PercentageOfParentColumnTotal', 'text': '% of Parent Column Total' },
        { 'value': 'PercentageOfParentRowTotal', 'text': '% of Parent Row Total' }
    ];

    function onLoad(args: LoadEventArgs): void {
        if (data[0].Year === undefined) {
            let date: Date;
            for (let ln: number = 0, lt: number = data.length; ln < lt; ln++) {
                date = new Date(data[ln].Date.toString());
                let dtYr: number = date.getFullYear();
                let dtMn: number = date.getMonth();
                let dtdv: number = (dtMn + 1) / 3;
                data[ln].Year = 'FY ' + dtYr;
                data[ln].Quarter = dtdv <= 1 ? 'Q1 ' + ('FY ' + dtYr) : dtdv <= 2 ? 'Q2 ' + ('FY ' + dtYr) :
                    dtdv <= 3 ? 'Q3 ' + ('FY ' + dtYr) : 'Q4 ' + ('FY ' + dtYr);
                data[ln].HalfYear = (dtMn + 1) / 6 <= 1 ? 'H1 ' + ('FY ' + dtYr) : 'H2' + ('FY ' + dtYr);
                delete (data[ln].Date);
            }
        }
        args.dataSourceSettings.dataSource = data;
    }


    function changeBalance(e: ChangeEventArgs) {
        setSummaryType('PowUnits', e.value as SummaryTypes);
    }

    function changeQuantity(e: ChangeEventArgs): void {
        setSummaryType('ProCost', e.value as SummaryTypes);
    }

    function setSummaryType(fieldName: string, summaryType: SummaryTypes): void {
        let isAvail: boolean = false;
        for (let vCnt: number = 0; vCnt < pivotObj.dataSourceSettings.values.length; vCnt++) {
            if (pivotObj.dataSourceSettings.values[vCnt].name === fieldName) {
                if (pivotObj.dataSourceSettings.values[vCnt].name === 'PowUnits' && summaryType === 'Avg') {
                    pivotObj.setProperties({ dataSourceSettings: { formatSettings: [{ name: 'PowUnits', format: 'N2' }, { name: 'ProCost', format: 'C' }] } }, true);
                } else {
                    pivotObj.setProperties({ dataSourceSettings: { formatSettings: [{ name: 'PowUnits', format: 'N' }, { name: 'ProCost', format: 'C' }] } }, true);
                }
                pivotObj.dataSourceSettings.values[vCnt].type = summaryType;
                isAvail = true;
            }
        }
        if (isAvail) {
            pivotObj.updateDataSource();
        }
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='col-lg-9 adaptive'>
                    <PivotViewComponent id='PivotView' ref={(pivotview) => { pivotObj = pivotview }} load={onLoad} dataSourceSettings={dataSourceSettings} showFieldList={true} width={'100%'} height={'290'} gridSettings={{ columnWidth: 140 }}>
                        <Inject services={[FieldList]} />
                    </PivotViewComponent>
                </div>
                <div className='col-lg-3 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='pivot-property-panel-table property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div>
                                            {/* Render the DropDownList Component */}
                                            <DropDownListComponent id='mode' floatLabelType={'Auto'} placeholder={'Units'} width={'100%'} dataSource={qData} fields={fields} value={mVal}                                                   
                                             change={changeBalance.bind(this)} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div>
                                            {/* Render the DropDownList Component */}
                                            <DropDownListComponent id='mode' floatLabelType={'Auto'} placeholder={'Cost'} width={'100%'} dataSource={cData} fields={fields} value={mVal}
                                                change={changeQuantity.bind(this)} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the aggregate types like sum, average, median, min, max, count, distinct count, and more in the pivot table for quick business analysis. End users can also change the aggregation type of each field bound to the value axis in the field list at runtime.</p>
            </div>
            <div id="description">
                <p>
                    In this sample, you can change the aggregate types for value fields using the dropdown list separately. The aggregate type can be set using the <code>type</code> property of the value field. The built-in aggregates are:
                </p>
                <p>
                    <code>Sum</code>, <code>Average</code>, <code>Median</code>, <code>Min</code>, <code>Max</code>, <code>Count</code>, <code>Distinct Count</code>, <code>Product</code>,
                    <code>Index</code>, <code>Population StDev</code>, <code>Sample StDev</code>, <code>Population Var</code>, <code>Sample Var</code>, <code>Running Totals</code>,
                    <code>Difference From</code>, <code>% of Difference From</code>, <code>% of Grand Total</code>, <code>% of Column Total</code>, <code>% of Row Total</code>,
                    <code>% of Parent Total</code>, <code>% of Parent Column Total</code>, <code>% of Parent Row Total.</code>
                </p>
                <p>
                    To achieve aggregation through UI, navigate to <b>"User Interaction &gt; Field List"</b> sample and click and open the value field settings menu to experience the same.
                </p>
            </div>
        </div>
    )
}

export default Aggregation;