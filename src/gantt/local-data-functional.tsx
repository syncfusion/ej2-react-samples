import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { localData } from './data';
import { updateSampleSection } from '../common/sample-base';

const LocalData = () => {
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
    child: 'subtasks'
  };
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const splitterSettings: any = {
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
        <p>This demo shows the way of binding an array of JavaScript objects (local JSON datasource) to Gantt.</p>
      </div>

      <div id="description">
        <p>Gantt can be bound either to local or remote data services.The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#datasource">dataSource</a> property can be assigned either with the array of JavaScript objects or an instance of <code>DataManager</code>.</p>
        <p>In this demo, an array of JavaScript objects is assigned as data source to the Gantt.</p>
        <p>Gantt component features are segregated into individual feature-wise modules. To use a selection, inject the
          <code>Selection</code> module using the <code>Gantt.Inject(Selection)</code> method.To use markers, inject the
          <code>DayMarkers</code> module using the <code>Gantt.Inject(DayMarkers)</code> method.</p>
        <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/data-binding#hierarchical-data-binding">documentation section</a>.</p>
      </div>
    </div>
  )
}


export default LocalData;
