import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { selfData } from './data';
import { updateSampleSection } from '../common/sample-base';

const SelfReferenceData = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])

  const taskFields: any = {
    id: 'taskID',
    name: 'taskName',
    startDate: 'startDate',
    endDate: 'endDate',
    duration: 'duration',
    progress: 'progress',
    dependency: 'predecessor',
    parentID: 'parentID'
  };
  const labelSettings: any = {
    leftLabel: 'taskName'
  };
  const splitterSettings: any = {
    columnIndex: 2
  };
  const projectStartDate: Date = new Date('01/28/2025');
  const projectEndDate: Date = new Date('03/30/2025');
  
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='SelfReferenceData' dataSource={selfData} highlightWeekends={true}
            allowSelection={true} treeColumnIndex={1} splitterSettings={splitterSettings}
            taskFields={taskFields} labelSettings={labelSettings} height='650px' taskbarHeight={25} rowHeight={46}
            projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' width='80'></ColumnDirective>
              <ColumnDirective field='taskName' width='250'></ColumnDirective>
              <ColumnDirective field='startDate'></ColumnDirective>
              <ColumnDirective field='endDate' ></ColumnDirective>
              <ColumnDirective field='duration' ></ColumnDirective>
              <ColumnDirective field='predecessor' ></ColumnDirective>
              <ColumnDirective field='progress' ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, DayMarkers]} />
          </GanttComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the way of binding self-referential flat data to the Gantt component.</p>
        </div>

        <div id="description">
          <p>Gantt can be bound either to local or remote data services.
            The <code>dataSource</code> property can be assigned either with the array of JavaScript objects or an instance of <code>DataManager</code>.</p>
          <p>In this demo, the array of self-referential flat data with <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/taskFieldsModel/#parentid">parentID</a> is assigned as data source to the Gantt.</p>
          <p>Gantt component features are segregated into individual feature-wise modules. To use a selection, inject the
        <code>Selection</code> module using the <code>Gantt.Inject(Selection)</code> method.To use markers, inject the
        <code>DayMarkers</code> module using the <code>Gantt.Inject(DayMarkers)</code> method.</p>
          <br/>
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/data-binding#self-referential-data-binding-flat-data">documentation section</a>.</p>
        </div>
      </div>
    )
  }

export default SelfReferenceData;