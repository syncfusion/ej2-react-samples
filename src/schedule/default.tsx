import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewsModelDirective,
  Day, Week, WorkWeek, Month, Agenda, Inject
} from '@syncfusion/ej2-react-schedule';
import { scheduleData } from './datasource';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { DatePickerComponent, ChangeEventArgs } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

/**
 * Schedule Default sample
 */

export class Default extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Object[] = extend([], scheduleData, null, true) as Object[];
  /*view selected date to the schedule component*/
  private change(args: ChangeEventArgs): void {
    this.scheduleObj.selectedDate = args.value;
    this.scheduleObj.dataBind();
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent height='550px' ref={schedule => this.scheduleObj = schedule}
              selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: this.data }}>
              <ViewsDirective>
                <ViewsModelDirective option='Day' />
                <ViewsModelDirective option='Week' />
                <ViewsModelDirective option='WorkWeek' />
                <ViewsModelDirective option='Month' />
                <ViewsModelDirective option='Agenda' />
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tbody>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>Current Date:</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div className='datepicker-control-section'>
                      <DatePickerComponent value={new Date(2018, 1, 15)} change={this.change.bind(this)}></DatePickerComponent>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
        <div id='action-description'>
          <p>This demo showcases how the flat Schedule looks like with its default set of minimal configurations. Here, some of the
          documentary shows are displayed as events parallel to its relevant telecast timings. The show names are given as
          event's subject and simply notified of the start and end of it.</p>
        </div>
        <div id='description'>
          <p>
            The Schedule is an event calendar which facilitates user with the common Outlook-calendar features, thus allowing them to
            plan and manage the appointments and its time in an efficient manner. It comes with 6 different view modes as listed
            below, out of which the
        <code>Week</code> view is set as active.
    </p>
          <ul>
            <li>Day</li>
            <li>Week</li>
            <li>Work Week</li>
            <li>Month</li>
            <li>Agenda</li>
            <li>Month Agenda</li>
          </ul>
          <p>To navigate between views and dates, the navigation options are available at the Schedule header bar and the active view
              option is highlighted in it by default. The date range of the active view will also be displayed in the header bar,
        clicking on which will open a calendar popup for ease of required date selection. </p>
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
              <td style={{ padding: '4px 0' }}>Single Tap</td>
              <td>Single tapping on events, opens the popup showing event information.</td>
            </tr>
            <tr>
              <td style={{ verticalAlign:'top', padding: '4px 0' }}>Tap hold </td>
              <td>
                <ol style={{ paddingLeft: '12px' }}>
                  <li>Tap holding on cells, opens the new event editor. </li>
                  <li>Tap holding on events, opens a small popup at the top holding the options to edit or delete and also
                      displays the selected event’s subject. As a continuation of this action, if user keeps on single
                      tapping on other events will allow the multiple event selection along with that popup remaining in
                      opened state counting the number of events selected.
                    </li>
                  <li>Tap holding the events will also open the tooltip on Schedule.</li>
                </ol>
              </td>
            </tr>
          </table>
          <p>
            <strong>Module Injection</strong>
          </p>
          <p>The key Schedule functionalities are maintained as individual feature-wise modules. 
            Therefore to avail with a particular feature, 
            appropriate module needs to be injected using <code>services</code> property under <code>Inject</code> tag. 
            For example, 
            to work with the day view on Schedule – it is necessary to inject the Day module
             using <code>services</code> property under <code>Inject</code> tag.
          </p>
          <p>
            <strong> Note:</strong> In case, if the module of active view is not injected from the application end – then the Schedule
            is configured to display the first available option in the <code>views</code> property.
          </p>
        </div>
      </div>
    );
  }
}