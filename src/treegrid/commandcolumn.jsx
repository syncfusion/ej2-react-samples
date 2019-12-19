import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Edit, CommandColumn } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
export class Command extends SampleBase {
    constructor() {
        super(...arguments);
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Row' };
        this.taskIDRule = { required: true, number: true };
        this.taskNameRule = { required: true };
        this.dateRule = { date: true };
        this.durationRule = { number: true, min: 0 };
        this.editparams2 = { params: { format: 'n' } };
        this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
            { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
            { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
            { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='400' editSettings={this.editSettings}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='80' textAlign='Right' validationRules={this.taskIDRule} isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='200' validationRules={this.taskNameRule}></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='140' textAlign='Right' editType='datepickeredit' format='yMd' validationRules={this.dateRule} type='date'/>
              <ColumnDirective field='duration' headerText='Duration' width='90' editType='numericedit' textAlign='Right' validationRules={this.durationRule} edit={this.editparams2}/>
              <ColumnDirective field='progress' headerText='Progress' width='90' textAlign='Right' editType='numericedit' validationRules={this.durationRule} edit={this.editparams2}/>
              <ColumnDirective headerText='Manage Records' width='160' commands={this.commands}></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Edit, CommandColumn]}/>
          </TreeGridComponent>
        </div>
        <div id="action-description">
        <p>
            This sample demonstrates CRUD operations in TreeGrid using command column. You can perform CRUD operations as follows,
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
            The TreeGrid provides an option to render CRUD action buttons in a column by using the <b>CommandColumn</b> feature.
              The <code>columns->commands</code> property accepts array of CommandModel object. The predefined command button
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
          <p>TreeGrid features are segregated into individual feature-wise modules. To use editing feature,
             we need to inject <code>Edit</code> module into the <code>services</code>.</p>
          <p>
            More information on the selection configuration can be found in this documentation section.
          </p>

        </div>
      </div>);
    }
}
