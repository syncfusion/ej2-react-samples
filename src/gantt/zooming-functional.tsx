import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Toolbar, ColumnsDirective, ColumnDirective, LabelSettingsModel, SplitterSettingsModel, ToolbarItem } from '@syncfusion/ej2-react-gantt';
import { zoomingData } from './data';
import { updateSampleSection } from '../common/sample-base';

const Zooming = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
  const labelSettings: LabelSettingsModel = {
    leftLabel: 'TaskName'
  };
  const splitterSettings: SplitterSettingsModel = {
    columnIndex: 3
  };
  const projectStartDate: Date = new Date('03/26/2025');
  const projectEndDate: Date = new Date('06/01/2025');
  const toolbar: ToolbarItem[] = ['ZoomIn', 'ZoomOut', 'ZoomToFit'];
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='Zooming' dataSource={zoomingData} toolbar={toolbar}
          treeColumnIndex={1} splitterSettings={splitterSettings} projectStartDate={projectStartDate} projectEndDate={projectEndDate}
          taskFields={taskFields} labelSettings={labelSettings} height='650px' taskbarHeight={25} rowHeight={46}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' width='80'></ColumnDirective>
            <ColumnDirective field='TaskName' width='250'></ColumnDirective>
            <ColumnDirective field='StartDate'></ColumnDirective>
            <ColumnDirective field='EndDate' ></ColumnDirective>
            <ColumnDirective field='Duration' ></ColumnDirective>
            <ColumnDirective field='Progress' ></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Toolbar]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the timeline zooming feature in the Gantt Chart. Use the toolbar options to zoom in, zoom out, or adjust the timeline to fit all tasks within the available chart width.</p>
      </div>

      <div id="description">
        <p>
          This sample demonstrates the timeline zooming functionality in the Gantt Chart. The toolbar provides built-in options to adjust the timeline scale and navigate project schedules at different levels of detail.</p>
          <ul>
            <li><code>ZoomIn</code> - Increases the timeline scale to display task details more closely.</li>
            <li><code>ZoomOut </code> - Decreases the timeline scale to provide a broader view of the project schedule.</li>
            <li><code>ZoomToFit </code> - Automatically adjusts the timeline so that all tasks are visible within the current chart area.</li>
        </ul>
        <p>Zooming dynamically updates the timeline view mode and cell width, allowing project schedules to be viewed across different time spans, ranging from detailed task-level views to high-level project overviews.</p>
        <br />
        <p>
        Gantt component features are segregated into individual feature-wise modules. To use a zooming feature, we need to inject the <code>Toolbar</code> into the <code>Inject Services</code> section.
        </p>
        <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/time-line/zooming">zooming</a> documentation section.</p>
        <br/>
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
      </div>
    </div>
  )
}
export default Zooming;
