import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, EventMarkersDirective, EventMarkerDirective, Selection, DayMarkers, ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';

export class EventMarkers extends SampleBase<{}, {}> {
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID: 'ParentId'
  };
  public eventMarkerDay1: Date = new Date('04/07/2025');
  public eventMarkerDay2: Date = new Date('04/17/2025');
  public eventMarkerDay3: Date = new Date('05/23/2025');
  public eventMarkerDay4: Date = new Date('06/27/2025');
  public labelSettings: any = {
    leftLabel: 'TaskName'
  };
  public timelineSettings:any= {
      topTier: {
          unit: 'Week',
          format: 'EEE MMM dd'
      },
      bottomTier: {
          unit: 'Day',
          format: ''
      }
  };
  public splitterSettings:any={
    columnIndex: 2,
  };
  public projectStartDate: Date = new Date('03/23/2025');
  public projectEndDate: Date = new Date('07/20/2025');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='EventMarkers' dataSource={projectNewData} highlightWeekends={true} timelineSettings={this.timelineSettings}
            taskFields={this.taskFields} labelSettings={this.labelSettings} height='650px' taskbarHeight={25} rowHeight={46} splitterSettings={this.splitterSettings}
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Job Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
              <ColumnDirective field='Predecessor'></ColumnDirective>
            </ColumnsDirective>
            <EventMarkersDirective>
              <EventMarkerDirective day={this.eventMarkerDay1} label='Research phase'></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay2} label='Design phase' ></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay3} label='Production phase' ></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay4} label='Sales and marketing phase' ></EventMarkerDirective>
            </EventMarkersDirective>
            <Inject services={[Selection, DayMarkers]} />
          </GanttComponent>
        </div>
        <div id="action-description">
        <p>This sample visualizes how to notify the important dates in the project timeline.</p>
      </div>
      <div id="description">
        <p>
          In this example, the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#eventmarkers">eventMarkers</a> are used like a bookmark to show the different stages of the project life cycle. You can show the desired text on the date. The Event Markers model has the below properties to customize the marker:
          <li><code>cssClass</code>: Used to assign external CSS styles to that particular marker.</li>
          <li><code>day</code>: Used to set date of the event marker.</li>
          <li><code>label</code>: The desired text can be shown on the vertical line using this property.</li>
        </p>
        <p>
          Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the
          <code>Selection</code>, <code>DayMarkers</code> modules.
        </p>
         <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/event-markers">documentation section</a>.</p>
      </div>
      </div>
    )
  }
}
