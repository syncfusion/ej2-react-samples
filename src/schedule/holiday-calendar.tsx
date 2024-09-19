import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Month, Week, TimelineViews, Inject, Resize, DragAndDrop, ActionEventArgs, EventRenderedArgs, CellClickEventArgs } from '@syncfusion/ej2-react-schedule';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { applyCategoryColor } from './helper';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

/**
 * Schedule Holiday Calendar sample
 */

export class HolidayCalendar extends SampleBase<{}, {}> {


  private scheduleObj: ScheduleComponent | null;
  private toastObj: ToastComponent | null;

  private holidayEventCollection: boolean = true;
  private holidayListCollection: boolean = true;

  private data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).scheduleEvent, null, true) as Record<string, any>[];
  private holidayList: Record<string, any>[] = extend([], (dataSource as Record<string, any>).holidayList, null, true) as Record<string, any>[];

  private updateHolidayEventCollection(args: ChangeEventArgs): void {
    this.holidayEventCollection = args.checked as boolean;
    this.scheduleObj?.refreshEvents();
  };

  private updateHolidayListCollection(args: ChangeEventArgs): void {
    this.holidayListCollection = args.checked as boolean;
    this.scheduleObj?.refreshEvents();
  };

  private isEventWithinHolidayRange(eventStartDate: Date, eventEndDate: Date): boolean {
    for (let holiday of this.holidayList) {
      const holidayStartDate = new Date(holiday.StartTime);
      const holidayEndDate = new Date(holiday.EndTime);
      if (
        (eventStartDate >= holidayStartDate &&
          eventStartDate <= holidayEndDate) ||
        (eventEndDate >= holidayStartDate && eventEndDate <= holidayEndDate) ||
        (eventStartDate <= holidayStartDate && eventEndDate >= holidayEndDate)
      ) {
        return true;
      }
    }
    return false;
  };

  private showToastForAction(actionName: string, holidayDateRange: boolean): void {
    if (!holidayDateRange) return;
    const messages: { [key: string]: string } = {
      resizeStop: 'You cannot resize an event within the holiday date range',
      dragStop: 'You cannot drop an event within the holiday date range',
      eventCreate: 'You cannot add an event within the holiday date range',
      eventChange: 'You cannot edit an event within the holiday date range',
    };
    if (messages[actionName] && this.toastObj) {
      this.toastObj.content = messages[actionName] as string;
      this.toastObj.show();
    }
  };

  private onActionBegin(args: ActionEventArgs): void {
    const { requestType, data } = args;
    let isHolidayDateRange = false;
    if (requestType === 'eventCreate') {
      const eventData = (data as any[])[0];
      isHolidayDateRange =
        !this.holidayEventCollection &&
        !eventData.RecurrenceRule &&
        this.isEventWithinHolidayRange(eventData.StartTime, eventData.EndTime);
    } else if (requestType === 'eventChange') {
      isHolidayDateRange =
        !this.holidayEventCollection &&
        this.isEventWithinHolidayRange((data as any).StartTime, (data as any).EndTime);
    }
    args.cancel = isHolidayDateRange;
    this.showToastForAction(requestType, isHolidayDateRange);
  };

  private onEventRender(args: EventRenderedArgs): void {
    const event = args.data;
    if (!this.holidayEventCollection) {
      if (!event.isHoliday && event.IsAllDay) {
        event.EndTime.setMinutes(event.EndTime.getMinutes() - 1);
      }
      args.cancel =
        !event.isHoliday &&
        this.isEventWithinHolidayRange(event.StartTime, event.EndTime);
    }
    if (event.isHoliday && !this.holidayListCollection) {
      args.cancel = true;
    }
    applyCategoryColor(args, this.scheduleObj?.currentView as any);
  };

  private clickOnHoliday(args: CellClickEventArgs): void {
    args.cancel =
      !this.holidayEventCollection &&
      this.isEventWithinHolidayRange(
        args.startTime,
        args.endTime.setMinutes(args.endTime.getMinutes() - 1) as any
      );
  };

  private onEventDragOrResize(args: any): void {
    const isHolidayDateRange =
      !this.holidayEventCollection &&
      this.isEventWithinHolidayRange(
        args.data.StartTime,
        args.data.EndTime.setMinutes(args.data.EndTime.getMinutes() - 1)
      );
    args.cancel = isHolidayDateRange;
    this.showToastForAction(args.name, isHolidayDateRange);
  };

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent height='100%' ref={(schedule: ScheduleComponent) => this.scheduleObj = schedule}
              selectedDate={new Date(2024, 7, 5)} 
              cssClass='schedule-holiday-calendar'
              rowAutoHeight={true}
              eventSettings={{ dataSource: this.data.concat(this.holidayList) }}
              eventRendered={this.onEventRender.bind(this)}
              actionBegin={this.onActionBegin.bind(this)}
              cellClick={this.clickOnHoliday.bind(this)}
              cellDoubleClick={this.clickOnHoliday.bind(this)}
              resizeStop={this.onEventDragOrResize.bind(this)}
              dragStop={this.onEventDragOrResize.bind(this)} >
              <ViewsDirective>
                <ViewDirective option='Month' />
              </ViewsDirective>
              <Inject services={[Day, Week, Month, Resize, DragAndDrop]} />
            </ScheduleComponent>
            <ToastComponent ref={(toast: ToastComponent) => { this.toastObj = toast }} id='schedule_remainder' position={{X: 'Right', Y:'Top'}} title="Information!"
            cssClass="e-toast-info" icon="e-info toast-icons" target= ".e-schedule"></ToastComponent>
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title=''>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tbody>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '100%' }}>
                    <div>
                      <CheckBoxComponent
                        checked={this.holidayListCollection}
                        label="Holiday events"
                        change={this.updateHolidayListCollection}
                      />
                    </div>
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '100%' }}>
                    <div>
                      <CheckBoxComponent
                        checked={this.holidayEventCollection}
                        label="Scheduling event on holiday"
                        change={this.updateHolidayEventCollection}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
        <div id="action-description">
          <p>
            This demo illustrates how to add and remove holiday events and perform CRUD operations on holiday dates in the
            Scheduler.
          </p>
        </div>
        <div id="description">
          <p>
          This sample demonstrates how to perform CRUD operations on holiday dates in a calendar. If a user wants to
            schedule an appointment on a holiday, they should check the <code>Scheduling event on holiday</code> checkbox.
            This will enable them to add an appointment on a holiday date.If a holiday list is displayed in the calendar, the
            <code>Holiday events</code> checkbox will be checked. The holiday list is highlighted in a different color.
          </p>
          <ul>
            <li>
              When an action is performed to drag and resize an event, if the <code>Scheduling event on holiday</code>
              checkbox is checked, the appointment can be scheduled on holiday dates. If it is unchecked, the appointment
              cannot have CRUD actions performed on it, and a warning message will be displayed.
            </li>
            <li>If a recurring event is added on a holiday date and the <code>Scheduling event on holiday</code> checkbox is
              checked, it allows the event to occur on that dates. If the checkbox is unchecked, it prevents the event from
              occurring, based on the dates in the holiday collection.
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
