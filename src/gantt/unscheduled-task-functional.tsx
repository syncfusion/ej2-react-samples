import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Edit, Toolbar, Selection, EditSettingsModel, LabelSettingsModel, SplitterSettingsModel, ToolbarItem, ColumnModel, DayMarkers } from '@syncfusion/ej2-react-gantt';
import { unscheduledData } from './data';
import { updateSampleSection } from '../common/sample-base';
import './unscheduled.css';

const UnscheduledTask = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let ganttInstance = useRef<GanttComponent>(null);
  const taskFields: TaskFieldsModel = {
    id: 'TaskId',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
  };
  const editSettings: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
  };
  const toolbar: any = [{ text: 'Insert task', tooltipText: 'Insert task at top', id: 'toolbarAdd', prefixIcon: 'e-add-icon tb-icons' }];
  const labelSettings: LabelSettingsModel = {
    leftLabel: 'TaskName',
    rightLabel: 'TaskType'
  };
  const splitterSettings: SplitterSettingsModel = {
    columnIndex: 4
  };
  const columns: ColumnModel[] = [
    { field: 'TaskId', width: 90 },
    { field: 'TaskName', width: 150 },
    { field: 'StartDate', width: 120 },
    { field: 'EndDate', width: 120 },
    { field: 'Duration', width: 90 }
  ];
  const projectStartDate: Date = new Date('12/29/2024');
  const projectEndDate: Date = new Date('02/14/2025');
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
          taskFields={taskFields} height='650px' taskbarHeight={25} rowHeight={46} editSettings={editSettings} allowSelection={true}
          toolbar={toolbar} labelSettings={labelSettings} allowUnscheduledTasks={true} highlightWeekends={true}
          toolbarClick={toolbarClickEvent.bind(this)} splitterSettings={splitterSettings} columns={columns}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
          <Inject services={[Toolbar, Edit, Selection, DayMarkers]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample visualizes the support for displaying unscheduled tasks in Gantt and adding empty rows using the custom toolbar button.</p>
      </div>

      <div id="description">
        <p>
          Unscheduled tasks are tasks in a project that are not scheduled with proper dates or duration at the commencement of the project.
          These tasks can be scheduled properly at any time during project implementation based on factors such as resource availability, dependent tasks, and more.
          This example shows how to display the unscheduled tasks in Gantt by enabling the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#allowunscheduledtasks">allowUnscheduledTasks</a> property.
          This also shows how to add an empty row in Gantt by using a custom toolbar button click action. By using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/index-default#toolbarclick">toolbarClick</a> event and <code>addRecord</code> method,
          an empty row can be added at the top of the rows with undefined task details.
        </p>
        <p>
        Gantt component features are segregated into individual feature-wise modules. To use a toolbar, selection and add features, we need to inject the <code>Toolbar</code>, <code>Selection</code> and <code>Edit</code> into the <code>Inject Services</code> section.
        </p>
        <br />
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/scheduling-tasks#enable-unscheduled-tasks">scheduling tasks</a> documentation section.</p>
        <br/>
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
      </div>
    </div>
  )
}
export default UnscheduledTask;
