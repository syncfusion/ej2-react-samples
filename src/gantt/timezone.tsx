import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, ColumnDirective, ColumnsDirective, TimelineViewMode } from '@syncfusion/ej2-react-gantt';
import { SampleBase } from '../common/sample-base';
import { ComboBoxComponent, ChangeEventArgs, DropDownListComponent} from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './timezone.css'

export class Timezone extends SampleBase<{}, {}> {
  public ganttInstance: GanttComponent;
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
    { taskID: 11, taskName: 'Design complete', startDate: new Date('02/17/2024 08:00'), endDate: new Date('02/17/2024 08:00'), duration: 0, predecessor: '10FS', parentID: 7 },
    { taskID: 12, taskName: 'Implementation', startDate: new Date('02/18/2024 08:00'), endDate: new Date('02/25/2024 08:00'), parentID: 1 },
    { taskID: 13, taskName: 'Develop core modules', startDate: new Date('02/18/2024 08:00'), endDate: new Date('02/22/2024'), duration: 5, progress: '80', predecessor: '11FS', parentID: 12 },
    { taskID: 14, taskName: 'Integrate modules', startDate: new Date('02/19/2024 08:00'), endDate: new Date('02/23/2024'), duration: 5, progress: '70', predecessor: '13FS', parentID: 12 },
    { taskID: 15, taskName: 'Implementation complete', startDate: new Date('02/25/2024 08:00'), endDate: new Date('02/25/2024 08:00'), duration: 0, predecessor: '14FS', parentID: 12 },
    { taskID: 16, taskName: 'Testing', startDate: new Date('02/26/ rehears/2024 08:00'), endDate: new Date('03/02/2024 08:00'), parentID: 1 },
    { taskID: 17, taskName: 'Unit testing', startDate: new Date('02/26/2024 08:00'), endDate: new Date('02/28/2024'), duration: 3, progress: '50', predecessor: '15FS', parentID: 16 },
    { taskID: 18, taskName: 'Integration testing', startDate: new Date('02/27/2024 08:00'), endDate: new Date('03/01/2024'), duration: 4, progress: '40', predecessor: '17FS', parentID: 16 },
    { taskID: 19, taskName: 'Test report', startDate: new Date('03/02/2024 08:00'), endDate: new Date('03/02/2024 08:00'), duration: 0, predecessor: '18FS', parentID: 16 },
    { taskID: 20, taskName: 'Deployment', startDate: new Date('03/03/2024 08:00'), endDate: new Date('03/06/2024 08:00'), parentID: 1 },
    { taskID: 21, taskName: 'Configure environment', startDate: new Date('03/03/2024 08:00'), endDate: new Date('03/04/2024'), duration: 2, progress: '30', predecessor: '19FS', parentID: 20 },
    { taskID: 22, taskName: 'Deploy application', startDate: new Date('03/04/2024 08:00'), endDate: new Date('03/05/2024'), duration: 2, progress: '20', predecessor: '21FS', parentID: 20 },
    { taskID: 23, taskName: 'Deployment verification', startDate: new Date('03/06/2024 08:00'), endDate: new Date('03/06/2024 08:00'), duration: 0, predecessor: '22FS', parentID: 20 },
    { taskID: 24, taskName: 'Training', startDate: new Date('03/07/2024 08:00'), endDate: new Date('03/08/2024 08:00'), parentID: 1 },
    { taskID: 25, taskName: 'User training', startDate: new Date('03/07/2024 08:00'), endDate: new Date('03/07/2024'), duration: 1, progress: '10', predecessor: '23FS', parentID: 24 },
    { taskID: 26, taskName: 'Admin training', startDate: new Date('03/07/2024 08:00'), endDate: new Date('03/08/2024'), duration: 2, progress: '10', predecessor: '23FS', parentID: 24 },
    { taskID: 27, taskName: 'Training complete', startDate: new Date('03/08/2024 08:00'), endDate: new Date('03/08/2024 08:00'), duration: 0, predecessor: '25FS,26FS', parentID: 24 },
    { taskID: 28, taskName: 'Client Review', startDate: new Date('03/09/2024 08:00'), endDate: new Date('03/09/2024'), duration: 1, progress: '0', predecessor: '27FS', parentID: 1 },
    { taskID: 29, taskName: 'Project Handover', startDate: new Date('03/10/2024 08:00'), endDate: new Date('03/10/2024'), duration: 0, predecessor: '28FS', parentID: 1 },
    { taskID: 30, taskName: 'Post-Project Review', startDate: new Date('03/10/2024 08:00'), endDate: new Date('03/10/2024 08:00'), duration: 0, progress: '0', predecessor: '29FS', parentID: 1 }
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
    timelineUnitSize: 70,
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
  private getTimeZonesWithOffsets=(): { id: string; text: string }[]=> {
        const now: Date = new Date();
        const zones: string[] = (Intl as any).supportedValuesOf ? (Intl as any).supportedValuesOf('timeZone') : [
            'UTC', 'Asia/Calcutta', 'America/New_York', 'America/Los_Angeles', 'Europe/London',
            'Australia/Sydney', 'Asia/Tokyo', 'America/Chicago', 'America/Denver', 'America/Sao_Paulo'
        ];

        return zones.map(function(tz: string): { id: string; text: string } {
        var formatter: Intl.DateTimeFormat = new (Intl as typeof Intl).DateTimeFormat('en-US', {
            timeZone: tz,
            timeZoneName: 'longOffset' as 'long'
        });
        // Use type assertion to bypass missing formatToParts in ES5 lib
        var parts = (formatter as any).formatToParts(now) as { type: string; value: string }[];
        var offsetPart = parts.filter(function(part: { type: string; value: string }): boolean { return part.type === 'timeZoneName'; })[0];
        var offset: string = offsetPart ? offsetPart.value : 'UTC+00:00';
        offset = offset.replace('GMT', 'UTC');
        return { id: tz, text: tz + ' (' + offset + ')' };
        });
    }
    private getLocalTimeZoneWithOffset=()=> {
        var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        var timeZonesWithOffsets = this.getTimeZonesWithOffsets();
        return timeZonesWithOffsets.find(function(zone) {
            return zone.id === timeZone;
        });
    }

  public localTimezone = this.getLocalTimeZoneWithOffset().text;
  public timeZones = this.getTimeZonesWithOffsets();
  
  private timeZoneList=(args: ChangeEventArgs): void=>{
    if(args.value){
      this.ganttInstance.timezone=args.value.toString().split(' (')[0];
      this.ganttInstance.refresh();
    }
    else{
      this.ganttInstance.timezone=null;
      this.ganttInstance.refresh();
    }
  }

  private timelineUnit = (args: ChangeEventArgs): void => {
      const unit: string = args.value as string;
      if (this.ganttInstance) {
        if (unit === 'Day') {
          this.ganttInstance.timelineSettings.topTier.unit = unit as TimelineViewMode;
          this.ganttInstance.timelineSettings.bottomTier.unit = 'Hour' as TimelineViewMode;
          this.ganttInstance.timelineSettings.bottomTier.format = 'hh:mm a';
        } else if (unit === 'Week') {
          this.ganttInstance.timelineSettings.topTier.unit = unit as TimelineViewMode;
          this.ganttInstance.timelineSettings.bottomTier.unit = 'Day' as TimelineViewMode;
          this.ganttInstance.timelineSettings.bottomTier.format = 'dd MMM';
        } else {
          this.ganttInstance.timelineSettings.topTier.unit = unit as TimelineViewMode;
          this.ganttInstance.timelineSettings.bottomTier.unit = 'Day' as TimelineViewMode;
          this.ganttInstance.timelineSettings.bottomTier.format = 'dd';
        }
        this.ganttInstance.refresh();
      }
    };
  public getPreviousTimeSpan=()=>{
    return this.ganttInstance.previousTimeSpan();
  }
  public getNextTimeSpan=()=>{
    return this.ganttInstance.nextTimeSpan();
  }
  public timelineData: string[] = ['Day', 'Week', 'Month'];
  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <div className="content-wrapper">
            <div className="input-container" style={{ display: 'flex', flexWrap:'wrap', alignItems:'center', position:'relative' }}>
              <div className='timezone-label' style={{ display: 'flex',  padding: '2px',alignItems: 'center' }}>
                <label htmlFor="timezonelist" style={{ fontSize: '15px', marginRight: '5px' }}>Time Zone:</label>
                <div style={{ padding: '2px', marginBottom: '5px' }}>
                  <ComboBoxComponent id="timezonelist" value={this.localTimezone} placeholder="Select Time Zone" change={this.timeZoneList} allowFiltering={true} filterType='Contains' 
                  dataSource={this.timeZones} style={{width:'250px'}} popupWidth='350px' fields={{ value: 'id', text: 'text' }}/>
                </div>
            </div>
            <div className='timeline-input' style={{display: 'flex', alignItems: 'center',position: 'absolute', right: '14px',}}>
              <div style={{ marginTop:'-5px', padding: '0 5px 0 5px'}}>
                  <ButtonComponent
                      id='left-timespan-btn'
                      onClick={this.getPreviousTimeSpan}
                      className='timespan-btn'>
                      <span className='e-icons e-chevron-left-fill'></span>
                  </ButtonComponent>
                </div>
                <div style={{marginBottom: '5px' }}>
                  <DropDownListComponent id="timeline" value={this.timelineSettings.topTier.unit} placeholder="Select timeline" change={this.timelineUnit} dataSource={this.timelineData}/>
                </div>  
                <div style={{  marginTop:'-5px',padding: '0 5px 0 5px'}}>
                    <ButtonComponent
                        id='right-timespan-btn'
                        onClick={this.getNextTimeSpan}
                        className='timespan-btn'>
                        <span className='e-icons e-chevron-right-fill'></span>
                    </ButtonComponent>
                </div>
            </div> 
          </div>
        </div>
            <GanttComponent id='Timezone' dataSource={this.timezoneData} ref={gantt => this.ganttInstance = gantt} timelineSettings={this.timelineSettings} height='650px' taskbarHeight={25} rowHeight={46}
            timezone={this.localTimezone.split(' (')[0]} durationUnit='Hour' includeWeekend={true} treeColumnIndex={1} dateFormat='hh:mm a' dayWorkingTime={this.dayWorkingTime} taskFields={this.taskFields}> 
              <ColumnsDirective>
                <ColumnDirective field='taskID' visible={false} width='80'></ColumnDirective>
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
          <p>This sample demonstrates how the React Gantt Chart schedules project tasks using the UTC timezone, ensuring consistent date and time handling across global teams.</p>
        </div>

        <div id="description">
          <p>
              For example, in this demo, the timezone of Gantt is set to UTC, and the task named <code>Plan timeline</code> has start time as <code>08:00 am</code> but converted based on UTC and rendered at <code>2.30 am</code>
          </p>
          <p>
            When a user sets any timezone, dates are converted based on the value set to <code><a target="_blank" className='code' href="https://ej2.syncfusion.com/react/documentation/api/gantt#timezone">timezone</a></code> property of Gantt control.
          </p>
      <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/timezone">documentation section</a>.</p>
      </div>
      </div>
    )
  }
}
