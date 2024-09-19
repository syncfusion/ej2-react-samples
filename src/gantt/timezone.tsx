import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-react-gantt';
import { SampleBase } from '../common/sample-base';

export class Timezone extends SampleBase<{}, {}> {
  public timezoneData: any = [
    { taskID: 1, taskName: 'Project Schedule', startDate: new Date('02/04/2024 08:00'), endDate: new Date('03/10/2024')},
    { taskID: 2, taskName: 'Planning', startDate: new Date('02/04/2024 08:00'), endDate: new Date('02/10/2024'), parentID: 1},
    { taskID: 3, taskName: 'Plan timeline', startDate: new Date('02/04/2024 08:00'), endDate: new Date('02/10/2024'), duration: 6, progress: '60', parentID: 2 },
    { taskID: 4, taskName: 'Plan budget', startDate: new Date('02/04/2024 08:00'), endDate: new Date('02/10/2024'), duration: 6, progress: '90', parentID: 2 },
    { taskID: 5, taskName: 'Allocate resources', startDate: new Date('02/04/2024 08:00'), endDate: new Date('02/10/2024'), duration: 6, progress: '75', parentID: 2 },
    { taskID: 6, taskName: 'Planning complete', startDate: new Date('02/06/2024 08:00'), endDate: new Date('02/10/2024'), duration: 0,  predecessor: '3FS,4FS,5FS', parentID: 2 },
    { taskID: 7, taskName: 'Design', startDate: new Date('02/13/2024 08:00'), endDate: new Date('02/17/2024 08:00'), parentID: 1, },
    { taskID: 8, taskName: 'Software Specification', startDate: new Date('02/13/2024 08:00'), endDate: new Date('02/15/2024'), duration: 3, progress: '60', predecessor: '6FS', parentID: 7, },
    { taskID: 9, taskName: 'Develop prototype', startDate: new Date('02/13/2024 08:00'), endDate: new Date('02/15/2024'), duration: 3, progress: '100', predecessor: '6FS', parentID: 7, },
    { taskID: 10, taskName: 'Get approval from customer', startDate: new Date('02/16/2024 08:00'), endDate: new Date('02/17/2024 08:00'), duration: 2, progress: '100', predecessor: '9FS', parentID: 7 },
    { taskID: 11, taskName: 'Design complete', startDate: new Date('02/17/2024 08:00'), endDate: new Date('02/17/2024 08:00'), duration: 0, predecessor: '10FS', parentID: 7 }
  ];
  public taskFields: any = {
    id: 'taskID',
    name: 'taskName',
    startDate: 'startDate',
    duration: 'duration',
    progress: 'progress',
    dependency: 'predecessor',
    parentID: 'parentID'
  };
  public timelineSettings: any = {
    timelineUnitSize: 65,
    topTier: {
        unit: 'Day',
        format: 'MMM dd, yyyy'
    },
    bottomTier: {
        unit: 'Hour',
        format: 'hh:mm a'
    }
  };
  private dayWorkingTime: any = [{ from: 0, to: 24 }];
  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
            <GanttComponent id='Timezone' dataSource={this.timezoneData}  timelineSettings={this.timelineSettings} height='450px' timezone='UTC'
            durationUnit='Hour' includeWeekend={true} treeColumnIndex={1} dateFormat='hh:mm a' dayWorkingTime={this.dayWorkingTime} taskFields={this.taskFields}> 
              <ColumnsDirective>
                <ColumnDirective field='taskID' width='80'></ColumnDirective>
                <ColumnDirective field='taskName' width='250'></ColumnDirective>
                <ColumnDirective field='startDate'></ColumnDirective>
                <ColumnDirective field='duration' ></ColumnDirective>
                <ColumnDirective field='predecessor' ></ColumnDirective>
                <ColumnDirective field='progress' ></ColumnDirective>
              </ColumnsDirective>
              <Inject services={[Selection]}/>
            </GanttComponent>
        </div>
        <div id="action-description">
          <p>This demo explains how the Gantt Chart schedules project in UTC timezone.</p>
        </div>

        <div id="description">
          <p>
              For example, in this demo, the timezone of Gantt is set to UTC, and the task named <code>Plan timeline</code> has start time as <code>08:00 am</code> but converted based on UTC and rendered at <code>2.30 am</code>
          </p>
          <p>
            When a user sets any timezone, dates are converted based on the value set to <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#timezone">timezone</a> property of Gantt control.
          </p>
      </div>
      </div>
    )
  }
}
