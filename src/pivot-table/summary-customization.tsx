import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, Inject, IDataSet } from '@syncfusion/ej2-react-pivotview';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import {
    CheckBoxSelection, MultiSelectComponent, SelectEventArgs,
    RemoveEventArgs, PopupEventArgs
} from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as pivotData from './pivot-data/Pivot_Data.json';
import './summary-customization.css';

/**
 * PivotView Grouping bar Sample
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
let dataSourceSettings: IDataOptions = {
    enableSorting: true,
    drilledMembers: [{ name: 'Country', items: ['France'] }],
    filterSettings: [{ name: 'Products', items: ['Gloves', 'Helmets', 'Shorts', 'Vests'], type: 'Include' }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    dataSource: Pivot_Data,
    expandAll: false,
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    showGrandTotals: false
};

let values: { [key: string]: Object }[] = [
    { Name: 'Country' },
    { Name: 'Year' }
];

let field: any = { text: 'Name' };
let placeholder: string = "Select fields to hide its sub-totals";

export class SummaryCustomization extends SampleBase<{}, {}> {

    public pivotObj: any;

    onChange(args: any): void {
        this.pivotObj.setProperties({ dataSourceSettings: { showGrandTotals: true } }, true);
        this.pivotObj.setProperties({ dataSourceSettings: { showRowGrandTotals: true } }, true);
        this.pivotObj.setProperties({ dataSourceSettings: { showColumnGrandTotals: true } }, true);
        if (args.value === 'Column') {
            this.pivotObj.dataSourceSettings.showColumnGrandTotals = false;
        } else if (args.value === 'Row') {
            this.pivotObj.dataSourceSettings.showRowGrandTotals = false;
        } else if (args.value === 'Both') {
            this.pivotObj.dataSourceSettings.showGrandTotals = false;
        }
    }

    select(args: SelectEventArgs): void {
        for (let i: number = 0; i < this.pivotObj.dataSourceSettings.columns.length; i++) {
            if ((this.pivotObj.dataSourceSettings.columns[i].name || this.pivotObj.dataSourceSettings.columns[i].caption) === (args.itemData as any).Name) {
                this.pivotObj.dataSourceSettings.columns[i].showSubTotals = false;
            }
        }
        for (let i: number = 0; i < this.pivotObj.dataSourceSettings.rows.length; i++) {
            if ((this.pivotObj.dataSourceSettings.rows[i].name || this.pivotObj.dataSourceSettings.rows[i].caption) === (args.itemData as any).Name) {
                this.pivotObj.dataSourceSettings.rows[i].showSubTotals = false;
            }
        }
    }
    removed(args: RemoveEventArgs): void {
        for (let i: number = 0; i < this.pivotObj.dataSourceSettings.columns.length; i++) {
            if ((this.pivotObj.dataSourceSettings.columns[i].name || this.pivotObj.dataSourceSettings.columns[i].caption) === (args.itemData as any).Name) {
                this.pivotObj.dataSourceSettings.columns[i].showSubTotals = true;
            }
        }
        for (let i: number = 0; i < this.pivotObj.dataSourceSettings.rows.length; i++) {
            if ((this.pivotObj.dataSourceSettings.rows[i].name || this.pivotObj.dataSourceSettings.rows[i].caption) === (args.itemData as any).Name) {
                this.pivotObj.dataSourceSettings.rows[i].showSubTotals = true;
            }
        }
    }
    open(args: PopupEventArgs): void {
        (args.popup.element.querySelector(".e-filter-parent") as HTMLElement).style.display = 'none';
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='col-lg-8 control-section'>
                    <PivotViewComponent id='PivotView' ref={(scope) => { this.pivotObj = scope; }} dataSourceSettings={dataSourceSettings} width={'100%'} height={'400'} gridSettings={{ columnWidth: 140 }}>
                    </PivotViewComponent>
                </div>
                <div className="col-lg-4 property-section pivot-table-property-section">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" style={{ width: '100%', height: '100%' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ fontWeight: 600, fontSize: '13px' }}>
                                            Hide grand totals
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div>
                                            <RadioButtonComponent id="radio1" change={this.onChange.bind(this)} label='Row' name='Total' value="Row"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div>
                                            <RadioButtonComponent id="radio2" change={this.onChange.bind(this)} label='Column' name='Total' value="Column"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div>
                                            <RadioButtonComponent id="radio3" checked={true} change={this.onChange.bind(this)} label='Both' name='Total' value="Both"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div style={{ fontWeight: 600, fontSize: '13px' }}>
                                            Hide sub-totals
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <MultiSelectComponent id="checkbox" dataSource={values} fields={field} mode="CheckBox"
                                        showClearButton={true} enableSelectionOrder={false} showDropDownIcon={true} placeholder={placeholder}
                                        select={this.select.bind(this)} removed={this.removed.bind(this)} open={this.open.bind(this)}>
                                        <Inject services={[CheckBoxSelection]} />
                                    </MultiSelectComponent>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates showing and hiding grand totals and subtotals in rows, columns, or both at runtime. Also, end users can specify and hide subtotals of specific fields.</p>
                </div>
                <div id="description">
                    <p>
                        In this sample, you can hide grand totals in row, column, or both using radio buttons available under the <b>Hide grand totals</b> category. To hide grand totals in both row and column, set the property <code>dataSourceSettings->showGrandTotals</code> as false. To hide the row and column grand totals separately, set the property <code>dataSourceSettings->showRowGrandTotals</code> and <code>dataSourceSettings->showColumnGrandTotals</code>as false.
                    </p>
                    <p>
                        Also, in this sample, you can hide subtotals for specific fields too. It can be achieved by selecting appropriate fields from the drop-down available under the <b>Hide sub-totals</b> category. To hide subtotals for a specific field, set the <code>showSubTotals</code> property as false inside the field definition.
                    </p>
                </div>
            </div>
        )
    }
}