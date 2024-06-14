import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Toolbar, ToolbarItems, ColumnChooser, Inject, Sort, FilterSettingsModel, EditSettingsModel, Filter, Edit } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { SampleBase } from '../common/sample-base';

export class ColChooser extends SampleBase<{}, {}> {
    public filterSettings: FilterSettingsModel = {type: 'Excel'};
    public editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true };
    public customeridRule: Object = { required: true, minLength: 5};
    public orderidRules: Object = { required: true, number: true };
    public freightRules: Object = { required: true, min: 0 };
    public toolbarOptions: ToolbarItems[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ColumnChooser'];
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={data} toolbar={this.toolbarOptions} allowPaging={true} showColumnChooser={true} pageSettings={{ pageCount: 5 }} allowSorting={true} editSettings={this.editSettings} allowFiltering={true} filterSettings={this.filterSettings}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' validationRules={this.orderidRules} isPrimaryKey={true}></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' showInColumnChooser={false} validationRules={this.customeridRule}></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='Right' editType='datepickeredit'/>
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format='yMd' textAlign='Right' editType='datepickeredit' />
                            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' validationRules={this.freightRules} editType='numericedit'/>
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' visible={false} width='150' editType='dropdownedit'></ColumnDirective>
                            <ColumnDirective field='ShipCity' headerText='Ship City' visible={false} width='150'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Toolbar, Page, ColumnChooser, Sort, Filter, Edit]} />
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the Grid column chooser feature. Click the column chooser
        icon in the toolbar to open column chooser and you can select columns to hide/show from the checkbox list.
    </p>
                </div>
                <div id="description">
                    <p>The Grid columns can be shown/hidden dynamically by using column chooser.  To enable column chooser behavior, set  <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/grid/#showcolumnchooser">showColumnChooser
        </a></code> property as true. You can also prevent the show of a column by setting
            <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid/column/#showincolumnchooser">columns-&gt;showInColumnChooser
        </a></code> as false in Grid columns definition.

        </p>
                    <br/>

                    <p>
                        In this demo,  when the user clicks column chooser icon from the toolbar then the column chooser menu will open.
                   User can show or hide the columns by changing the state of the checkbox..
        </p>
        
        <p style={{ fontWeight: 500 }}>Injecting Module:</p>
        
        <p>
            Grid component features are segregated into individual feature-wise modules. To use column chooser feature, we need to inject
                          <code>ColumnChooser</code> module into the <code>services</code>.
        </p>

                </div>
            </div >
        )
    }
}