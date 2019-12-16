import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Edit, Toolbar } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
export class EditType extends SampleBase {
    constructor() {
        super(...arguments);
        this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, showDeleteConfirmDialog: true, mode: 'Row',
            newRowPosition: 'Above' };
        this.editparams = { params: { popupHeight: '300px' } };
        this.validationRule = { required: true };
        this.validationRule1 = { date: true };
        this.validationRule2 = { required: true, number: true };
        this.editparams2 = { params: { format: 'n' } };
        this.pageSettings = { pageCount: 5 };
        this.format = { type: 'dateTime', format: 'M/d/y hh:mm a' };
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='400' editSettings={this.editSettings} pageSettings={this.pageSettings} toolbar={this.toolbarOptions}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='80' textAlign='Right' validationRules={this.validationRule} isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='150' validationRules={this.validationRule}></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='170' textAlign='Right' editType='datetimepickeredit' format={this.format} validationRules={this.validationRule1}/>
              <ColumnDirective field='duration' headerText='Duration' width='90' editType='numericedit' textAlign='Right' validationRules={this.validationRule2} edit={this.editparams2}/>
              <ColumnDirective field='progress' headerText='Progress' width='90' textAlign='Right' editType='dropdownedit' edit={this.editparams}/>
              <ColumnDirective field='priority' headerText='Priority' width='90' textAlign='Right' editType='dropdownedit' edit={this.editparams}/>
            </ColumnsDirective>
            <Inject services={[Page, Edit, Toolbar]}/>
          </TreeGridComponent>
        </div>
        <div id="action-description">
        <p>
            This sample demonstrates the supported cell edit types of TreeGrid columns. The list of cell edit types are as follows,
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
            In this sample, we show the following editTypes for the TreeGrid columns
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
          <p>TreeGrid features are segregated into individual feature-wise modules. To use editing feature, we need to inject
             <code>Edit</code>module into the <code>services</code>.</p>
          <p>
            More information on the selection configuration can be found in this documentation section.
          </p>
        </div>
      </div>);
    }
}
