import * as React from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, TimelineViews, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';
/**
 * Schedule start and end hour sample
 */
export class DayHourLimit extends SampleBase {
    constructor() {
        super(...arguments);
        this.data = extend([], dataSource.employeeEventData, null, true);
    }
    onSubmit() {
        let start = document.getElementById('startTime');
        let end = document.getElementById('endTime');
        this.scheduleObj.startHour = start.value;
        this.scheduleObj.endHour = end.value;
    }
    onEventRendered(args) {
        applyCategoryColor(args, this.scheduleObj.currentView);
    }
    render() {
        return (<div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='650px' ref={schedule => this.scheduleObj = schedule} startHour='08:00' endHour='20:00' selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: this.data }} workHours={{ highlight: false }} eventRendered={this.onEventRendered.bind(this)}>
              <ViewsDirective>
                <ViewDirective option='Day'/>
                <ViewDirective option='Week'/>
                <ViewDirective option='TimelineDay'/>
                <ViewDirective option='TimelineWeek'/>
              </ViewsDirective>
              <Inject services={[Day, Week, TimelineViews, Resize, DragAndDrop]}/>
            </ScheduleComponent>
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tbody>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>Start Hour</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div className='timepicker-control-section range'>
                      <TimePickerComponent id='startTime' width={100} value={new Date(2000, 0, 1, 8)} format='HH:mm'></TimePickerComponent>
                    </div>
                  </td>
                </tr>
                <tr id='' style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>End Hour</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div className='timepicker-control-section range'>
                      <TimePickerComponent id='endTime' width={100} value={new Date(2000, 0, 1, 20)} format='HH:mm'></TimePickerComponent>
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
          <p>In this demo, the Scheduler is made to display from 8 AM to 8 PM and the rest of the hours are hidden, as it is restricted
        to start from <code>08:00</code> hours and end on <code>20:00</code> hours
         by setting to <code>startHour</code> and <code>endHour</code> properties respectively.
          </p>
        </div>
      </div>);
    }
}
