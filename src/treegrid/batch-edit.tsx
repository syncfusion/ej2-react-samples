import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Edit, Toolbar } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

export class Batch extends SampleBase<{}, {}> {

  public treegridObj: TreeGridComponent;

  public toolbarOptions: any = ['Add', 'Delete', 'Update', 'Cancel'];
  public editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch', newRowPosition: 'Below' };
  public validationRule: Object = { required: true};
  public validationRule1: Object = { date: true};
  public validationRule2: Object = { required: true, number: true};
  public editparams2: any = { params: { format: 'n' } };
  render() {
    return (
        <div className='control-pane'>
        <div className='control-section'>
            <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping= 'subtasks' height='350'
              editSettings={this.editSettings} toolbar={this.toolbarOptions}
              ref={treegrid=> this.treegridObj = treegrid} >
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='90' textAlign='Right' validationRules={this.validationRule}
                isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='220' validationRules={this.validationRule}></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='160' textAlign='Right'
                editType='datepickeredit' format='yMd' validationRules={this.validationRule1} />
              <ColumnDirective field='duration' headerText='Duration' width='140' editType='numericedit' textAlign='Right'
                validationRules={this.validationRule2} edit={this.editparams2} />
            </ColumnsDirective>
            <Inject services={[Edit, Toolbar]}/>
          </TreeGridComponent>
          </div>
        <div id="action-description">
        <p>This sample demonstrates CRUD operations in Tree Grid. You can perform CRUD operations as follows,</p>
          <ul>
            <li><code>Add</code> -  To add new record, click Add toolbar button </li>
            <li><code>Edit</code> - To edit record, double click a cell </li>
            <li><code>Delete</code> - To delete record, click toolbar Delete button after selected a row </li>
            <li><code>Update</code>,<code>Cancel</code> - You can save or discard changes by click toolbar Update 
              and cancel button respectively</li>
          </ul>
    </div>
    <div id='description'>
          <p>The Tree Grid supports CRUD operations. This CRUD operations can be configured in Tree Grid using editSettings. Also, it has
            different modes to manipulate the datasource.</p>
          <ul>
            <li><code>Row</code></li>
            <li><code>Cell</code></li>
            <li><code>Dialog</code></li>
            <li><code>Batch</code></li>
          </ul>
          <p>
            In this demo, Batch mode is enabled for editing by defining <code>editSettings.mode</code> as <code>Batch</code> with
             <code>editSettings.newRowPosition</code> as <code>Below</code>.
            You can start editing by double clicking a cell and can change the cell value. The edited cell will be highlighted while
             navigating to a new cell, so that you know which cells had been edited.
            You can bulk save the edited data to the datasource by click on the toolbar's update button.
         </p>
          <p>Injecting Module:</p>
          <p>Tree Grid features are segregated into individual feature-wise modules. To use editing feature, we need to inject
             <code>Edit</code> module into the <code>services</code>.</p>
          <p>
            More information on the selection configuration can be found in this <code><a target="_blank" 
        href="https://ej2.syncfusion.com/react/documentation/treegrid/edit/#batch">
        documentation section.
        </a></code>
          </p>
        </div>
        </div>
    )
  }
}