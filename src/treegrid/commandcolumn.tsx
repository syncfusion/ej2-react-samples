import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Edit, CommandColumn } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';

export class Command extends SampleBase<{}, {}> {
  public editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Row' };
  public taskIDRule: Object = { required: true, number: true};
  public taskNameRule: Object = { required: true};
  public dateRule: Object = { date: true};
  public durationRule: Object = { number: true, min: 0};
  public editparams2: any = { params: { format: 'n' } };
  public commands: any = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
  { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
  { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
  { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping= 'subtasks' height='400'
            editSettings={this.editSettings}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='80' textAlign='Right' validationRules={this.taskIDRule}
                isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='200' validationRules={this.taskNameRule}></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='140' textAlign='Right'
                editType='datepickeredit' format='yMd' validationRules={this.dateRule} type='date' />
              <ColumnDirective field='duration' headerText='Duration' width='130' editType='numericedit' textAlign='Right'
                validationRules={this.durationRule} edit={this.editparams2} />
              <ColumnDirective field='progress' headerText='Progress' width='150' textAlign='Right' editType='numericedit' 
                validationRules={this.durationRule} edit={this.editparams2} />
              <ColumnDirective headerText='Manage Records' width='160' commands={this.commands}></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Edit, CommandColumn]}/>
          </TreeGridComponent>
        </div>
        <div id="action-description">
        <p>
            This sample demonstrates CRUD operations in Tree Grid using command column. You can perform CRUD operations as follows,
        </p>
        <ul>
            <li><code>Edit</code> - To edit record, double click a row or click Edit button from command column after selected a row.</li>
            <li><code>Delete</code> - To delete record, click Delete button from command column after selected a row.</li>
            <li><code>Update, Cancel</code> -You can save or discard changes by click Update and Cancel button from command
                column respectively.</li>
        </ul>
        </div>
        <div id="description">
        <p>
            The Tree Grid provides an option to render CRUD action buttons in a column by using the <b>CommandColumn</b> feature.
              The <code>columns-&gt;commands</code> property accepts array of CommandModel object. The predefined command button
              can be defined by using type property.
        </p>
        <p>
            The built-in command button are,
        </p>
        <ul>
            <li><code>Edit </code></li>
            <li><code>Delete</code></li>
            <li><code>Cancel</code></li>
            <li><code>Save</code></li>
        </ul>
          <p>Injecting Module:</p>
          <p>Tree Grid features are segregated into individual feature-wise modules. To use editing feature,
             we need to inject <code>Edit</code> module into the <code>services</code>.</p>
          <p>
            More information on the selection configuration can be found in this documentation section.
          </p>

        </div>
      </div>
    )
  }
}