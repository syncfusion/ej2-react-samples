import * as React from 'react';
import { PivotViewComponent, GroupingBar, Inject } from '@syncfusion/ej2-react-pivotview';
import { SampleBase } from '../common/sample-base';
import { extend } from '@syncfusion/ej2-base';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { MultiSelectComponent, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';
import * as gData from './pivot-data/gData.json';
import './grouping.css';
/**
 * PivotView Grouping Sample
 */
/* tslint:disable */
let data = gData.data;
let selectedGroups = ['Years', 'Months', 'Days'];
let groupData = ['Years', 'Quarters', 'Months', 'Days'];
let dataSourceSettings = {
    dataSource: extend([], data, null, true),
    expandAll: false,
    enableSorting: true,
    formatSettings: [{ name: 'Amount', format: 'C0' }, { name: 'Sold', format: 'N0' },
        { name: 'Date', type: 'date', format: 'dd/MM/yyyy-hh:mm a' }],
    rows: [{ name: 'Date', caption: 'Date' }],
    columns: [{ name: 'Product_ID', caption: 'Product ID' },
        { name: 'Products', caption: 'Products' }],
    values: [{ name: 'Sold', caption: 'Unit Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    filters: [],
    groupSettings: [{ name: 'Date', type: 'Date', groupInterval: ['Years', 'Months', 'Days'] },
        { name: 'Product_ID', type: 'Number', rangeInterval: 4 }]
};
export class Grouping extends SampleBase {
    beforeColumnsRender(args) {
        if (args.dataSourceSettings.rows.length > 3 && args.columns[0].width <= 250) {
            args.columns[0].width = 285;
        }
    }
    applyGroupSettings(args) {
        if (args.name === 'select') {
            if (selectedGroups.indexOf(args.itemData) === -1) {
                selectedGroups.push(args.itemData);
            }
        }
        else {
            if (selectedGroups.indexOf(args.itemData) > -1) {
                var index = selectedGroups.indexOf(args.itemData);
                selectedGroups.splice(index, 1);
            }
        }
    }
    onClick() {
        let groupSettings = [];
        if (selectedGroups.length > 0) {
            groupSettings.push({ name: 'Date', type: 'Date', groupInterval: selectedGroups });
        }
        if (this.numberGroup.value > 1) {
            groupSettings.push({ name: 'Product_ID', type: 'Number', rangeInterval: this.numberGroup.value });
        }
        this.pivotObj.dataSourceSettings.groupSettings = groupSettings;
    }
    ;
    render() {
        return (<div className='control-pane'>
                <div className='col-lg-8 control-section' id='pivot-table-section' style={{ overflow: 'initial' }}>
                    <PivotViewComponent id='PivotView' ref={(scope) => { this.pivotObj = scope; }} dataSourceSettings={dataSourceSettings} width={'100%'} height={'450'} showGroupingBar={true} gridSettings={{ columnWidth: 140, columnRender: this.beforeColumnsRender }}>
                        <Inject services={[GroupingBar]}/>
                    </PivotViewComponent>
                </div>
                <div className="col-lg-4 property-section pivot-table-property-section">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" style={{ width: '100%', height: '100%' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div>Group Date by:
                                        </div>
                                    </td>
                                    <td style={{ paddingBottom: '16px' }}>
                                        <div className="datecls">
                                            <MultiSelectComponent id="dategroup" dataSource={groupData} mode="CheckBox" enableSelectionOrder={false} showDropDownIcon={true} popupWidth={'150'} width={'150'} value={selectedGroups} placeholder={'Search group'} filterBarPlaceholder={'Search group'} select={this.applyGroupSettings.bind(this)} removed={this.applyGroupSettings.bind(this)}>
                                                <Inject services={[CheckBoxSelection]}/>
                                            </MultiSelectComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="input2cls" style={{ height: '50px' }}>
                                    <td>
                                        <div>Group Product ID by:
                                        </div>
                                    </td>
                                    <td style={{ paddingBottom: '16px' }}>
                                        <div className="numbercls">
                                            <NumericTextBoxComponent id="numbergroup" ref={(scope) => { this.numberGroup = scope; }} value={4} width={'150'} placeholder={'Example: 4'} format={'###'} min={1} max={10}>
                                            </NumericTextBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td></td>
                                    <td>
                                        <div style={{ float: 'right', marginRight: "4px" }}>
                                            <ButtonComponent id='group-apply' onClick={this.onClick.bind(this)} isPrimary={true}>Apply</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates grouping dates in year, quarter, month, etc., and number types in ranges like 1–5, 6–10, etc. in row and column headers of the pivot table.</p>
                </div>
                <div id="description">
                    <p>In this sample, the date type can be separated and showcased individually as year, quarter, month, or day by
                        selecting the appropriate option from the <b>Group date</b> by drop-down list. Also, numbers can be grouped by
                        entering the appropriate value in the <b>Group Product ID</b> by giving a range number in the the numeric text
                        box.
                    </p>
                    <p>
                        Grouping can be applied through code-behind using the <code>groupSettings</code> object in the pivot table
                        along with the following properties:
                    </p>
                    <table>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '10px 0', width: '130px' }}>
                                <code>name:</code>
                            </td>
                            <td>Specifies the normal field.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>type:</code>
                            </td>
                            <td>Specifies the field type for applying the group settings. For example, date formatted fields should be
                                in Date type and number formatted fields should be in Number type.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>groupInterval :</code>
                            </td>
                            <td>Specifies the interval for date fields in years, quarters, months, etc.</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>
                                <code>rangeInterval :</code>
                            </td>
                            <td>Specifies the interval value to group the number field.</td>
                        </tr>
                    </table>
                </div>

            </div>);
    }
}
