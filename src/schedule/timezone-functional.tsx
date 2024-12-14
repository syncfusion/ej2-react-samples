import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Timezone, EventRenderedArgs, Inject, Resize, DragAndDrop, View } from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './schedule-component.css';
import { Browser, extend } from '@syncfusion/ej2-base';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { tz } from 'moment-timezone';
import { updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 *  Schedule timezone events sample
 */

if (Browser.isIE) {
  Timezone.prototype.offset = (date: Date, timezone: string): number => {
    return tz.zone(timezone).utcOffset(date.getTime());
  };
}

const TimeZone = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])

  const scheduleObj = useRef<ScheduleComponent>(null);
  const fifaEvents: Record<string, any>[] = extend([], ((dataSource as Record<string, any>).fifaEventsData), null, true) as Record<string, any>[];
  const timezone: Timezone = new Timezone();
  const timeZoneOptions: Record<string, any>[] = [
    { text: '(UTC-05:00) Eastern Time', value: 'America/New_York' },
    { text: 'Coordinated Universal Time', value: 'UTC' },
    { text: '(UTC+03:00) Moscow+00 - Moscow', value: 'Europe/Moscow' },
    { text: '(UTC+05:30) India Standard Time', value: 'Asia/Kolkata' },
    { text: '(UTC+08:00) Western Time - Perth', value: 'Australia/Perth' }
  ];
  const fields: Record<string, any> = { text: 'text', value: 'value' };
  const [schedulerTimezone, setSchedulerTimezone] = useState<string>('UTC');
  // Here remove the local offset from events

  useEffect(() => {
    for (let event of fifaEvents) {
      event.StartTime = timezone.removeLocalOffset(new Date(event.StartTime));
      event.EndTime = timezone.removeLocalOffset(new Date(event.EndTime));
    }
  }, [timezone]);



  const onEventRendered = (args: EventRenderedArgs): void => {
    applyCategoryColor(args, scheduleObj.current?.currentView as View);
  }

  const onTimeZoneChange = (args: ChangeEventArgs): void => {
    setSchedulerTimezone(args.value as string)
    scheduleObj.current?.dataBind();
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper'>
          <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '18px' }}>
            <tbody>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '5%' }}>
                  <div className='timezone' style={{ fontSize: '14px' }}> Timezone
                  </div>
                </td>
                <td style={{ width: '70%' }}>
                  <div>
                    <DropDownListComponent style={{ padding: '6px' }} value={'UTC'} popupWidth='auto' fields={fields} dataSource={timeZoneOptions} change={onTimeZoneChange} floatLabelType='Always' width='250' />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <ScheduleComponent width='100%' height='650px' ref={scheduleObj} selectedDate={new Date(2021, 5, 20)} timezone={schedulerTimezone} workHours={{ start: '11:00' }} eventSettings={{ dataSource: fifaEvents }}  eventRendered={onEventRendered}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
      <div id='action-description'>
        <p>
          This demo visualizes the 2021 FIFA football match scheduler which is depicted as events here. The timings of each event are
          associated with the timezone of the match location where it will be held. When the Scheduler time zone changes, the
          events in it displays according to the selected timezone's offset time difference.
        </p>
      </div>
      <div id='description'>
        <p>
          In this demo, the <code>timezone</code> of Scheduler is set to UTC and each events on it holds different <code>startTimezone</code> and
          <code>endTimezone</code> values, therefore the event timings will be converted based on timezone assigned to Scheduler and will be displayed
          appropriately in UTC timings.
        </p>
        <p>
          When the user selects different timezone value listed out in a dropdown on properties panel, Scheduler will display the events accordingly to
          the selected timezone value as the selected timezone will be assigned to Scheduler <code>timezone</code> property.
        </p>
      </div>
    </div>
  );
}
export default TimeZone;