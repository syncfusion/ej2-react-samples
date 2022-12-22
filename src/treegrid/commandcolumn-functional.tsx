import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Edit, CommandColumn } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { updateSampleSection } from '../common/sample-base';

function Command() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  const editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Row' };
  const taskIDRule: Object = { required: true, number: true };
  const taskNameRule: Object = { required: true };
  const dateRule: Object = { date: true };
  const durationRule: Object = { number: true, min: 0 };
  const editparams2: any = { params: { format: 'n' } };
  const commands: any = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
  { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
  { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
  { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='400'
          editSettings={editSettings}>
          <ColumnsDirective>
            <ColumnDirective field='taskID' headerText='Task ID' width='80' textAlign='Right' validationRules={taskIDRule}
              isPrimaryKey={true}></ColumnDirective>
            <ColumnDirective field='taskName' headerText='Task Name' width='200' validationRules={taskNameRule}></ColumnDirective>
            <ColumnDirective field='startDate' headerText='Start Date' width='140' textAlign='Right'
              editType='datepickeredit' format='yMd' validationRules={dateRule} type='date' />
            <ColumnDirective field='duration' headerText='Duration' width='90' editType='numericedit' textAlign='Right'
              validationRules={durationRule} edit={editparams2} />
            <ColumnDirective field='progress' headerText='Progress' width='90' textAlign='Right' editType='numericedit'
              validationRules={durationRule} edit={editparams2} />
            <ColumnDirective headerText='Manage Records' width='160' commands={commands}></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Edit, CommandColumn]} />
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
export default Command;