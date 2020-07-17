import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, CommandColumn } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { SampleBase } from '../common/sample-base';

export class CommandColumnEdit extends SampleBase<{}, {}> {
  public editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, allowEditOnDblClick: false };
  public editparams: any = { params: { popupHeight: '300px' } };
  public validationRule: Object = { required: true};
  public commands: any = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
  { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
  { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
  { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GridComponent id='gridcomp' dataSource={data}  allowPaging={true} pageSettings={{ pageCount: 5 }} editSettings={this.editSettings}>
            <ColumnsDirective>
              <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' isPrimaryKey={true} validationRules={this.validationRule}></ColumnDirective>
              <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={this.validationRule}></ColumnDirective>
              <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' editType='numericedit' ></ColumnDirective>
              <ColumnDirective field='OrderDate' headerText='Order Date' editType='datepickeredit' format='yMd' width='170' ></ColumnDirective>
              <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' edit={this.editparams} ></ColumnDirective>
              <ColumnDirective headerText='Manage Records' width='160' commands={this.commands}></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, CommandColumn, Edit]} />
          </GridComponent>
          <div id="action-description">
          <p>This sample demonstrates CRUD operations in Grid using command column. You can perform CRUD operations as follows,</p>
           <ul>
                  <li><code>Edit</code> - To edit record, double click a row or click Edit button from command column after selected a row </li>
                  <li><code>Delete</code> - To delete record, click Delete button from command column after selected a row </li>
                  <li><code>Update</code>,<code>Cancel</code> - You can save or discard changes by click Update and cancel button from command column respectively</li>
              </ul>
          </div>
          <div id="description">
          <p>
              The Grid provides an option to render CRUD action buttons in a column by using the CommandColumn feature. The
              <code><a target="_blank" className="code"
                  href="http://ej2.syncfusion.com/react/documentation/grid/api-column.html#commands">columns->commands
                  </a></code> property accepts array of <code><a target="_blank" className="code"
                      href="http://ej2.syncfusion.com/react/documentation/grid/api-commandModel.html">CommandModel
                  </a></code> object. The predefined command button can be defined by using <code><a target="_blank" className="code"
                      href="http://ej2.syncfusion.com/react/documentation/grid/api-commandModel.html#type">type
                  </a></code> property.
          </p>
          <p>The built-in command button are,</p>
          <ul>
             <li><code>Edit</code></li>
             <li><code>Delete</code></li>
             <li><code>Cancel</code></li>
             <li><code>Save</code></li>
         </ul>
         <p style={{ fontWeight: 500 }}>Injecting Module</p>
         <p>
             Grid features are segregated into individual feature-wise modules.
             To use commandColumn feature, we need to inject <code><a target="_blank" className="code"
             href="http://ej2.syncfusion.com/react/documentation/grid/api-page.html">
             CommandColumn
             </a></code> module into the <code>services</code>.
         </p>
         <p>
             More information on the commandcolumn configuration can be found in this
             <a target="_blank"
             href="http://ej2.syncfusion.com/react/documentation/grid/edit/#command-column">
              documentation section</a>.
         </p>
      </div>
      </div>
      </div>
    )
  }
}
