import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Group, Sort, ColumnMenu, Filter, Page, Inject, Toolbar, ToolbarItems, EditSettingsModel, Edit, SelectionSettingsModel, ColumnMenuClickEventArgs } from '@syncfusion/ej2-react-grids';
import { GroupSettingsModel, FilterSettingsModel } from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { updateSampleSection } from '../common/sample-base';
import './grid-context-menu.css';
import { ChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';

function ColumnMenuSample() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let grid: GridComponent;
    const groupOptions: GroupSettingsModel = { showGroupedColumn: true };
    const filterSettings: FilterSettingsModel = { type: "CheckBox" };
    const toolbar: ToolbarItems[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    const editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true };
    const selectionSettings: SelectionSettingsModel= { allowColumnSelection: true };
    const customeridRule: Object = { required: true, minLength: 5};
    const orderidRules: Object = { required: true, number: true };
    const freightRules: Object = { required: true, min: 0 };
    const columnMenuOptions: { [key: string]: Object }[] = [
        { id: 'Default', text: 'Default' },
        { id: 'Custom', text: 'Custom' },
    ];
    function columnMenuClick(args: ColumnMenuClickEventArgs) {
        if (args.item.id === 'select_column') {
            grid.selectionModule.selectColumn(args.column.index);
            // custom function
        } else if (args.item.id === 'clear_column') {
            // custom function
            grid.selectionModule.clearColumnSelection();
        }
    }
    function change(e:ChangeEventArgs) {
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
            grid.columnMenuClick = columnMenuClick;
            grid.columnMenuItems = columnMenuItems;
        } else {
            grid.columnMenuClick = undefined;
            grid.columnMenuItems = undefined;
        }
    }
    return (
        <div className='control-pane'>
            <div className='col-md-9 control-section'>
                <GridComponent id='gridcomp' ref={g => grid = g} dataSource={orderDetails} allowPaging={true} allowGrouping={true} allowSorting={true} selectionSettings={selectionSettings} editSettings={editSettings} toolbar={toolbar} allowFiltering={true} showColumnMenu={true} groupSettings={groupOptions} filterSettings={filterSettings} >
                    <ColumnsDirective>
                        <ColumnDirective field='OrderID' headerText='Order ID' width='200' textAlign='Right' showInColumnChooser={false} validationRules={orderidRules} isPrimaryKey={true}></ColumnDirective>
                        <ColumnDirective field='CustomerName' headerText='Customer Name' width='200' validationRules={customeridRule}></ColumnDirective>
                        <ColumnDirective field='Freight' headerText='Freight' width='150' format='C2' textAlign='Right' validationRules={freightRules} editType='numericedit'/>
                        <ColumnDirective field='ShipName' headerText='Ship Name' visible={false} width='200'></ColumnDirective>
                        <ColumnDirective field='ShipCountry' headerText='Ship Country' editType='dropdownedit'></ColumnDirective>
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
                            <DropDownListComponent id="columnmenu" width="120px" index={0} change={change.bind(this)} dataSource={columnMenuOptions} fields={{ text: 'text', value: 'id' }}/>
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
export default ColumnMenuSample;
