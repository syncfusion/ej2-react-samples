import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective, LabelSettingsModel, SplitterSettingsModel } from '@syncfusion/ej2-react-gantt';
import { localData } from './data';
import { updateSampleSection } from '../common/sample-base';

const LocalData = () => {
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
    position: "35%"
  };
  const projectStartDate: Date = new Date('03/26/2025');
  const projectEndDate: Date = new Date('07/20/2025');

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='LocalData' dataSource={localData} highlightWeekends={true}
          allowSelection={true} treeColumnIndex={1} taskFields={taskFields}
          labelSettings={labelSettings} height='650px' taskbarHeight={25} rowHeight={46} splitterSettings={splitterSettings}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' width='60'></ColumnDirective>
            <ColumnDirective field='TaskName' width='250'></ColumnDirective>
            <ColumnDirective field='StartDate'></ColumnDirective>
            <ColumnDirective field='EndDate' ></ColumnDirective>
            <ColumnDirective field='Duration' ></ColumnDirective>
            <ColumnDirective field='Predecessor' ></ColumnDirective>
            <ColumnDirective field='Progress' ></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Selection, DayMarkers]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates how to bind local hierarchical data to the Gantt Chart and visualize project tasks with their scheduling, progress, and dependency information.</p>
      </div>

      <div id="description">
        <p>The Gantt Chart supports binding data from local collections as well as remote data services. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#datasource">dataSource</a> property can be assigned either an array of JavaScript objects or a <code>DataManager</code> instance.</p>
        <p>In this sample, a local JSON data source with a hierarchical task structure is used to populate the Gantt Chart.</p>
        <p>Gantt component features are segregated into individual feature-wise modules. To use a selection and marker features, we need to inject the <code>Selection</code> and <code>DayMarkers</code> into the <code>Inject Services</code> section.
        </p>
        <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/data-binding#local-data">data binding</a> documentation section.</p>
        <br/>
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
      </div>
    </div>
  )
}


export default LocalData;
