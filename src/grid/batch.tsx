import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Edit, Toolbar, Page, Inject } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { SampleBase } from '../common/sample-base';

export class BatchEdit extends SampleBase<{}, {}> {
  public toolbarOptions: any = ['Add', 'Delete', 'Update', 'Cancel'];
  public editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch' };
  public editparams: any = { params: { popupHeight: '300px' } };
  public validationRule: Object = { required: true };
  public pageSettings: Object = { pageCount: 5};
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GridComponent dataSource={data} pageSettings={this.pageSettings} toolbar={this.toolbarOptions} allowPaging={true} editSettings={this.editSettings}>
            <ColumnsDirective>
              <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' validationRules={this.validationRule} isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={this.validationRule}></ColumnDirective>
              <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' editType='numericedit' ></ColumnDirective>
              <ColumnDirective field='OrderDate' headerText='Order Date' editType='datepickeredit' format='yMd' width='170' ></ColumnDirective>
              <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' edit={this.editparams} ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, Toolbar, Edit]} />
          </GridComponent>
        <div id="action-description">
          <p>This sample demonstrates CRUD operations in Grid. You can perform CRUD operations as follows,</p>
         <ul>
                <li><code>Add</code> -  To add new record, click Add toolbar button </li>
                <li><code>Edit</code> - To edit record, double click a cell </li>
                <li><code>Delete</code> - To delete record, click toolbar Delete button after selected a row </li>
                <li><code>Update</code>,<code>Cancel</code> - You can save or discard changes by click toolbar Update and cancel button respectively</li>
            </ul>
        </div>
        <div id="description">
            <p> The Grid supports CRUD operations. This CRUD operations can be configured in Grid using
              <code><a target="_blank" className="code" href="http://ej2.syncfusion.com/react/documentation/grid/api-editSettings.html">
              editSettings</a></code>. Also, It has different modes to manipulate the datasource.
            </p>
            <p>The available modes are,</p>
            <ul>
              <li><code>Normal</code></li>
              <li><code>Dialog</code></li>
              <li><code>Batch</code></li>
            </ul>
            <p>
              In this demo, Batch mode is enabled for editing by defining <code><a target="_blank" className="code"
                href="http://ej2.syncfusion.com/react/documentation/grid/api-editSettings.html#mode-string">
                editSettings.mode
              </a></code> as <code>batch</code>. You can start editing by double clicking a cell and can change the cell value.
              The edited cell will be highlighted while navigating to a new cell, so that you know which cells had been edited.
              You can bulk save the edited data to the datasource by clicking on the toolbar's <code>update</code> button or by externally
              invoking the <code><a target="_blank" className="code"
                href="http://ej2.syncfusion.com/react/documentation/grid/api-edit.html#batchsave">
                batchSave
              </a></code> method.
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
    )
  }
}