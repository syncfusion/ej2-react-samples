import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { PivotViewComponent } from '@syncfusion/ej2-react-pivotview';
import { SampleBase } from '../common/sample-base';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import * as pivotData from './pivot-data/Pivot_Data.json';
/**
 * PivotView Sample with Edit Options.
 */
/* tslint:disable */
let Pivot_Data = pivotData.data;
let dataSourceSettings = {
    enableSorting: true,
    columns: [{ name: 'Year' }, { name: 'Quarter' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Product_Categories', caption: 'Product Categories' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    dataSource: Pivot_Data,
    expandAll: false,
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    filters: []
};
const SAMPLE_CSS = `
.e-pivotview {
    width: 100%;
    height: 100%;
}`;
export class Editing extends SampleBase {
    onRadioChange(args) {
        let id = args.event.target.id;
        if (id === 'inline') {
            this.pivotObj.editSettings.allowCommandColumns = false;
            this.pivotObj.editSettings.mode = 'Normal';
        }
        else if (id === 'batch') {
            this.pivotObj.editSettings.allowCommandColumns = false;
            this.pivotObj.editSettings.mode = 'Batch';
        }
        else if (id === 'dialog') {
            this.pivotObj.editSettings.allowCommandColumns = false;
            this.pivotObj.editSettings.mode = 'Dialog';
        }
        else {
            this.pivotObj.editSettings.allowCommandColumns = true;
        }
    }
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div className='col-lg-9 adaptive'>
                        <PivotViewComponent id='PivotView' ref={(pivotview) => { this.pivotObj = pivotview; }} showTooltip={false} dataSourceSettings={dataSourceSettings} width={'100%'} height={'300'} gridSettings={{ columnWidth: 140 }} editSettings={{ allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' }}>
                        </PivotViewComponent>
                    </div>
                    <div className='col-lg-3 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', height: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className='row' style={{ margin: '0px' }}>
                                                <RadioButtonComponent id="inline" change={this.onRadioChange.bind(this)} checked={true} label='Inline Editing' name='EditOperation' value="Inline Editing"></RadioButtonComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='row' style={{ margin: '0px' }}>
                                                <RadioButtonComponent id="batch" change={this.onRadioChange.bind(this)} label='Batch Editing' name='EditOperation' value="Batch Editing"></RadioButtonComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='row' style={{ margin: '0px' }}>
                                                <RadioButtonComponent id="dialog" change={this.onRadioChange.bind(this)} label='Dialog Editing' name='EditOperation' value="Dialog Editing"></RadioButtonComponent>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='row' style={{ margin: '0px' }}>
                                                <RadioButtonComponent id="cc" change={this.onRadioChange.bind(this)} label='Command Columns' name='EditOperation' value="Command Columns"></RadioButtonComponent>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates CRUD operations performed over the raw items of any value cell in a pivot table. Different types of cell editing options are provided to make editing simpler.</p>
                </div>
                <div id="description">
                    <p>In the sample, the raw items of any value cell can be viewed in a drill-through dialog by double-clicking the
                        cell. CRUD operations can be performed by double-clicking the cells or using toolbar options. The following
                        CRUD operations can be performed through toolbar operations for normal and batch edits:
                    </p>
                    <ul>
                        <li><code>Add</code> - To add new record, click <code>Add</code> in the toolbar.</li>
                        <li><code>Edit</code> - To edit record, double click a cell.</li>
                        <li><code>Delete</code> - To delete a record, click <code>Delete</code> in the toolbar after selected a row.</li>
                        <li><code>Update</code>,<code>Cancel</code> - You can save or discard changes by clicking <code>Update</code>
                        or <code>Cancel</code> in
                        the toolbar, respectively.</li>
                    </ul>
                    <p>This CRUD operations can be configured in a pivot table using <code>editSettings</code> in code behind. There are also
                        different modes to manipulate the data source.</p>
                    <p>The available modes are:</p>
                    <ul>
                        <li><code>Normal</code> - Editing by row.</li>
                        <li><code>Batch</code> - Editing individual cells and bulk updating.</li>
                        <li><code>Dialog</code> - Editing by row with a dialog option.</li>
                        <li><code>Command Columns</code> - An additional column appends to the data grid with icons to perform CRUD
                            operations. Editing using cell double-click is restricted here.</li>
                    </ul>
                </div>
            </div>);
    }
}
