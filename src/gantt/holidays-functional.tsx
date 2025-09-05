import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, HolidaysDirective, HolidayDirective, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';

const Holidays = () => {
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
    parentID:'ParentId'
  };
  const labelSettings: any = {
    rightLabel: 'TaskName'
  };
  const projectStartDate: Date = new Date('03/25/2025');
  const projectEndDate: Date = new Date('07/20/2025');
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='Holidays' dataSource={projectNewData} highlightWeekends={true} treeColumnIndex={1}
          taskFields={taskFields} labelSettings={labelSettings} height='650px' taskbarHeight={25} rowHeight={46}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' visible={false} width='80' ></ColumnDirective>
            <ColumnDirective field='TaskName' width='250'></ColumnDirective>
            <ColumnDirective field='StartDate'></ColumnDirective>
            <ColumnDirective field='EndDate'></ColumnDirective>
            <ColumnDirective field='Duration'></ColumnDirective>
            <ColumnDirective field='Predecessor'></ColumnDirective>
            <ColumnDirective field='Progress'></ColumnDirective>
          </ColumnsDirective>
          <HolidaysDirective>
            <HolidayDirective from='03/28/2025' to='03/28/2025' label='Good Friday'></HolidayDirective>
            <HolidayDirective from='03/30/2025' to='03/30/2025' label='Easter Sunday'></HolidayDirective>
            <HolidayDirective from='05/26/2025' to='05/26/2025' label='Memorial Day'></HolidayDirective>
            <HolidayDirective from='07/04/2025' to='07/04/2025' label='Independence Day'></HolidayDirective>
          </HolidaysDirective>
          <Inject services={[Selection, DayMarkers]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample visualizes how to define the holidays in between the project timeline. </p>
      </div>
      <div id="description">
        <p>
          In this example,<a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#holidays">holidays</a> are displayed with vertical bar with the desired text using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/holidayModel/#label">label</a> property. You can also mention the continuous holidays by specifying the <code>from</code> and <code>to</code> range. For single holiday, you can define from value alone. Holidays are defined as an array of object collection, so that we can display more than one holiday in the project.
        </p>
        <p>
          You can even assign the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/holidayModel/#cssclass">cssClass</a> to each holiday to change the default color of label and background.
        </p>
        <p>
          Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the
          <code>Selection</code>, <code>DayMarkers</code> modules.
        </p>
        <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/holidays">documentation section</a>.</p>
      </div>
    </div>
  )
}
export default Holidays;
