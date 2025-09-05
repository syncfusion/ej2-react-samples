import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Group, Sort, ColumnMenu, Filter, Page, Inject, Toolbar, ToolbarItems, EditSettingsModel, Edit, ColumnMenuClickEventArgs, SelectionSettingsModel } from '@syncfusion/ej2-react-grids';
import { GroupSettingsModel, FilterSettingsModel } from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { SampleBase } from '../common/sample-base';
import './grid-context-menu.css';
import { ChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';

export class ColumnMenuSample extends SampleBase<{}, {}> {
    public grid: GridComponent;
    public groupOptions: GroupSettingsModel = { showGroupedColumn: true };
    public filterSettings: FilterSettingsModel = { type: "CheckBox" };
    public toolbar: ToolbarItems[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    public editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true };
    public selectionSettings: SelectionSettingsModel= { allowColumnSelection: true };
    public customeridRule: Object = { required: true, minLength: 5};
    public orderidRules: Object = { required: true, number: true };
    public freightRules: Object = { required: true, min: 0 };
    public columnMenuOptions: { [key: string]: Object }[] = [
        { id: 'Default', text: 'Default' },
        { id: 'Custom', text: 'Custom' },
    ];
    public columnMenuClick(args: ColumnMenuClickEventArgs) {
        if (args.item.id === 'select_column') {
            this.grid.selectionModule.selectColumn(args.column.index);
            // custom function
        } else if (args.item.id === 'clear_column') {
            // custom function
            this.grid.selectionModule.clearColumnSelection();
        }
    }
    public change(e:ChangeEventArgs) {
        let gridMenuOption: any = e.value;
        if (gridMenuOption === 'Custom') {
            let columnMenuItems: any = [
                'SortAscending',
                'SortDescending',
                'Group',
                'Ungroup',
                'Filter',
                { text: 'Select Column', id: 'select_column' },
                { text: 'Clear column selection', id: 'clear_column' },
            ];
            this.grid.columnMenuClick = this.columnMenuClick;
            this.grid.columnMenuItems = columnMenuItems;
        } else {
            this.grid.columnMenuClick = undefined;
            this.grid.columnMenuItems = undefined;
        }
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent id='gridcomp' ref={g => this.grid = g} dataSource={orderDetails} allowPaging={true} allowGrouping={true} allowSorting={true} selectionSettings={this.selectionSettings} editSettings={this.editSettings} toolbar={this.toolbar} allowFiltering={true} showColumnMenu={true} groupSettings={this.groupOptions} filterSettings={this.filterSettings} >
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='200' textAlign='Right' showInColumnChooser={false} validationRules={this.orderidRules} isPrimaryKey={true}></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='200' validationRules={this.customeridRule}></ColumnDirective>
                            <ColumnDirective field='Freight' headerText='Freight' width='150' format='C2' textAlign='Right' validationRules={this.freightRules} editType='numericedit'/>
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='200' editType='dropdownedit'></ColumnDirective>
                            <ColumnDirective field='ShipCity' headerText='Ship City' width='200'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Resize, Group, Sort, ColumnMenu, Filter, Page, Edit, Toolbar]} />
                    </GridComponent>
                </div>
                <div className='col-md-3 property-section'>
                <PropertyPane title='Properties'>
                    <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
                    <tbody>
                        <tr>
                        <td>
                            <div>Column menu</div>
                        </td>
                        <td>
                            <div>
                            <DropDownListComponent id="columnmenu" width="120px" index={0} change={this.change.bind(this)} dataSource={this.columnMenuOptions} fields={{ text: 'text', value: 'id' }}/>
                            </div>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </PropertyPane>
            </div>
                <div id="action-description">
                    <p>This sample demonstrates the default functionalities of the ColumnMenu. Click the icon of each column to open the column menu.
                    </p>
                </div>
                <div id="description">
                <p>
                    The grid provides an option to display a column menu when the user clicks the icon on each column. This menu includes integrated features like sorting, 
                    grouping, filtering, column chooser, and auto-fitting. These features can be enabled by setting the <code><a target="_blank" className="code"
                    href="https://ej2.syncfusion.com/react/documentation/api/grid#showcolumnmenu">showColumnMenu
                    </a></code> property to `true`. The default menu items include:
                <br/>
                </p>
                <ul>
                        <li><code>SortAscending</code>: Sort the current column in ascending order.</li>
                        <li><code>SortDescending</code>: Sort the current column in descending order.</li>
                        <li><code>Group</code>: Group the current column.</li>
                        <li><code>Ungroup</code>: Ungroup the current column.</li>
                        <li><code>AutoFit</code>: Auto-fit current column.</li>
                        <li><code>AutoFitAll</code>: Auto-fit all columns.</li>
                        <li><code>ColumnChooser</code>:  Toggle column visibility.</li>
                        <li><code>Filter</code>: Display the filter option as specified in the <code>filterSetting-&gt;type</code>.</li>
                </ul>
                
                <br/>
                <p>
                    The default column menu items are enabled based on the corresponding feature settings. Additionally, the column menu allows users to include  
                    custom menu items with the default ones, or the replacement of the default items entirely with custom options.
                </p>
                <p>
                    In this demo, the Column Menu feature is initially enabled by setting <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/grid#showcolumnmenu">showColumnMenu
                        </a></code> to `true`, with sorting, grouping, filtering, column chooser, 
                    and auto-fit options. Users also have the option to toggle custom column menu items through using the dropdown list in the property panel. In the custom menu, sorting, grouping, 
                    and filtering are enabled, and custom options like column selection and clear selection have been added.
                    
                </p>
                    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                    <p>
                        Features of the Grid component are segregated into individual feature-wise modules. To use the Column menu feature, inject the <code>ColumnMenu</code> modeule into the <code>services</code>
                    </p>
                    <p>
                        More information on the column menu can be found in this
                        <a target="_blank" 
                        href="https://ej2.syncfusion.com/react/documentation/grid/columns/column-menu">
                        documentation section</a>.
                    </p>

                </div>
            </div>
        )
    }
}