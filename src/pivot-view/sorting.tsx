import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent, IDataOptions, Inject, FieldList } from '@syncfusion/ej2-react-pivotview';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { Pivot_Data } from './data-source';
import { SampleBase } from '../common/sample-base';
import { CheckBoxComponent, ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs as Args } from '@syncfusion/ej2-buttons';
import './sorting.css';

/**
 * PivotView Member Sorting sample.
 */

let dataSource: IDataOptions = {
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    data: Pivot_Data,
    expandAll: false,
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
    { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    enableSorting: true
};

export class Sorting extends SampleBase<{}, {}> {

    private pivotGridObj: PivotViewComponent;
    private fieldsddl: DropDownListComponent;
    private orderddl: DropDownListComponent;
    private applyBtn: ButtonComponent;
    private checkBoxObj: CheckBoxComponent;
    private order: string[] = ['Ascending', 'Descending'];
    private fields: { [key: string]: Object }[] = [{ Field: 'Country', Order: 'Country_asc' },
    { Field: 'Products', Order: 'Products_asc' },
    { Field: 'Year', Order: 'Year_asc' },
    { Field: 'Order Source', Order: 'Order Source_asc' }];
    onChange(e: ChangeEventArgs): void {
        if ((this.fieldsddl.dataSource as any)[this.fieldsddl.index].Order === (this.fieldsddl.dataSource as any)[this.fieldsddl.index].Field + '_asc') {
            this.orderddl.index = 0;
        } else {
            this.orderddl.index = 1;
        }
    }

    onChangeOrder(args: ChangeEventArgs): void {
        if (args.value === 'Ascending') {
            (this.fieldsddl.dataSource as any)[this.fieldsddl.index].Order = (this.fieldsddl.dataSource as any)[this.fieldsddl.index].Field + '_asc';
        } else {
            (this.fieldsddl.dataSource as any)[this.fieldsddl.index].Order = (this.fieldsddl.dataSource as any)[this.fieldsddl.index].Field + '_desc';
        }
        this.fieldsddl.refresh();
    }

    checkChange(args: Args): void {
        if (args.checked) {
            this.fieldsddl.enabled = true;
            this.orderddl.enabled = true;
            this.applyBtn.disabled = false;
        } else {
            this.fieldsddl.enabled = false;
            this.orderddl.enabled = false;
            this.applyBtn.disabled = true;
        }
    }

    onClick(): void {
        if (this.checkBoxObj.checked) {
            this.pivotGridObj.dataSource.enableSorting = true;
            this.pivotGridObj.dataSource.sortSettings = [
                { name: 'Country', order: (this.fieldsddl.dataSource as any)[0].Order === 'Country_asc' ? 'Ascending' : 'Descending' },
                { name: 'Products', order: (this.fieldsddl.dataSource as any)[1].Order === 'Products_asc' ? 'Ascending' : 'Descending' },
                { name: 'Year', order: (this.fieldsddl.dataSource as any)[2].Order === 'Year_asc' ? 'Ascending' : 'Descending' },
                { name: 'Order_Source', order: (this.fieldsddl.dataSource as any)[3].Order === 'Order Source_asc' ? 'Ascending' : 'Descending' }
            ];
        } else {
            this.pivotGridObj.dataSource.enableSorting = false;
            this.pivotGridObj.dataSource.sortSettings = [];
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='col-lg-8 adaptive'>
                        <PivotViewComponent id='PivotView' ref={(pivotview) => { this.pivotGridObj = pivotview }} dataSource={dataSource} width={'100%'} height={'300'} gridSettings={{ columnWidth: 140 }}>
                        </PivotViewComponent>
                    </div>
                    <div className='col-lg-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr style={{ height: "50px" }}>
                                        <td>
                                            <div className='row' style={{ paddingLeft: 0, marginLeft: '-10px' }}>
                                                <CheckBoxComponent ref={(scope) => { this.checkBoxObj = scope; }} id='reorder' checked={true} label='Enable Sorting' labelPosition='After' change={this.checkChange.bind(this)} ></CheckBoxComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div className='pivotHdrLabel'>
                                                Fields:
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ marginLeft: '-50px' }}>
                                                <DropDownListComponent enabled={true} ref={(scope) => { this.fieldsddl = scope; }} change={this.onChange.bind(this)} width={"98%"} id="etype" dataSource={this.fields} index={0} fields={{ text: 'Field', value: 'Order' }} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div className='pivotHdrLabel'>
                                                Order:
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ marginLeft: '-50px' }}>
                                                <DropDownListComponent enabled={true} ref={(scope) => { this.orderddl = scope; }} change={this.onChangeOrder.bind(this)} width={"98%"} id="etype" dataSource={this.order} index={0} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: "50px" }}>
                                        <td></td>
                                        <td>
                                            <div className='row' style={{ float: 'right', paddingRight: '15px' }}>
                                                <ButtonComponent ref={(scope) => { this.applyBtn = scope; }} onClick={this.onClick.bind(this)} iconCss='e-icons e-apply-icon' cssClass='e-flat' isPrimary={true}>Apply</ButtonComponent>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>

                </div>
                <div id="action-description">
                    <p>This sample demonstrates ordering of fields either in ascending or descending order.</p>
                </div>
                <div id="description">
                    <p>In this sample, any field can be selected from the
                        <b> Fields</b> dropdown list and its order can be changed to display headers either in ascending or descending order.
                                        It can be enabled using the
                        <code> enableSorting</code> property and it can be configured using the
                        <code> name</code> and
                        <code> order</code> options inside the
                        <code> sortSettings</code> property in the pivotgrid widget.
                    </p>
                </div>
            </div>
        )
    }
}