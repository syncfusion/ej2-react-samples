import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, Toolbar, Edit, ColumnDirective, ColumnsDirective, ContextMenu } from '@syncfusion/ej2-react-gantt';
import { splitTasksData } from './data';
import { updateSampleSection } from '../common/sample-base';

function SplitTasks() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  const taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks',
    segments: 'Segments'
  };
  const editSettings: any = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true
  };
  const toolbar: any = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
  const splitterSettings: any = {
    columnIndex: 2
  };
  const labelSettings: any = {
    leftLabel: 'TaskName',
    taskLabel: '${Progress}%'
  };
  const projectStartDate: Date = new Date('01/30/2019');
  const projectEndDate: Date = new Date('03/04/2019');
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='SplitTasks' dataSource={splitTasksData} treeColumnIndex={1} labelSettings={labelSettings}
          allowSelection={true} highlightWeekends={true} enableContextMenu={true} toolbar={toolbar} editSettings={editSettings}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate}
          taskFields={taskFields} splitterSettings={splitterSettings} height='450px'>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' width='80' />
            <ColumnDirective field='TaskName' headerText='Task Name' />
            <ColumnDirective field='StartDate' />
            <ColumnDirective field='EndDate' />
            <ColumnDirective field='Duration' />
            <ColumnDirective field='Progress' />
            <ColumnDirective field='Predecessor' />
          </ColumnsDirective>
          <Inject services={[Selection, Toolbar, Edit, ContextMenu]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the split tasks support in the Gantt Chart. This support allows an interruption in
          the task due to circumstances such as the occurrence of an unplanned event or reprioritization of already planned events.
          Sometimes a task may be interrupted due to unexpected situations. In such situtations, the pending work can be split into segments
          and the work can be resumed at a different date.</p>
      </div>
      <div id="description">
        <p>The split tasks can be called the segments of a task. A task can be split into any number of segments with a minimum of one time unit cell. Segments
          can be defined in the <code>taskFields.segments</code> property. Segments can be created or merged by two ways: Using Edit Dialog and Context Menu.
        </p>
        <p>A task must have a duration of minimum two time unit cells in order to be split. Similarly, milestone tasks or parent tasks cannot be split into segments.</p>
      </div>
    </div>
  )
}
export default SplitTasks;