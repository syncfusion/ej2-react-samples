import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, IDataOptions, IDataSet, FieldList, Inject, SummaryTypes } from '@syncfusion/ej2-react-pivotview';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { renewableEnergy } from './data-source';
import { SampleBase } from '../common/sample-base';

/**
 * PivotView Aggregation Sample.
*/

let dataSource: IDataOptions = {
    enableSorting: true,
    formatSettings: [{ name: 'ProCost', format: 'C0' }, { name: 'PowUnits', format: 'N0' }],
    drilledMembers: [{ name: 'EnerType', items: ['Biomass', 'Free Energy'] }],
    columns: [
        { name: 'EnerType', caption: 'Energy Type' },
        { name: 'EneSource', caption: 'Energy Source' }
    ],
    data: renewableEnergy,
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

const SAMPLE_CSS = `
.e-pivotview {
    width: 100%;
    height: 100%;
}`;

export class Aggregation extends SampleBase<{}, {}> {

    private pivotGridObj: PivotViewComponent;

    private fields: object = { text: 'text', value: 'value' };

    private mVal: string = 'Sum';

    private qData: { [key: string]: Object }[] = [
        { 'value': 'Max', 'text': 'Max' }, { 'value': 'Min', 'text': 'Min' },
        { 'value': 'Count', 'text': 'Count' }, { 'value': 'Sum', 'text': 'Sum' },
        { 'value': 'Avg', 'text': 'Average' }
    ];

    private cData: { [key: string]: Object }[] = [
        { 'value': 'Max', 'text': 'Max' }, { 'value': 'Min', 'text': 'Min' },
        { 'value': 'Sum', 'text': 'Sum' }, { 'value': 'Avg', 'text': 'Average' }
    ];



    public changeBalance(e: ChangeEventArgs): void {
        this.setSummaryType('PowUnits', e.value as SummaryTypes);
    }

    public changeQuantity(e: ChangeEventArgs): void {
        this.setSummaryType('ProCost', e.value as SummaryTypes);
    }

    public setSummaryType(fieldName: string, summaryType: SummaryTypes): void {
        let isAvail: boolean = false;
        for (let vCnt: number = 0; vCnt < this.pivotGridObj.dataSource.values.length; vCnt++) {
            if (this.pivotGridObj.dataSource.values[vCnt].name === fieldName) {
                this.pivotGridObj.dataSource.values[vCnt].type = summaryType;
                isAvail = (this.pivotGridObj.dataSource.values as any)[vCnt].properties ? false : true;
            }
        }
        if (isAvail) {
            this.pivotGridObj.updateDataSource();
        }
    }


    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section' style={{ overflow: 'initial' }}>
                    <div className='col-lg-9 adaptive'>
                        <PivotViewComponent id='PivotView' ref={(pivotview) => { this.pivotGridObj = pivotview }} dataSource={dataSource} showFieldList={true} width={'100%'} height={'300'} gridSettings={{columnWidth: 140}}>
                        <Inject services={[FieldList]} />
                        </PivotViewComponent>
                    </div>
                    <div className='col-lg-3 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div>
                                                {/* Render the DropDownList Component */}
                                                <DropDownListComponent id='mode' floatLabelType={'Auto'} placeholder={'Units'} width={'100%'} dataSource={this.qData} fields={this.fields} value={this.mVal}
                                                    change={this.changeBalance.bind(this)} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div>
                                                {/* Render the DropDownList Component */}
                                                <DropDownListComponent id='mode' floatLabelType={'Auto'} placeholder={'Cost'} width={'100%'} dataSource={this.cData} fields={this.fields} value={this.mVal}
                                                    change={this.changeQuantity.bind(this)} />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>

                </div>
                <div id="action-description">
                    <p>This sample demonstrates the aggregate types in the pivotgrid widget. In this sample, you can change the aggregate types
        for value fields using a dropdown list separately.</p>
                </div>
                <div id="description">
                    <p>The pivotgrid widget supports different types of aggregation for value fields. The aggregate type can be set using the type
                        property of the value field. The built-in aggregates are:
                    </p>
                    <ul>
                        <li>
                            <code>Sum</code>
                        </li>
                        <li>
                            <code>Average</code>
                        </li>
                        <li>
                            <code>Min</code>
                        </li>
                        <li>
                            <code>Max</code>
                        </li>
                        <li>
                            <code>Count</code>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}