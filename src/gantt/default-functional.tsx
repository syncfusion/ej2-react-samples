import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection, ColumnsDirective, ColumnDirective, LabelSettingsModel, SplitterSettingsModel } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';

const Default = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let ganttInstance: GanttComponent;
  const taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID: 'ParentId'
  };
  const labelSettings: LabelSettingsModel = {
    leftLabel: 'TaskName'
  };
  const splitterSettings: SplitterSettingsModel = {
    columnIndex: 2
  };
  const projectStartDate: Date = new Date('03/26/2025');
  const projectEndDate: Date = new Date('07/20/2025');
  const onCreated = (): void => {
    if (document.querySelector('.e-bigger')) {
      ganttInstance.rowHeight = 48;
      ganttInstance.taskbarHeight = 28;
    }
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='Default' ref={gantt => ganttInstance = gantt} dataSource={projectNewData} treeColumnIndex={1}
          taskFields={taskFields} splitterSettings={splitterSettings} labelSettings={labelSettings} height='650px' taskbarHeight={25} rowHeight={46}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate} created={onCreated}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
            <ColumnDirective field='TaskName' headerText='Job Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
            <ColumnDirective field='StartDate'></ColumnDirective>
            <ColumnDirective field='Duration'></ColumnDirective>
            <ColumnDirective field='Progress'></ColumnDirective>
            <ColumnDirective field='Predecessor'></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Selection]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample visualizes the various phases involved in a manufacturing process of a product which transforms from
          a conceptual model to a sellable product.</p>
      </div>
      <div id="description">
        <p>
          In this example, you can see how to render a Gantt Chart using the provided data source. The default Week-Day timeline view mode is applied. Dependency lines are enabled to visualize the execution order and relationships between tasks.
        </p>
        <p>
          Tooltips are enabled across the Gantt Chart UI. To view a tooltip, hover over a taskbar, timeline cell, or dependency line. On touch-enabled devices, tap the corresponding element to view its tooltip
        </p>
        <p>
          Gantt component features are segregated into individual feature-wise modules. To use selection feature, inject the <code>Selection</code> into the <code>Inject Services</code> section.
        </p>
        <br />
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/getting-started">documentation section</a>.</p>
        <br />
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
      </div>
    </div>
  )
}
export default Default;