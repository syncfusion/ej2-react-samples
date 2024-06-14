import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Group, Sort, ColumnMenu, Filter, Page, Inject, Toolbar, ToolbarItems, EditSettingsModel, Edit } from '@syncfusion/ej2-react-grids';
import { GroupSettingsModel, FilterSettingsModel } from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { SampleBase } from '../common/sample-base';
import './grid-context-menu.css';

export class ColumnMenuSample extends SampleBase<{}, {}> {
    public groupOptions: GroupSettingsModel = { showGroupedColumn: true };
    public filterSettings: FilterSettingsModel = { type: "CheckBox" };
    public toolbar: ToolbarItems[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    public editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true };
    public customeridRule: Object = { required: true, minLength: 5};
    public orderidRules: Object = { required: true, number: true };
    public freightRules: Object = { required: true, min: 0 };
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent id='gridcomp' dataSource={orderDetails} allowPaging={true} allowGrouping={true} allowSorting={true} editSettings={this.editSettings} toolbar={this.toolbar} allowFiltering={true} showColumnMenu={true} groupSettings={this.groupOptions} filterSettings={this.filterSettings} >
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='200' textAlign='Right' showInColumnChooser={false} validationRules={this.orderidRules} isPrimaryKey={true}></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='200' validationRules={this.customeridRule}></ColumnDirective>
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' format='yMd' width='200' textAlign='Right' editType='datepickeredit'/>
                            <ColumnDirective field='Freight' headerText='Freight' width='150' format='C2' textAlign='Right' validationRules={this.freightRules} editType='numericedit'/>
                            <ColumnDirective field='ShipName' headerText='Ship Name' visible={false} width='200'></ColumnDirective>
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='200' editType='dropdownedit'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Resize, Group, Sort, ColumnMenu, Filter, Page, Edit, Toolbar]} />
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the column menu feature. Click the multiple icon of each column to
                        show the column menu.
                    </p>
                </div>
                <div id="description">
                    <p>
                        Grid has option to show column menu when click on multiple icon of each column. The column menu has integrated options to
                interact the features like sorting, grouping, filtering, column chooser and autoFit. This features can be enabled
                by defining the
                <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid/#showcolumnmenu">showColumnMenu
                    </a></code> as true. The default items are
                    </p>
                    <ul>
                        <li>
                            <code>sortAscending</code> - Sort the current column in ascending order.</li>
                        <li>
                            <code>sortDescending</code> - Sort the current column in descending order.</li>
                        <li>
                            <code>group</code> - Group the current column.</li>
                        <li>
                            <code>ungroup</code> - Ungroup the current column.</li>
                        <li>
                            <code>autoFit</code> - Auto fit current column.</li>
                        <li>
                            <code>autoFitAll</code> - Auto fit all columns.</li>
                        <li>
                            <code>columnChooser</code> - Choose the column visibility.</li>
                        <li>
                            <code>Filter</code> - Show the filter option as given in
                    <code>filterSetting-&gt; type</code>.</li>
                    </ul>

                    <br />

                    <p>
                        In this demo, Column Menu feature has enabled by defining
                <code> showColumnMenu </code> as true with sorting, grouping, filtering, column chooser and autoFit options.

                 </p>
                    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                    <p>
                        Grid component features are segregated into individual feature-wise modules. To use Column menu feature, we need to inject <code>ColumnMenu</code> modeule into the <code>services</code>
                    </p>

                </div>
            </div>
        )
    }
}