import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, HolidaysDirective, HolidayDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';

export class Holidays extends SampleBase<{}, {}> {
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
  public labelSettings: any = {
    leftLabel: 'TaskName'
  };
  public projectStartDate: Date = new Date('03/24/2019');
  public projectEndDate: Date = new Date('07/06/2019');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='Holidays' dataSource={projectNewData} highlightWeekends={true}
            taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px'
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
            <HolidaysDirective>
                <HolidayDirective from='04/04/2019' to='04/04/2019' label='Local Holiday'></HolidayDirective>
                <HolidayDirective from='04/19/2019' to='04/19/2019' label='Good Friday'></HolidayDirective>
                <HolidayDirective from='04/30/2019' to='04/30/2019' label='Release Holiday'></HolidayDirective>
            </HolidaysDirective>
            <Inject services={[Selection, DayMarkers]} />
          </GanttComponent>
        </div>
        <div id="action-description">
        <p>This sample visualizes how to define the holidays in between the project timeline. </p>
        </div>

        <div id="description">
        <p>
        In this example,<code> holidays </code> are displayed with vertical bar with the desired text using the <code>label</code> property. You can also mention the continuous holidays by specifying the <code>from</code> and <code>to</code> range. For single holiday, you can define from value alone. Holidays are defined as an array of object collection, so that we can display more than one holiday in the project.
    </p>
    <p>
        You can even assign the <code>cssClass</code> to each holiday to change the default color of label and background.
    </p>
          <p>
            Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the
            <code>Selection</code>, <code>DayMarkers</code> modules.
        </p>
        </div>
      </div>
    )
  }
}
