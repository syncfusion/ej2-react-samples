import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Edit, Toolbar, Page, Inject, Sort, BeforeAutoFillEventArgs, FilterSettingsModel, Filter } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { updateSampleSection } from '../common/sample-base';

function BatchEdit() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  const toolbarOptions: any = ['Add', 'Delete', 'Update', 'Cancel'];
  const filterSettings: FilterSettingsModel = {type: 'Excel'};
  const editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch' };
  const editparams: any = { params: { popupHeight: '300px' } };
  const customeridRule: Object = { required: true, minLength: 5};
  const freightRule: Object = { required: true, min: 0};
  const orderidRules: Object = { required: true, number: true };
  const pageSettings: Object = { pageCount: 5 };
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-md-9'>
          <GridComponent dataSource={data} pageSettings={pageSettings} allowSorting={true} toolbar={toolbarOptions} allowPaging={true} editSettings={editSettings} allowFiltering={true} filterSettings={filterSettings}>
            <ColumnsDirective>
              <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' validationRules={orderidRules} isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={customeridRule}></ColumnDirective>
              <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' validationRules={freightRule} editType='numericedit' ></ColumnDirective>
              <ColumnDirective field='OrderDate' headerText='Order Date' editType='datepickeredit' format='yMd' width='170'></ColumnDirective>
              <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' edit={editparams} ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, Toolbar, Edit, Sort, Filter]} />
          </GridComponent>
        </div>
        <div id="action-description">
        <p>This sample demonstrates CRUD operations in Grid. You can perform CRUD operations as follows,</p>
         <ul>
                <li><code>Add</code> -  To add a new record, click the add toolbar button. </li>
                <li><code>Edit</code> - To edit record, double-click a cell. </li>
                <li><code>Delete</code> - To delete record, click the toolbar delete button after selecting a row. </li>
                <li><code>Update</code> and <code>Cancel</code> - Save or discard changes by clicking the toolbar update and cancel button respectively.</li>
            </ul>
        </div>
        <div id="description">
            <p> Grid supports CRUD operations and they can be configured using
              <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/editSettings/">
              editSettings</a></code>. It has the following modes to manipulate the datasource.
            </p>
            <ul>
              <li><code>Normal</code></li>
              <li><code>Dialog</code></li>
              <li><code>Batch</code></li>
            </ul>
            <p>
              In this demo, the Batch mode is enabled for editing by defining the <code><a target="_blank" className="code"
                href="https://ej2.syncfusion.com/react/documentation/api/grid/editSettings/#mode">
                editSettings.mode
              </a></code> as <code>batch</code>. You can start editing by double clicking a cell and changing the cell value.
              The edited cell will be highlighted while navigating to a new cell.
              You can bulk save the edited data to the datasource by clicking the toolbar's <code>update</code> button or by externally
              invoking the <code><a target="_blank" className="code"
                href="https://ej2.syncfusion.com/react/documentation/api/grid/edit/#batchsave">
                batchSave
              </a></code> method.
            </p>
            <p style={{ fontWeight: 500 }}>Injecting Module:</p>
            <p>
              Grid features are separated into feature-wise modules. To use the editing feature, inject the
              <code><a target="_blank" className="code"
                href="https://ej2.syncfusion.com/react/documentation/api/grid/edit/">
                Edit
              </a></code> module into the <code>services</code>.
            </p>
            <p>
            More information on the batch editing can be found in this 
            <a target="_blank"
              href="https://ej2.syncfusion.com/react/documentation/grid/editing/batch-editing">
              documentation section</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
export default BatchEdit;