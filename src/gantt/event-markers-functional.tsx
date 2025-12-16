import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, Inject, EventMarkersDirective, EventMarkerDirective, Selection, DayMarkers, ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-react-gantt';
import { EventmarkerData } from './data';
import { updateSampleSection } from '../common/sample-base';

const EventMarkers = () => {
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
    parentID: 'ParentId'
  };
  const eventMarkerDay1: Date = new Date("04/01/2025");
  const eventMarkerDay2: Date = new Date("04/07/2025");
  const eventMarkerDay3: Date = new Date("04/07/2025");
  const eventMarkerDay4: Date = new Date("04/17/2025");
  const eventMarkerDay5: Date = new Date("04/17/2025");
  const eventMarkerDay6: Date = new Date("05/23/2025");
  const eventMarkerDay7: Date = new Date("05/29/2025");
  const eventMarkerDay8: Date = new Date("06/26/2025");
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const timelineSettings : any= {
      topTier: {
          unit: 'Week',
          format: 'EEE MMM dd'
      },
      bottomTier: {
          unit: 'Day',
          format: ''
      }
  };
  const splitterSettings:any={
    columnIndex: 2,
  };
  const projectStartDate: Date = new Date('03/26/2025');
  const projectEndDate: Date = new Date('07/20/2025');
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='EventMarkers' dataSource={EventmarkerData} highlightWeekends={true} timelineSettings={timelineSettings}
          taskFields={taskFields} labelSettings={labelSettings} height='650px' taskbarHeight={25} rowHeight={46} splitterSettings={splitterSettings}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate} treeColumnIndex={1}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
            <ColumnDirective field='TaskName' headerText='Job Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
            <ColumnDirective field='StartDate'></ColumnDirective>
            <ColumnDirective field='Duration'></ColumnDirective>
            <ColumnDirective field='Progress'></ColumnDirective>
            <ColumnDirective field='Predecessor'></ColumnDirective>
          </ColumnsDirective>
          <EventMarkersDirective>
            <EventMarkerDirective day={eventMarkerDay1} label='Product Concept Analysis' ></EventMarkerDirective>
            <EventMarkerDirective day={eventMarkerDay2} label='Research Phase' ></EventMarkerDirective>
            <EventMarkerDirective day={eventMarkerDay3} label='Demand Analysis' top='150px'></EventMarkerDirective>
            <EventMarkerDirective day={eventMarkerDay4} label='Design Phase' top='200px' ></EventMarkerDirective>
            <EventMarkerDirective day={eventMarkerDay5} label='Competitor Analysis' top='422px'></EventMarkerDirective>
            <EventMarkerDirective day={eventMarkerDay6} label='Prototype Testing Phase' ></EventMarkerDirective>
            <EventMarkerDirective day={eventMarkerDay7} label='Production Launch' top='5px' ></EventMarkerDirective>
            <EventMarkerDirective day={eventMarkerDay8} label='Market Deployment' ></EventMarkerDirective>
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
            The Gantt Chart component is modular, with features separated into individual modules. To enable selection support and event markers, inject the <code>Selection</code> and <code>DayMarkers</code> modules.
        </p>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/event-markers">documentation section</a>.</p>
      </div>
    </div>
  )
}
export default EventMarkers;
