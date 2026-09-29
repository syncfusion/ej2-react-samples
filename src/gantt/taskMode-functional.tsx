import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, TaskFieldsModel, DayMarkers, Inject, Selection, Toolbar, Edit, ColumnsDirective, ColumnDirective, EditSettingsModel, LabelSettingsModel, SplitterSettingsModel, ToolbarItem } from '@syncfusion/ej2-react-gantt';
import { taskModeData } from './data';
import { updateSampleSection } from '../common/sample-base';

const TaskMode = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration',
    progress: 'Progress',
    endDate: 'EndDate',
    dependency: 'Predecessor',
    child: 'Children',
    manual: 'isManual'
  };
  const labelSettings: LabelSettingsModel = {
    leftLabel: 'TaskName'
  };
  const splitterSettings: SplitterSettingsModel = {
    columnIndex: 2
  };
  const editSettings: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true
  };
  const toolbar: ToolbarItem[]= ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
  const projectStartDate: Date = new Date('02/18/2025');
  const projectEndDate: Date = new Date('03/30/2025');

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='TaskMode' dataSource={taskModeData} treeColumnIndex={1}
          allowSelection={true} highlightWeekends={true} toolbar={toolbar} editSettings={editSettings}
          splitterSettings={splitterSettings} height='650px' taskbarHeight={25} rowHeight={46} taskMode='Custom'
          taskFields={taskFields} labelSettings={labelSettings}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate} validateManualTasksOnLinking={true}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' visible={false} ></ColumnDirective>
            <ColumnDirective field='TaskName' headerText='Task Name' width= '130'></ColumnDirective>
            <ColumnDirective field='isManual' headerText='Task Mode' width= '120'></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Edit, Selection, Toolbar, DayMarkers]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>The Gantt provides support for automatic and manual task scheduling modes. Scheduling mode of a task is used to indicate whether the start and end dates of a task will be automatically validated or not. Using the property <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#taskmode">taskMode</a> property controls whether tasks are scheduled automatically, manually, or through a custom mode that maps the scheduling behavior from the data source.</p>
      </div>

      <div id="description">
        <p>The Gantt Chart supports three scheduling modes through the <code>taskMode</code> property: <code>Auto</code>, <code>Manual</code> and <code>Custom</code></p>
        <ul>
          <li><code>Auto</code> - All tasks are automatically scheduled, and task dates are validated based on scheduling rules and dependencies.</li>
          <li><code>Manual</code> - All tasks are manually scheduled, and task dates are maintained without automatic validation.</li>
          <li><code>Custom</code> - The scheduling mode is determined for each task individually using a mapped data source field.</li>
        </ul>
        <p>In this sample, <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#taskmode">taskMode</a></code> property is set <code>Custom</code>, and the scheduling behavior of each task is mapped using the <code>Manual</code> task field. This allows both automatically scheduled and manually scheduled tasks to coexist within the same project.</p>
        <p>Gantt component features are segregated into individual feature-wise modules. To use editing, selection, markers and toolbar features, we need to inject the <code>Edit</code>, <code>Selection</code>, <code>DayMarkers</code> and <code>Toolbar</code> into the <code>Inject Services</code> section.</p>
        <br />
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/scheduling-tasks">scheduling tasks</a> documentation section.</p>
        <br/>
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
      </div>
    </div>
  )
}
export default TaskMode;

