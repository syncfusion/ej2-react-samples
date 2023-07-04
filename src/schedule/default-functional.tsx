import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop, DragEventArgs } from '@syncfusion/ej2-react-schedule';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { DatePickerComponent, ChangeEventArgs } from '@syncfusion/ej2-react-calendars';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

/**
 * Schedule Default sample
 */

const Default = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const scheduleObj = useRef<ScheduleComponent>(null);
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).scheduleData, null, true) as Record<string, any>[];
  const [scheduleData, setScheduleData] = useState<Date>(new Date(2021, 0, 10));
  const change = (args: ChangeEventArgs): void => {
    setScheduleData(args.value);
    scheduleObj.current.dataBind();
  }

  const onDragStart = (args: DragEventArgs): void => {
    args.navigation.enable = true;
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-9 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent height='650px' ref={scheduleObj} selectedDate={scheduleData} eventSettings={{ dataSource: data }} dragStart={(onDragStart)}>
            <ViewsDirective>
              <ViewDirective option='Day' />
              <ViewDirective option='Week' />
              <ViewDirective option='WorkWeek' />
              <ViewDirective option='Month' />
              <ViewDirective option='Agenda' />
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
      <div className='col-lg-3 property-section'>
        <PropertyPane title='Properties'>
          <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
            <tbody>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '100%' }}>
                  <div className='datepicker-control-section'>
                    <DatePickerComponent value={scheduleData} showClearButton={false} change={change} placeholder='Current Date' floatLabelType='Always' />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </PropertyPane>
      </div>
      <div id='action-description'>
        <p>
          This demo showcases how the flat Scheduler looks like with its default set of minimal configurations. Here, some of the
          documentary shows are displayed as events parallel to its relevant telecast timings. The show names are given as
          event's subject and simply notified of the start and end of it.
        </p>
      </div>
      <div id="description">
        <p>
          The React Scheduler, a.k.a. event calendar, facilitates almost all calendar features, thus allowing users
          to manage their time efficiently. It features easy resource scheduling, appointments rescheduling through
          editor pop-ups, drag and drop, and a resizing action. It includes wide variety of view modes with unique
          configuration options for each view. The available view modes are listed below, out of which the <code>Week</code>
          view is set as active.
        </p>
        <ul>
          <li>Day</li>
          <li>Week</li>
          <li>Work Week</li>
          <li>Month</li>
          <li>Agenda</li>
          <li>Month Agenda</li>
          <li>Timeline Day</li>
          <li>Timeline Week</li>
          <li>Timeline Work Week</li>
          <li>Timeline Month</li>
        </ul>
        <p>
          To navigate between views and dates, the navigation options are available at the Scheduler header bar and the
          active view option is highlighted by default. The date range of the active view will also be displayed in the
          header bar, clicking on which will open a calendar popup for ease of desired date selection.
        </p>
        <p>
          <strong>Touch actions on Mobile mode</strong>
        </p>
        <table style={{ width: '100%' }}>
          <tr>
            <th style={{ width: '100px' }}>
              <strong>Action</strong>
            </th>
            <th>
              <strong>Description</strong>
            </th>
          </tr>
          <tr>
            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>Single Tap</td>
            <td>
              <ol style={{ paddingLeft: '12px' }}>
                <li>Single tapping on events, opens the popup showing event information</li>
                <li>Single tapping on cells, will display a “+” icon on the cell. Again tapping on it will open the new event editor.</li>
              </ol>
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: 'top', padding: '4px 0' }}>Tap hold </td>
            <td>
              <ol style={{ paddingLeft: '12px' }}>
                <li>
                  Tap holding on events, opens a small popup at the top holding the options to edit or delete and
                  also displays the selected event's subject. As a continuation of this action, if user keeps on
                  single tapping on other events, it will allow the multiple event selection. Also, the previous
                  popup remains in opened state, showing the count of the number of events selected.
                </li>
                <li>Tap holding the events will also open the tooltip on Scheduler.</li>
                <li>Tap hold the event and try moving it over the scheduler to enable drag and drop action.</li>
              </ol>
            </td>
          </tr>
        </table>
        <p>
          <strong>Module Injection</strong>
        </p>
        <p>
          The key Schedule functionalities are maintained as individual feature-wise modules.
          Therefore to avail with a particular feature, appropriate module needs to be injected using <code>services</code> property under <code>Inject</code> tag.
          For example, to work with the day view on Schedule – it is necessary to inject the Day module using <code>services</code> property under <code>Inject</code> tag.
        </p>
        <p>
          <strong> Note:</strong>In case, if the module of active view is not injected from the application end – then
          the Scheduler is configured to display the first available option in the <code>views</code> property.
        </p>
      </div>
    </div>
  );
}
export default Default;