import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Timezone,
  EventRenderedArgs, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './schedule-component.css';
import { Browser, extend } from '@syncfusion/ej2-base';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { tz } from 'moment-timezone';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

/**
 *  Schedule timezone events sample
 */

if (Browser.isIE) {
  Timezone.prototype.offset = (date: Date, timezone: string): number => {
    return tz.zone(timezone).utcOffset(date.getTime());
  };
}

export class TimeZone extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private fifaEvents: Object[] = extend([], ((dataSource as any).fifaEventsData), null, true) as Object[];
  private timezone: Timezone = new Timezone();
  private timeZoneOptions: { [key: string]: Object }[] = [
    { text: '(UTC-05:00) Eastern Time', value: 'America/New_York' },
    { text: 'UTC', value: 'UTC' },
    { text: '(UTC+03:00) Moscow+00 - Moscow', value: 'Europe/Moscow' },
    { text: '(UTC+05:30) India Standard Time', value: 'Asia/Kolkata' },
    { text: '(UTC+08:00) Western Time - Perth', value: 'Australia/Perth' }
  ];
  private fields: object = { text: 'text', value: 'value' };
  // Here remove the local offset from events
  private onCreate(): void {
    for (let fifaEvent of this.fifaEvents) {
      let event: { [key: string]: Object } = fifaEvent as { [key: string]: Object };
      event.StartTime = this.timezone.removeLocalOffset(new  Date(event.StartTime as string));
      event.EndTime = this.timezone.removeLocalOffset(new Date(event.EndTime as string));
    }
  }
  private onEventRendered(args: EventRenderedArgs): void {
    applyCategoryColor(args, this.scheduleObj.currentView);
  }
  private onTimeZoneChange(args: ChangeEventArgs): void {
    this.scheduleObj.timezone = args.value as string;
    this.scheduleObj.dataBind();
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='650px' ref={schedule => this.scheduleObj = schedule}
              selectedDate={new Date(2018, 5, 20)} timezone='UTC' workHours={{ start: '11:00' }}
              eventSettings={{ dataSource: this.fifaEvents }}
              created={this.onCreate.bind(this)} eventRendered={this.onEventRendered.bind(this)}>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tbody>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>Timezone</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div>
                      <DropDownListComponent style={{ padding: '6px' }} value={'UTC'} popupWidth='250px' fields={this.fields}
                        dataSource={this.timeZoneOptions} change={this.onTimeZoneChange.bind(this)} >
                      </DropDownListComponent>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
        <div id='action-description'>
          <p>This demo visualizes the 2018 FIFA football match scheduler which is depicted as events here. The timings of each event are
          associated with the timezone of the match location where it will be held. When the Scheduler time zone changes, the
          events in it displays according to the selected timezone's offset time difference.</p>
        </div>
        <div id='description'>
          <p>
            In this demo, the <code>timezone</code> of Scheduler is set to UTC
             and each events on it holds different <code>startTimezone</code> and <code>endTimezone</code> values,
  therefore the event timings will be converted based on timezone assigned to Scheduler and will be displayed
      appropriately in UTC timings.
          </p>
          <p>
            When the user selects different timezone value listed out in a dropdown on properties panel,
            Scheduler will display the events accordingly to the selected timezone value
            as the selected timezone will be assigned to Scheduler <code>timezone</code> property.
          </p>
        </div>
      </div>
    );
  }
}