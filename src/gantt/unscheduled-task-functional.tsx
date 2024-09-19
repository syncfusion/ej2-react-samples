import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, Inject, Edit, Toolbar, Selection } from '@syncfusion/ej2-react-gantt';
import { unscheduledData } from './data';
import { updateSampleSection } from '../common/sample-base';
import './unscheduled.css'

const UnscheduledTask = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let ganttInstance = useRef<GanttComponent>(null);
  const taskFields: any = {
    id: 'TaskId',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
  };
  const editSettings: any = {
    allowAdding: true,
    allowEditing: true,
  };
  const toolbar: any = [{ text: 'Insert task', tooltipText: 'Insert task at top', id: 'toolbarAdd', prefixIcon: 'e-add-icon tb-icons' }];
  const labelSettings: any = {
    leftLabel: 'TaskName',
    rightLabel: 'TaskType'
  };
  const splitterSettings: any = {
    columnIndex: 4
  };
  const columns: any = [
    { field: 'TaskId', width: 90 },
    { field: 'TaskName', width: 80 },
    { field: 'StartDate', width: 120 },
    { field: 'EndDate', width: 120 },
    { field: 'Duration', width: 90 }
  ];
  const projectStartDate: any = new Date('01/01/2024');
  const projectEndDate: any = new Date('01/20/2024');
  const toolbarClickEvent = (): void => {
    var data = {
      Duration: null,
      StartDate: null,
      EndDate: null,
      TaskType: ''
    };
    ganttInstance.current.addRecord(data)
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='Unscheduled' ref={ganttInstance} dataSource={unscheduledData}
          taskFields={taskFields} height='410px' editSettings={editSettings} allowSelection={true}
          toolbar={toolbar} labelSettings={labelSettings} allowUnscheduledTasks={true}
          toolbarClick={toolbarClickEvent.bind(this)} splitterSettings={splitterSettings} columns={columns}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
          <Inject services={[Toolbar, Edit, Selection]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample visualizes the support for displaying unscheduled tasks in Gantt and adding empty rows using the custom toolbar button.</p>
      </div>

      <div id="description">
        <p>
          Unscheduled tasks are tasks in a project that are not scheduled with proper dates or duration at the commencement of the project.
          These tasks can be scheduled properly at any time during project implementation based on factors such as resource availability, dependent tasks, and more.
          This example shows how to display the unscheduled tasks in Gantt by enabling the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#allowunscheduledtasks">allowUnscheuldedTasks</a> property.
          This also shows how to add an empty row in Gantt by using a custom toolbar button click action. By using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#toolbarclick">toolbarClick</a> event and <code>addRecord</code> method,
          an empty row can be added at the top of the rows with undefined task details.
        </p>
        <p>
          Gantt component features are segregated into individual feature-wise modules. To use a toolbar and add support, inject the <code>Toolbar</code> and <code>Edit</code> module.
          To use a selection, inject the <code>Selection</code> module.
        </p>
      </div>
    </div>
  )
}
export default UnscheduledTask;
