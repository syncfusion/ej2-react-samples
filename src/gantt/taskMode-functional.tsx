import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, DayMarkers, Inject, Selection, Toolbar, Edit, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { taskModeData } from './data';
import { updateSampleSection } from '../common/sample-base';

const TaskMode = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const taskFields: any = {
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
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const splitterSettings: any = {
    position: "35%"
  };
  const editSettings: any = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true
  };
  const toolbar: any = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
  const projectStartDate: Date = new Date('02/20/2024');
  const projectEndDate: Date = new Date('03/30/2024');

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='TaskMode' dataSource={taskModeData} treeColumnIndex={1}
          allowSelection={true} highlightWeekends={true} toolbar={toolbar} editSettings={editSettings}
          splitterSettings={splitterSettings} height='450px' taskMode='Custom'
          taskFields={taskFields} labelSettings={labelSettings}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' visible={false} ></ColumnDirective>
            <ColumnDirective field='TaskName' headerText='Task Name'></ColumnDirective>
            <ColumnDirective field='isManual' headerText='Task Mode'></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Edit, Selection, Toolbar, DayMarkers]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>The Gantt provides support for automatic and manual task scheduling modes. Scheduling mode of a task is used to indicate whether the start and end dates of a task will be automatically validated or not. Using the property <code>taskMode</code> we can able to change the scheduling mode of a task. The following are the enumeration values that can be set to the property <code>taskMode</code>.</p>
        <ul>
          <li>Auto</li>
          <li>Manual</li>
          <li>Custom</li>
        </ul>
      </div>

      <div id="description">
        <p>When the <code>taskMode</code> property is set as <code>Auto</code> scheduling mode, all the tasks in the project will be rendered as automatically scheduled tasks. Thus the start and end dates of the tasks in the project will be automatically validated.</p>
        <p>When the <code>taskMode</code> property is set as <code>Manual</code> scheduling mode, all the tasks in the project will be rendered as manually scheduled tasks. Thus the dates of the tasks will not get validated automatically by the system.</p>
        <p>When the <code>taskMode</code> property is set as <code>Custom</code>, the scheduling mode for each tasks will be mapped form the data source field. The property <code>manual</code> is used to map the scheduling mode field from the data source.</p>
        <p>Gantt component features are segregated into individual feature-wise modules. To use editing feature, inject the <code>Edit</code> module using the <code>Gantt.Inject(Edit)</code> method. To use a selection, inject the <code>Selection</code> module using the <code>Gantt.Inject(Selection)</code> method, and to use toolbar by injecting the <code>Toolbar</code> module using the <code>Gantt.Inject(Toolbar)</code> method. </p>
      </div>
    </div>
  )
}
export default TaskMode;

