import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { selfData } from './data';
import { SampleBase } from '../common/sample-base';

export class SelfReferenceData extends SampleBase<{}, {}> {
  public taskFields: any = {
    id: 'taskID',
    name: 'taskName',
    startDate: 'startDate',
    endDate: 'endDate',
    duration: 'duration',
    progress: 'progress',
    dependency: 'predecessor',
    parentID: 'parentID'
  };
  public labelSettings: any = {
    leftLabel: 'taskName'
  };
  public splitterSettings: any = {
    columnIndex: 2
  };
  public projectStartDate: Date = new Date('01/28/2019');
  public projectEndDate: Date = new Date('03/10/2019');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='SelfReferenceData' dataSource={selfData} highlightWeekends={true}
            allowSelection={true} treeColumnIndex={1} splitterSettings={this.splitterSettings}
            taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px'
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' width='60'></ColumnDirective>
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
          <p>In this demo, the array of self-referential flat data with <code>parentID</code> is assigned as data source to the Gantt.</p>
          <p>Gantt component features are segregated into individual feature-wise modules. To use a selection, inject the
        <code>Selection</code> module using the <code>Gantt.Inject(Selection)</code> method.To use markers, inject the
        <code>DayMarkers</code> module using the <code>Gantt.Inject(DayMarkers)</code> method.</p>
        </div>
      </div>
    )
  }
}
