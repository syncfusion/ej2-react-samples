import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Month, Week, TimelineViews, Inject, Resize, DragAndDrop, ActionEventArgs, EventRenderedArgs, CellClickEventArgs } from '@syncfusion/ej2-react-schedule';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { applyCategoryColor } from './helper';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

/**
 * Schedule Holiday Calendar sample
 */

const HolidayCalendar = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const scheduleObj = useRef<ScheduleComponent>(null);
  const toastRef = useRef<ToastComponent>(null);
  const [holidayEventCollection, setHolidayEventCollection] = useState<boolean>(true);
  const [holidayListCollection, setHolidayListCollection] = useState<boolean>(true);
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).scheduleEvent, null, true) as Record<string, any>[];
  let holidayList: Record<string, any>[] = extend([], (dataSource as Record<string, any>).holidayList, null, true) as Record<string, any>[];

  const updateHolidayEventCollection = (args: ChangeEventArgs) => {
    setHolidayEventCollection(args.checked);
    scheduleObj.current.refreshEvents();
  };

  const updateHolidayListCollection = (args: ChangeEventArgs) => {
    setHolidayListCollection(args.checked);
    scheduleObj.current.refreshEvents();
  };

  const isEventWithinHolidayRange = (eventStartDate: Date, eventEndDate: Date) => {
    for (let holiday of holidayList) {
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

  const showToastForAction = (actionName: string, holidayDateRange: boolean) => {
    if (!holidayDateRange) return;
    const messages: { [key: string]: string } = {
      resizeStop: 'You cannot resize an event within the holiday date range',
      dragStop: 'You cannot drop an event within the holiday date range',
      eventCreate: 'You cannot add an event within the holiday date range',
      eventChange: 'You cannot edit an event within the holiday date range',
    };
    if (messages[actionName]) {
      toastRef.current.content = messages[actionName];
      toastRef.current.show();
    }
  };

  const onActionBegin = (args: ActionEventArgs) => {
    const { requestType, data } = args;
    const isCreateOrChange = requestType === 'eventCreate' || requestType === 'eventChange';
    if (isCreateOrChange) {
      const eventData = requestType === 'eventCreate' ? (data as any[])[0] : (data as any);
      const adjustedEndTime = eventData.IsAllDay
        ? new Date(eventData.EndTime.setMinutes(eventData.EndTime.getMinutes() - 1))
        : eventData.EndTime;
      const isHolidayDateRange = !holidayEventCollection &&
        !eventData.RecurrenceRule &&
        isEventWithinHolidayRange(eventData.StartTime, adjustedEndTime);
      args.cancel = isHolidayDateRange;
      showToastForAction(requestType, isHolidayDateRange);
    }
  };

  const onEventRender = (args: EventRenderedArgs) => {
    const event = args.data;
    if (!holidayEventCollection) {
      if (!event.isHoliday && event.IsAllDay) {
        event.EndTime.setMinutes(event.EndTime.getMinutes() - 1);
      }
      args.cancel =
        !event.isHoliday &&
        isEventWithinHolidayRange(event.StartTime, event.EndTime);
    }
    if (event.isHoliday && !holidayListCollection) {
      args.cancel = true;
    }
    applyCategoryColor(args, scheduleObj.current.currentView);
  };

  const clickOnHoliday = (args: CellClickEventArgs) => {
    args.cancel =
      !holidayEventCollection &&
      isEventWithinHolidayRange(
        args.startTime,
        args.endTime.setMinutes(args.endTime.getMinutes() - 1) as any
      );
  };

  const onEventDragOrResize = (args: any) => {
    const isHolidayDateRange =
      !holidayEventCollection &&
      isEventWithinHolidayRange(
        args.data.StartTime,
        args.data.EndTime.setMinutes(args.data.EndTime.getMinutes() - 1)
      );
    args.cancel = isHolidayDateRange;
    showToastForAction(args.name, isHolidayDateRange);
  };

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-9 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent            
            width="100%"
            height="100%"
            ref={scheduleObj} 
            cssClass='schedule-holiday-calendar'
            rowAutoHeight={true}
            selectedDate={new Date(2024, 7, 5)}
            eventSettings={{ dataSource: data.concat(holidayList) }}
            eventRendered={onEventRender}
            actionBegin={onActionBegin}
            cellClick={clickOnHoliday}
            cellDoubleClick={clickOnHoliday}
            resizeStop={onEventDragOrResize}
            dragStop={onEventDragOrResize} >
            <ViewsDirective>
              <ViewDirective option='Month' />
            </ViewsDirective>
            <Inject services={[Day, Week, Month, Resize, DragAndDrop]} />
          </ScheduleComponent>
          <div>
          <ToastComponent
            ref={toastRef}
            id="toast_default"
            title="Information!"
            cssClass="e-toast-info"
            icon="e-info toast-icons"
            target= ".e-schedule"
            position={{ X: 'Right', Y: 'Top' }}
          />
        </div>
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
                      checked={holidayListCollection}
                      label="Holiday events"
                      change={updateHolidayListCollection}
                    />
                  </div>
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '100%' }}>
                  <div>
                  <CheckBoxComponent
                      checked={holidayEventCollection}
                      label='Scheduling event on holiday'
                      change={updateHolidayEventCollection}
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
export default HolidayCalendar;