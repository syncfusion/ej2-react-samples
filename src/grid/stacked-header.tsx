import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Resize, Sort, Toolbar, ToolbarItems, FilterSettingsModel, EditSettingsModel, Filter, Edit } from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { SampleBase } from '../common/sample-base';

export class StackedHeader extends SampleBase<{}, {}> {
    public filterSettings: FilterSettingsModel = {type: 'Excel'};
    public toolbar: ToolbarItems[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    public editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true };
    public customeridRule: Object = { required: true, minLength: 5};
    public orderidRules: Object = { required: true, number: true };
    public freightRules: Object = { required: true, min: 0 };
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={orderDetails} allowPaging={true} allowResizing={true} allowSorting={true} allowMultiSorting={true} editSettings={this.editSettings} allowFiltering={true} filterSettings={this.filterSettings} toolbar={this.toolbar}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='120' minWidth='10' textAlign='Right' validationRules={this.orderidRules} isPrimaryKey={true}></ColumnDirective>
                            <ColumnDirective columns={[{ field: 'CustomerID', headerText: 'Customer Name', width: 160, minWidth:30}, { field: 'OrderDate', headerText: 'Order Date', textAlign: 'Right', width: 140, minWidth:50, format: 'yMd', editType: 'datepickeredit', }]} headerText='Order Details'></ColumnDirective>
                            <ColumnDirective columns={[{ field: 'ShippedDate', headerText: 'Shipped Date', textAlign: 'Right', width: 160, minWidth:40, format: 'yMd', editType: 'datepickeredit', }, { field: 'ShipCountry', headerText: 'Ship Country', width: 140, minWidth: 60, editType: 'dropdownedit', }, { field: 'Freight', headerText: 'Freight Charges($)', textAlign: 'Right', width: 200, format: 'C2', minWidth: 40, editType: 'numericedit', validationRules: {required: true, number: true}}]} headerText='Ship Details'/>
                        </ColumnsDirective>
                        <Inject services={[Page, Resize, Sort, Toolbar, Filter, Edit]} />
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the Grid component with the stacked header and resize feature. In this sample, we have shown multiple level of column headers.</p>
                </div>
                <div id='description'>
                    <p>The Grid columns can be stacked/grouped in order to show multiple level of column headers. It can be done by setting the  <code><a target='_blank' className='code'
                        href='https://ej2.syncfusion.com/react/documentation/api/grid#columns'>
                        columns</a></code> property.
                    </p>
                    <p>The Grid columns can be resized by clicking and dragging at the right edge of columns header. To enable column, resize behavior, set <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/grid#allowresizing">allowResizing
                        </a></code> property as true. You can also prevent the resize of the particular column by setting
                        <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/grid/column#allowresizing">columns-&gt;allowResizing
                        </a></code> as false in columns definition.
                    </p>

                    <p>In this demo, the columns <b>CustomerName</b>, <b>OrderDate</b> are grouped under <b>Order Details</b>, the columns <b>ShippedDate</b>, <b>ShipCountry</b>, <b>Freight</b> are grouped under<b> Ship Details</b>. </p>
                    <p> More information on the Stacked Header feature configuration can be found in this
                    <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/grid/columns/#resize-stacked-column'> documentation section</a>.
                 </p>
                </div>
            </div>
        )
    }
}
