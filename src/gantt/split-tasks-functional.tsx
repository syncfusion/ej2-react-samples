import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, Inject, Selection, Toolbar, Edit, ColumnDirective, ColumnsDirective, ContextMenu } from '@syncfusion/ej2-react-gantt';
import { splitTasksData } from './data';
import { updateSampleSection } from '../common/sample-base';

const SplitTasks = () => {
  useEffect(() => {
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
   position: "35%"
  };
  const labelSettings: any = {
    leftLabel: 'TaskName',
    taskLabel: '${Progress}%'
  };
  const projectStartDate: Date = new Date('01/29/2025');
  const projectEndDate: Date = new Date('04/20/2025');
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='SplitTasks' dataSource={splitTasksData} treeColumnIndex={1} labelSettings={labelSettings}
          allowSelection={true} highlightWeekends={true} enableContextMenu={true} toolbar={toolbar} editSettings={editSettings}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate}
          taskFields={taskFields} splitterSettings={splitterSettings} height='650px' taskbarHeight={25} rowHeight={46}>
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
          can be defined in the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/taskFieldsModel/#segments">taskFields.segments</a> property. Segments can be created or merged by two ways: Using Edit Dialog and Context Menu.
        </p>
        <p>A task must have a duration of minimum two time unit cells in order to be split. Similarly, milestone tasks or parent tasks cannot be split into segments.</p>
        <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/managing-tasks/splitting-and-merging-tasks">documentation section</a>.</p>
      </div>
    </div>
  )
}
export default SplitTasks;
