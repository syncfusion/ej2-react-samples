import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek,
  Month, TimelineViews, TimelineMonth, EventRenderedArgs, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { employeeEventData, applyCategoryColor } from './datasource';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

/**
 * Schedule Work Hour sample
 */

export class WorkHours extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Object[] = extend([], employeeEventData, null, true) as Object[];

  private onSubmit(): void {
    let start: HTMLInputElement = document.getElementById('startTime') as HTMLInputElement;
    let end: HTMLInputElement = document.getElementById('endTime') as HTMLInputElement;
    this.scheduleObj.workHours.start = start.value;
    this.scheduleObj.workHours.end = end.value;
  }

  private onEventRendered(args: EventRenderedArgs): void {
    applyCategoryColor(args, this.scheduleObj.currentView);
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='650px' ref={schedule => this.scheduleObj = schedule}
              selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: this.data }}
              workHours={{ highlight: true, start: '08:00', end: '20:00' }} eventRendered={this.onEventRendered.bind(this)}>
              <ViewsDirective>
                <ViewDirective option='Day' />
                <ViewDirective option='Week' />
                <ViewDirective option='WorkWeek' />
                <ViewDirective option='Month' />
                <ViewDirective option='TimelineWeek' />
                <ViewDirective option='TimelineMonth' />
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek, Month, TimelineViews, TimelineMonth, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tbody>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>Work Start</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div className='timepicker-control-section range'>
                      <TimePickerComponent id='startTime' width={100} value={new Date(2000, 0, 1, 8)}
                        format='HH:mm'></TimePickerComponent>
                    </div>
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>Work End</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div className='timepicker-control-section range'>
                      <TimePickerComponent id='endTime' width={100} value={new Date(2000, 0, 1, 20)} format='HH:mm'></TimePickerComponent>
                    </div>
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
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
          <p>This demo showcases how to set the required working hours on Schedule, thus visually highlighting the cells underlying the
        given work hour range.</p>
        </div>
        <div id='description'>
          <p>
            In this demo, the work hours are set by using the <code>workHours</code> property
            and it usually applies only on the working days defined for the Schedule. It can either be highlighted
            or not by defining the <code>highlight</code> option within the <code>workHours</code> property.
            The working hour range can be defined by making use of the <code>start</code> and <code>end</code> option
            available within the <code>workHours</code> property.
          </p>
          <p>
            To set discontinuous working hours on a day,
            then the default <code>workHours</code> on Schedule needs to be disabled
             by setting false to <code>highlight</code> option within it.
            Then, make use of the <code>setWorkHours</code> method
            which accepts the days collection and the start & end hour values as parameters.
          </p>
        </div>
      </div>
    );
  }
}