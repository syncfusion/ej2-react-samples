import * as React from 'react';
import { GanttComponent, TaskFieldsModel, Inject, EventMarkersDirective, EventMarkerDirective, Selection, DayMarkers, ColumnDirective, ColumnsDirective, TimelineSettingsModel, LabelSettingsModel, SplitterSettingsModel } from '@syncfusion/ej2-react-gantt';
import { EventmarkerData } from './data';
import { SampleBase } from '../common/sample-base';

export class EventMarkers extends SampleBase<{}, {}> {
  public taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID: 'ParentId'
  };
  public eventMarkerDay1: Date = new Date("04/01/2025");
  public eventMarkerDay2: Date = new Date("04/07/2025");
  public eventMarkerDay3: Date = new Date("04/07/2025");
  public eventMarkerDay4: Date = new Date("04/17/2025");
  public eventMarkerDay5: Date = new Date("04/17/2025");
  public eventMarkerDay6: Date = new Date("05/23/2025");
  public eventMarkerDay7: Date = new Date("05/29/2025");
  public eventMarkerDay8: Date = new Date("06/26/2025");
  public labelSettings: LabelSettingsModel = {
    leftLabel: 'TaskName'
  };
  public timelineSettings: TimelineSettingsModel = {
    topTier: {
      unit: 'Week',
      format: 'EEE MMM dd'
    },
    bottomTier: {
      unit: 'Day',
      format: ''
    }
  };
  public splitterSettings: SplitterSettingsModel = {
    columnIndex: 2,
  };
  public projectStartDate: Date = new Date('03/26/2025');
  public projectEndDate: Date = new Date('07/20/2025');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='EventMarkers' dataSource={EventmarkerData} highlightWeekends={true} timelineSettings={this.timelineSettings}
            taskFields={this.taskFields} labelSettings={this.labelSettings} height='650px' taskbarHeight={25} rowHeight={46} splitterSettings={this.splitterSettings}
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} treeColumnIndex={1}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Job Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
              <ColumnDirective field='Predecessor'></ColumnDirective>
            </ColumnsDirective>
            <EventMarkersDirective>
              <EventMarkerDirective day={this.eventMarkerDay1} label='Product Concept Analysis' ></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay2} label='Research Phase' ></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay3} label='Demand Analysis' top='150px'></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay4} label='Design Phase' top='200px' ></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay5} label='Competitor Analysis' top='422px'></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay6} label='Prototype Testing Phase' ></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay7} label='Production Launch' top='5px' ></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay8} label='Market Deployment' ></EventMarkerDirective>
            </EventMarkersDirective>
            <Inject services={[Selection, DayMarkers]} />
          </GanttComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates how to highlight and notify important dates within a project timeline using the Gantt Chart component.</p>
        </div>
        <div id="description">
          <p>
            In this example, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#eventmarkers">eventMarkers</a> act as visual bookmarks to indicate key milestones or stages in the project life cycle. Each marker can display descriptive text on the corresponding date, making it easier to track progress and deadlines.
          </p>
          <p>
            The <strong>Event Markers</strong> model provides several properties to customize the appearance and behavior of markers:
          </p>
          <ul>
            <li><code>cssClass</code>: Apply custom CSS styles to a specific marker.</li>
            <li><code>day</code>: Define the exact date for the event marker.</li>
            <li><code>label</code>: Display text along the vertical line to describe the event.</li>
            <li><code>top</code>: Adjust the vertical position of the marker from the chart pane's content top to avoid overlap when multiple markers share the same date.</li>
          </ul>
          <p>
            Gantt component features are segregated into individual feature-wise modules. To use selection and event marker features, we need to inject the <code>Selection</code> and <code>DayMarkers</code> into the <code>Inject Services</code> section respectively.
          </p>
          <br/>
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/event-markers">event markers</a> documentation section.</p>
          <br/>
          <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
        </div>
      </div>
    )
  }
}
