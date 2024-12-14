import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Inject, Toolbar, ToolbarItems, FilterSettingsModel, EditSettingsModel, Filter, Edit } from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { SampleBase } from '../common/sample-base';

export class Default extends SampleBase<{}, {}> {
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
          <GridComponent dataSource={orderDetails} height='350' allowSorting={true} editSettings={this.editSettings} allowFiltering={true} filterSettings={this.filterSettings} toolbar={this.toolbar}>
            <ColumnsDirective>
            <ColumnDirective field='OrderID' headerText='Order ID' width='180' textAlign='Right' validationRules={this.orderidRules} isPrimaryKey={true}></ColumnDirective>
            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={this.customeridRule}></ColumnDirective>
            <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='Right' editType='datepickeredit'/>
            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' validationRules={this.freightRules} editType='numericedit'/>
            <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format='yMd' textAlign='Right' editType='datepickeredit'></ColumnDirective>
            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[ Sort, Toolbar, Filter, Edit]} />
          </GridComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the default rendering of the Grid with minimum configuration.</p>
        </div>
        <div id='description'>          
          <p>
            The Grid component is used to display and manipulate tabular data with configuration options to control the way the data
            is presented and manipulated. It will pull the the data from a data source, such as an array of JSON objects, OData web
            services, or <code><a target='_blank' className='code'
              href='https://ej2.syncfusion.com/documentation/api/data/dataManager/'>
              DataManager</a></code> binding data fields to columns. Also, displaying a column header
            to identify the field with support for grouped records.
        </p>             
          <p>
            In this demo, the Grid is populated with its minimum default settings.
        </p>
          <p>
            More information on the Grid instantiation can be found in this
            <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/grid/getting-started'> documentation section</a>.
        </p>
        </div>
      </div>
    )
  }
}