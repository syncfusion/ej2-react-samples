import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar, NewRowPosition, Sort, FilterSettingsModel, Filter } from '@syncfusion/ej2-react-grids';
import { orderDataSource } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

function NormalEdit() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  const filterSettings: FilterSettingsModel = {type: 'Excel'};
  const toolbarOptions: any = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  const editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, showAddNewRow: true, newRowPosition: 'Top' };
  const editparams: any = { params: { popupHeight: '300px' } };
  const customeridRule: Object = { required: true, minLength: 5};
  const freightRule: Object = { required: true, min: 0};
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
    gridInstance.refresh();
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-md-9'>
          <GridComponent dataSource={orderDataSource} ref={grid => gridInstance = grid} toolbar={toolbarOptions} allowSorting={true} allowFiltering={true} filterSettings={filterSettings} allowPaging={true} editSettings={editSettings} pageSettings={pageSettings}
            actionBegin={actionBegin.bind(this)}>
            <ColumnsDirective>
              <ColumnDirective field='OrderID' headerText='Order ID' width='140' textAlign='Right' validationRules={orderidRules} isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={customeridRule}></ColumnDirective>
              <ColumnDirective field='Freight' headerText='Freight' width='140' format='C2' textAlign='Right' validationRules={freightRule} editType='numericedit' ></ColumnDirective>
              <ColumnDirective field='OrderDate' headerText='Order Date' editType='datetimepickeredit' format={format} width='160' ></ColumnDirective>
              <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' edit={editparams} ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, Toolbar, Edit, Sort, Filter]} />
          </GridComponent>
        </div>

        <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
              <tbody>
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
              </tbody>
            </table>
          </PropertyPane>
        </div>
        <div id="action-description">
        <p>In this demo, you can edit the currently selected record by changing the state of the corresponding record to edit. You can carry out the following CRUD operations:</p>
         <ul>
                <li><code>Add</code> -  To add a new record, click the add toolbar button. </li>
                <li><code>Edit</code> - To edit record, double click a cell. </li>
                <li><code>Delete</code> - To delete a record, click the toolbar delete button after selecting a row. </li>
                <li><code>Update</code> and <code>Cancel</code> - Save or discard changes by clicking the toolbar update and cancel button respectively.</li>
            </ul>
            <p>By default, a new row will be added at the top of the grid. You can change it by setting <code>editSettings.newRowPosition</code> as <code>Bottom</code></p>
           </div>
        <div id="description">
          <p> Grid supports CRUD operations. This CRUD operations can be configured using
            <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/editSettings/">
            editSettings</a></code>. It also has the following modes to manipulate the datasource.
          </p>
          <ul>
              <li><code>Normal</code></li>
              <li><code>Dialog</code></li>
              <li><code>Batch</code></li>
          </ul>
          <p>
              In the normal edit mode, when you start editing the currently selected record is changed to edit state. You can edit any row by double clicking it or clicking the toolbar’s
              <code>Edit</code> button. You can change the row values and save edited data to the data source.
          </p>
          <p>
              In order to add a new record easily, the grid content always displays a blank "add new row".
              You can enable this feature by setting the <code>showAddNewRow</code> property of <code>editSettings</code> to true.
          </p>
          <p style={{ fontWeight: 500 }}>Injecting Module</p>
          <p>
            Grid features are separated into feature-wise modules. To use the editing feature, inject
            <code><a target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/api/grid/edit/">
            Edit
            </a></code> module into the <code>services</code>.
          </p>
          <p>
            More information on the inline editing can be found in this 
            <a target="_blank"
              href="https://ej2.syncfusion.com/react/documentation/grid/editing/in-line-editing">
              documentation section</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
export default NormalEdit;