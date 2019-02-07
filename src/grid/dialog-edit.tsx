import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Toolbar, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { SampleBase } from '../common/sample-base';

export class DialogEdit extends SampleBase<{}, {}> {
  public toolbarOptions: any = ['Add', 'Edit', 'Delete'];
  public editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
  public editparams: any = { params: { popupHeight: '300px' } };
  public validationRules = { required: true };
  public orderidRules: Object = { required: true, number: true };
  public pageSettings: Object = {pageCount: 5};
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GridComponent dataSource={data} toolbar={this.toolbarOptions} allowPaging={true} editSettings={this.editSettings} pageSettings={this.pageSettings}>
            <ColumnsDirective>
              <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' validationRules={this.orderidRules} isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={this.validationRules}></ColumnDirective>
              <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' editType='numericedit'></ColumnDirective>
              <ColumnDirective field='OrderDate' headerText='Order Date' editType='datepickeredit' format='yMd' width='170' ></ColumnDirective>
              <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' edit={this.editparams} ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, Toolbar, Edit]} />
          </GridComponent>
        <div id="action-description">
           <p>This sample demonstrates CRUD operations in Grid. You can perform CRUD operations as follows,</p>
            <ul>
                <li><code>Add</code> -  To add new record, click Add toolbar button </li>
                <li><code>Edit</code> - To edit record, double click a row or click toolbar Edit button after selected a row </li>
                <li><code>Delete</code> - To delete record, click toolbar Delete button after selected a row </li>
                <li><code>Update</code>,<code>Cancel</code> - You can save or discard changes by click toolbar Update and cancel button respectively</li>
            </ul>
        </div>
         <div id="description">
            <p> The Grid supports CRUD operations. This CRUD operations can be configured in Grid using
            <code><a target="_blank" className="code" href="http://ej2.syncfusion.com/react/documentation/grid/api-editSettings.html">
            editSettings</a></code>. Also, it has different modes to manipulate the datasource.
            </p>
            <p>The available modes are,</p>
              <ul>
                <li><code>Normal</code></li>
                <li><code>Dialog</code></li>
                <li><code>Batch</code></li>
              </ul>
            <p>
              In this demo, Dialog mode is enabled for editing by defining <code><a target="_blank" className="code"
              href="http://ej2.syncfusion.com/react/documentation/grid/api-editSettings.html#mode-string">
              editSettings.mode
              </a></code> as <code>dialog</code>. You can start editing by double clicking a row or clicking on toolbar's <code>Edit</code> 
              button, then the currently selected row will be shown on a dialog and you can change the row values and save
              edited data to the datasource.
            </p>
            <p style={{ fontWeight: 500 }}>Injecting Module:</p>
            <p>
              Grid features are segregated into individual feature-wise modules. To use editing feature, we need to inject
              <code><a target="_blank" className="code"
              href="http://ej2.syncfusion.com/react/documentation/grid/api-edit.html">
              Edit
              </a></code> module into the <code>services</code>.
            </p>
          </div>
        </div>
      </div>
    );
  }
}