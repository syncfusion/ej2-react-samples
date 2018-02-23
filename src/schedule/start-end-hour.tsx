import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ScheduleComponent, ViewsDirective, ViewsModelDirective, Day, Week, WorkWeek, Month, EventRenderedArgs, Inject } from '@syncfusion/ej2-react-schedule';
import { employeeEventData, applyCategoryColor } from './datasource';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

/**
 * Schedule start and end hour sample
 */

export class DayHourLimit extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Object[] = extend([], employeeEventData, null, true) as Object[];

  private onSubmit(): void {
    let start: HTMLInputElement = document.getElementById('startTime') as HTMLInputElement;
    let end: HTMLInputElement = document.getElementById('endTime') as HTMLInputElement;
    this.scheduleObj.startHour = start.value;
    this.scheduleObj.endHour = end.value;
  }

  private onEventRendered(args: EventRenderedArgs): void {
    applyCategoryColor(args, this.scheduleObj.currentView);
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='500px' ref={schedule => this.scheduleObj = schedule}
              startHour='06:00' endHour='18:00' selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: this.data }}
              workHours={{ highlight: false }} eventRendered={this.onEventRendered.bind(this)}>
              <ViewsDirective>
                <ViewsModelDirective option='Day' />
                <ViewsModelDirective option='Week' />
                <ViewsModelDirective option='WorkWeek' />
                <ViewsModelDirective option='Month' />
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek, Month]} />
            </ScheduleComponent>
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tbody>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>Start Hour:</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div className='timepicker-control-section range'>
                      <TimePickerComponent id='startTime' width={100} value={new Date(2000, 0, 1, 6)} format='HH:mm'></TimePickerComponent>
                    </div>
                  </td>
                </tr>
                <tr id='' style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>End Hour:</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div className='timepicker-control-section range'>
                      <TimePickerComponent id='endTime' width={100} value={new Date(2000, 0, 1, 18)} format='HH:mm'></TimePickerComponent>
                    </div>
                  </td>
                </tr>
                <tr id='' style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='evtbtn' style={{ paddingBottom: '10px' }}>
                      <ButtonComponent id='submit' title='Submit' onClick={this.onSubmit.bind(this)}>Submit</ButtonComponent>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
        <div id='action-description'>
          <p>This demo depicts how to restrict the start and end hours of Schedule,
            thus limiting it to display only the given hour range.</p>
        </div>
        <div id='description'>
          <p>In this demo, the Schedule is made to display from 6 AM to 6 PM and the rest of the hours are hidden, as it is restricted
        to start from <code>06:00</code> hours and end on <code>18:00</code> hours
         by setting to <code>startHour</code> and <code>endHour</code> properties respectively.
          </p>
        </div>
      </div>
    );
  }
}