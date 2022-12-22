import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Edit, Toolbar } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { updateSampleSection } from '../common/sample-base';

function EditType() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  const toolbarOptions: any = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  const editSettings: any = {
    allowEditing: true, allowAdding: true, allowDeleting: true, showDeleteConfirmDialog: true, mode: 'Row',
    newRowPosition: 'Above'
  };
  const editparams: any = { params: { popupHeight: '300px' } };
  const validationRule: Object = { required: true };
  const validationRule1: Object = { date: true };
  const validationRule2: Object = { required: true, number: true };
  const editparams2: any = { params: { format: 'n' } };
  const pageSettings: Object = { pageCount: 5 };
  const format: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='400'
          editSettings={editSettings} pageSettings={pageSettings} toolbar={toolbarOptions}>
          <ColumnsDirective>
            <ColumnDirective field='taskID' headerText='Task ID' width='80' textAlign='Right' validationRules={validationRule}
              isPrimaryKey={true}></ColumnDirective>
            <ColumnDirective field='taskName' headerText='Task Name' width='150' validationRules={validationRule}></ColumnDirective>
            <ColumnDirective field='startDate' headerText='Start Date' width='170' textAlign='Right'
              editType='datetimepickeredit' format={format} validationRules={validationRule1} />
            <ColumnDirective field='duration' headerText='Duration' width='90' editType='numericedit' textAlign='Right'
              validationRules={validationRule2} edit={editparams2} />
            <ColumnDirective field='progress' headerText='Progress' width='90' textAlign='Right' editType='dropdownedit'
              edit={editparams} />
            <ColumnDirective field='priority' headerText='Priority' width='90' textAlign='Right' editType='dropdownedit'
              edit={editparams} />
          </ColumnsDirective>
          <Inject services={[Page, Edit, Toolbar]} />
        </TreeGridComponent>
      </div>
      <div id="action-description">
        <p>
          This sample demonstrates the supported cell edit types of Tree Grid columns. The list of cell edit types are as follows,
        </p>
        <ul>
          <li><code>NumericTextBox</code> component for integers, double, and decimal data types.</li>
          <li><code>TextBox</code> component for string data type.</li>
          <li><code>DropDownList</code> component for list data type.</li>
          <li><code>DatePicker</code> component for date data type.</li>
          <li><code>DateTimePicker</code> component for dateTime data type.</li>
          <li><code>Checkbox</code> component for boolean data type</li>
        </ul>
      </div>
      <div id="description">
        <p>
          The <code>columns.editType</code>  is used to customize the edit type of the particular column. You can set the columns
          editType based on data type of the column.
        </p>
        <p>
          In this sample, we show the following editTypes for the Tree Grid columns
        </p>
        <ul>
          <li><code>NumericTextBox</code></li>
          <li><code>TextBox</code></li>
          <li><code>DropDownList</code></li>
          <li><code>DatePicker</code></li>
          <li><code>DateTimePicker</code></li>
          <li><code>Checkbox</code></li>
        </ul>
        <p>Injecting Module:</p>
        <p>Tree Grid features are segregated into individual feature-wise modules. To use editing feature, we need to inject
          <code>Edit</code>module into the <code>services</code>.</p>
        <p>
          More information on the selection configuration can be found in this documentation section.
        </p>
      </div>
    </div>
  )
}
export default EditType;