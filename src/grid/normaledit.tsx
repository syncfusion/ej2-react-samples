import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar} from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { SampleBase } from '../common/sample-base';

export class NormalEdit extends SampleBase<{}, {}> {
  public toolbarOptions: any = ['add', 'edit', 'delete', 'update', 'cancel'];
  public editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true };
  public editparams: any = { params: { popupHeight: '300px' } };
  public validationRule: Object = { required: true};
  public pageSettings: Object = { pageCount: 5};
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GridComponent dataSource={data} toolbar={this.toolbarOptions} allowPaging={true} editSettings={this.editSettings} pageSettings={this.pageSettings}>
            <ColumnsDirective>
              <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='right' validationRules={this.validationRule} isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={this.validationRule}></ColumnDirective>
              <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='right' editType='numericedit' ></ColumnDirective>
              <ColumnDirective field='ShipName' headerText='Ship Name' width='170' ></ColumnDirective>
              <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' edit={this.editparams} ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, Toolbar, Edit]} />
          </GridComponent>
        <div id="description">
          <p> The Grid supports CRUD operations. This CRUD operations can be configured in Grid using
            <code><a target="_blank" className="code" href="http://ej2.syncfusion.com/react/documentation/grid/api-editSettings.html">
            editSettings</a></code>. Also, it has different modes to manipulate the datasource.
          </p>
          <p>The available modes are,</p>
          <ul>
              <li><code>Inline</code></li>
              <li><code>Dialog</code></li>
              <li><code>Batch</code></li>
          </ul>
          <p>
              In this demo, Inline mode is enabled for editing. You can start edit any row by double clicking on it or clicking on toolbar’s
              <code>Edit</code> button, then the currently selected row will be changed to edited state. You can change the row values
              and save edited data to datasource.
          </p>
          <p style={{ fontWeight: 500 }}>Injecting Module</p>
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