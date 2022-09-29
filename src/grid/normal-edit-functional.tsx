import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar, NewRowPosition } from '@syncfusion/ej2-react-grids';
import { orderDataSource } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

function NormalEdit() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  const toolbarOptions: any = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  const editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
  const editparams: any = { params: { popupHeight: '300px' } };
  const validationRule: Object = { required: true };
  const orderidRules: Object = { required: true, number: true };
  const pageSettings: Object = { pageCount: 5 };
  const format: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };

  let gridInstance: GridComponent;
  let dropDownInstance: DropDownListComponent;
  const droplist: { [key: string]: Object }[] = [
    { text: 'Top', value: 'Top' },
    { text: 'Bottom', value: 'Bottom' }
  ];

  function actionBegin(args: any): void {
    if (args.requestType === 'save') {
      if (gridInstance.pageSettings.currentPage !== 1 && gridInstance.editSettings.newRowPosition === 'Top') {
        args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - gridInstance.pageSettings.pageSize;
      } else if (gridInstance.editSettings.newRowPosition === 'Bottom') {
        args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - 1;
      }
    }
  }

  function ddChange(): void {
    gridInstance.editSettings.newRowPosition = dropDownInstance.value as NewRowPosition;
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-md-9'>
          <GridComponent dataSource={orderDataSource} ref={grid => gridInstance = grid} toolbar={toolbarOptions} allowPaging={true} editSettings={editSettings} pageSettings={pageSettings}
            actionBegin={actionBegin.bind(this)}>
            <ColumnsDirective>
              <ColumnDirective field='OrderID' headerText='Order ID' width='140' textAlign='Right' validationRules={orderidRules} isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={validationRule}></ColumnDirective>
              <ColumnDirective field='Freight' headerText='Freight' width='140' format='C2' textAlign='Right' editType='numericedit' ></ColumnDirective>
              <ColumnDirective field='OrderDate' headerText='Order Date' editType='datetimepickeredit' format={format} width='160' ></ColumnDirective>
              <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' edit={editparams} ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, Toolbar, Edit]} />
          </GridComponent>
        </div>

        <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
              <tr>
                <td>
                  <div>Add New Row Position</div>
                </td>
                <td>
                  <div>
                    <DropDownListComponent id="newRowPosition" width="120px" index={0} change={ddChange.bind(this)} ref={d => dropDownInstance = d} dataSource={droplist} fields={{ text: 'text', value: 'value' }} />
                  </div>
                </td>
              </tr>
            </table>
          </PropertyPane>
        </div>
        <div id="action-description">
          <p>This sample demonstrates CRUD operations in Grid. You can perform CRUD operations as follows,</p>
          <ul>
            <li><code>Add</code> -  To add new record, click Add toolbar button </li>
            <li><code>Edit</code> - To edit record, double click a row or click toolbar Edit button after selected a row </li>
            <li><code>Delete</code> - To delete record, click toolbar Delete button after selected a row </li>
            <li><code>Update</code>,<code>Cancel</code> - You can save or discard changes by click toolbar Update and cancel button respectively</li>
          </ul>
          <p>By default, a new row will be added at the top of the grid. You can change it by setting <code>editSettings.newRowPosition</code> as <code>Bottom</code></p>
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
            In this demo, Normal mode is enabled for editing. You can start edit any row by double clicking on it or clicking on toolbar’s
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
export default NormalEdit;