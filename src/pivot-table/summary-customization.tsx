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
    showGrandTotals: true,
    grandTotalsPosition: 'Bottom',
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
        if (args.value === 'None') {
            this.pivotObj.setProperties({ dataSourceSettings: { showGrandTotals: false } }, true);
            this.pivotObj.setProperties({ dataSourceSettings: { showRowGrandTotals: true } }, true);
            this.pivotObj.setProperties({ dataSourceSettings: { showColumnGrandTotals: true } }, true);
            this.pivotObj.dataSourceSettings.showGrandTotals = true;
        }
        else {
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
    }

    onChange1(args: any): void {
        if (args.value === 'Top') {
            this.pivotObj.setProperties({ dataSourceSettings: { grandTotalsPosition: 'Bottom' } }, true);
            this.pivotObj.dataSourceSettings.grandTotalsPosition = 'Top';
        }
        else if(args.value === 'Bottom') {
            this.pivotObj.setProperties({ dataSourceSettings: { grandTotalsPosition: 'Top' } }, true);
            this.pivotObj.dataSourceSettings.grandTotalsPosition = 'Bottom';
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
                <div className='col-lg-9 control-section'>
                    <PivotViewComponent id='PivotView' ref={(scope) => { this.pivotObj = scope; }} dataSourceSettings={dataSourceSettings} width={'100%'} height={'400'} gridSettings={{ columnWidth: 140 }}>
                    </PivotViewComponent>
                </div>
                <div className="col-lg-3 property-section pivot-table-property-section">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" className="property-panel-table" style={{ width: '100%', height: '100%' }}>
                            <tbody>
                                <tr>
                                    <td>
                                        <div style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' }}>
                                            Grand totals position
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <RadioButtonComponent id="radio5" change={this.onChange1.bind(this)} label='Top' name='position' value="Top"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <RadioButtonComponent id="radio6" checked={true} change={this.onChange1.bind(this)} label='Bottom' name='position' value="Bottom"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' }}>
                                                Hide grand totals
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <RadioButtonComponent id="radio1" change={this.onChange.bind(this)} label='Row' name='Total' value="Row"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <RadioButtonComponent id="radio2" change={this.onChange.bind(this)} label='Column' name='Total' value="Column"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <RadioButtonComponent id="radio3" change={this.onChange.bind(this)} label='Both' name='Total' value="Both"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <RadioButtonComponent id="radio4" checked={true} change={this.onChange.bind(this)} label='None' name='Total' value="None"></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' }}>
                                                Hide sub-totals
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <div>
	                                    	<MultiSelectComponent id="checkbox" dataSource={values} fields={field} mode="CheckBox"
	                                            showClearButton={true} enableSelectionOrder={false} showDropDownIcon={true} placeholder={placeholder}
	                                            select={this.select.bind(this)} removed={this.removed.bind(this)} open={this.open.bind(this)}>
	                                            <Inject services={[CheckBoxSelection]} />
	                                        </MultiSelectComponent>
                                        </div>
                                    </td>
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
                        In this sample, you can hide grand totals in row, column, or both using radio buttons available under the <b>Hide grand totals</b> category. To hide grand totals in both row and column, set the property <code>dataSourceSettings->showGrandTotals</code> as <b>false</b>. To hide the row and column grand totals separately, set the property <code>dataSourceSettings->showRowGrandTotals</code> and <code>dataSourceSettings->showColumnGrandTotals</code>as <b>false</b>.
                    </p>
                    <p>
                        You can also, display the grand totals either at the top or bottom of the row and column axes using radio buttons available under the <b>Grand totals position</b> category. To display the grand totals at top, set the property <code>dataSourceSettings->grandTotalsPosition</code> as <b>Top</b>. And, to display the grand totals at botton, set the property <code>dataSourceSettings->grandTotalsPosition</code> as <b>Bottom</b>.
                    </p>
                    <p>
                        Also, in this sample, you can hide subtotals for specific fields too. It can be achieved by selecting appropriate fields from the drop-down available under the <b>Hide sub-totals</b> category. To hide subtotals for a specific field, set the <code>showSubTotals</code> property as <b>false</b> inside the field definition.
                    </p>
                </div>
            </div>
        )
    }
}