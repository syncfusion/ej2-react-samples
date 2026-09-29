import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Toolbar, ToolbarItems, ColumnChooser, Inject, Sort, FilterSettingsModel, EditSettingsModel, Filter, Edit, ColumnChooserSettingsModel } from '@syncfusion/ej2-react-grids';
import { orderedData } from './data';
import { SampleBase } from '../common/sample-base';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';

const SAMPLE_CSS = `
 #immediateContainer {
    padding-bottom: 10px;
    padding-left: 10px;
    display: flex;
    justify-content: flex-end;
}`;
export class ColChooser extends SampleBase<{}, {}> {
    public gridInstance!: GridComponent;
    public filterSettings: FilterSettingsModel = {type: 'CheckBox'};
    public editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true };
    public columnChooserSettings: ColumnChooserSettingsModel = { mode: 'Immediate' };  
    public customeridRule: Object = { required: true, minLength: 5};
    public orderidRules: Object = { required: true, number: true };
    public freightRules: Object = { required: true, min: 0 };
    public toolbarOptions: ToolbarItems[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ColumnChooser'];
    public checkboxOnChange = (args: ChangeEventArgs): void => {
        if (args.checked) {
            this.gridInstance.columnChooserSettings = { mode: 'Immediate' };
        } else {
            this.gridInstance.columnChooserSettings = { mode: 'Default' };
        }
    };
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <style>
                        {SAMPLE_CSS}
                    </style>
                    <div id="immediateContainer">
                        <CheckBoxComponent label='Immediate Column Chooser Mode' labelPosition='After' checked={true} change={this.checkboxOnChange}></CheckBoxComponent>
                    </div>
                    <GridComponent dataSource={orderedData} ref={grid => this.gridInstance = grid} toolbar={this.toolbarOptions} allowPaging={true} showColumnChooser={true} pageSettings={{ pageCount: 5 }} allowSorting={true} editSettings={this.editSettings} allowFiltering={true} filterSettings={this.filterSettings}
                        columnChooserSettings={this.columnChooserSettings} clipMode='EllipsisWithTooltip'>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' showInColumnChooser={false} validationRules={this.orderidRules} isPrimaryKey={true}></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' showInColumnChooser={false} validationRules={this.customeridRule}></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='Right' editType='datepickeredit' validationRules={{ required: true }}/>
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format='yMd' textAlign='Right' editType='datepickeredit' validationRules={{ required: true }} />
                            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' validationRules={this.freightRules} editType='numericedit'/>
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Toolbar, Page, ColumnChooser, Sort, Filter, Edit]} />
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates how users can dynamically show or hide columns using the Column Chooser feature. It highlights flexible column visibility management through an interactive Grid interface.
                    </p>
                </div>
                <div id="description">
                    <p>The Column Chooser feature enables users to dynamically control the visibility of columns in the Grid. To enable this functionality, set the
                        <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid#showcolumnchooser">showColumnChooser</a></code> property to <code>true</code> and include the “ColumnChooser” item in the <code><a target="_blank" className="code"
                                href="https://ej2.syncfusion.com/react/documentation/api/grid/index-default#toolbar">toolbar</a></code>. To prevent specific columns from appearing in the Column Chooser, set the <code><a target="_blank" className="code"
                                    href="https://ej2.syncfusion.com/react/documentation/api/grid/column/#showincolumnchooser">columns.showInColumnChooser</a></code> property to <code>false</code>.
                    </p>
                    <p>
                        Column visibility is managed by selecting or deselecting checkboxes in the Column Chooser dialog:
                    </p>
                    <ul>
                        <li>By default, changes are applied to the Grid only after clicking the “OK” button.</li>
                        <li>To apply changes instantly, set the <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid/filterSettings/#type">columnChooserSettings.mode</a></code> property to <code>Immediate</code>.</li>
                    </ul>
                    <p>In this demo, the column chooser mode can be switched using the "Immediate Column Chooser Mode" checkbox. When the column chooser button in the toolbar is clicked, it opens the dialog according to the selected mode, allowing users to show or hide columns by selecting or clearing the corresponding checkboxes.</p>
                    <p>
                        <strong>Injecting Module:</strong>
                    </p>
                    <p>
                        Grid component features are segregated into individual feature-wise modules. To use column chooser feature and toolbar functionality, inject the required modules <code>ColumnChooser</code> and <code>Toolbar</code> into the <code>services</code>.
                    </p>
                    <p>More information on column chooser configuration can be found in the <a aria-label="API link for documentation" target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/grid/columns/column-chooser"> documentation.</a></p>  
                    <p>Looking for the full React Data Grid component overview, features, pricing, and documentation? Visit our
                        <a target="_blank" href="https://www.syncfusion.com/react-components/react-data-grid"> React Data Grid component</a> page.</p>
                </div>
            </div >
        )
    }
}