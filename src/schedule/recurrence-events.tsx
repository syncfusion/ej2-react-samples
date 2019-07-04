import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewDirective,
  Day, Week, Month, EventRenderedArgs, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { PropertyPane } from '../common/property-pane';

/**
 * Schedule Recurrence events sample
 */

export class RecurrenceEvents extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Object[] = extend([], (dataSource as any).recurrenceData, null, true) as Object[];
  private onEventRendered(args: EventRenderedArgs): void {
    applyCategoryColor(args, this.scheduleObj.currentView);
  }

  private onChange(args: ChangeEventArgs): void {
    this.scheduleObj.eventSettings.editFollowingEvents = args.checked;
  }
  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='650px' selectedDate={new Date(2018, 1, 20)} ref={t => this.scheduleObj = t}
              eventSettings={{ dataSource: this.data }} eventRendered={this.onEventRendered.bind(this)}>
              <ViewsDirective>
                <ViewDirective option='Day' />
                <ViewDirective option='Week' />
                <ViewDirective option='Month' />
              </ViewsDirective>
              <Inject services={[Day, Week, Month, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' style={{ width: '100%' }}>
              <tbody>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '100%' }}>
                    <CheckBoxComponent id='editFollowingEvents' checked={false} label='Enable Following Events'
                      change={this.onChange.bind(this)} ></CheckBoxComponent>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>

        <div id='action-description'>
          <p>This demo showcases the scheduler with recurring meetings handled by a top-level manager on a regular pattern.</p>
        </div>
        <div id='description'>
          <p>In this demo, the recurrence events are defined with different repeat patterns.
            It can be defined through <code>recurrenceRule</code> field which should accept the valid rule string following
             the <a target="_blank" href="https://tools.ietf.org/html/rfc5545#section-3.3.10">
              iCalendar</a> specifications. The recurring events are differentiated from other events by a repeat marker added
to the right-bottom of it. These events can repeat on daily, weekly, monthly or yearly basis.
          </p>
          <p>
            Here, the daily patterned events are depicted in blue color, weekly events are differentiated with green color, monthly events
            are depicted in orange color and the yearly event is depicted in the all-day section with another green shade for
            reference.
          </p>
          <p>
            Scheduler requires only the <code>startTime</code> and <code>endTime</code> fields as mandatory to be mapped from the dataSource. The
        Scheduler events can be categorized into 3 types based on its time range and all-day type.
          </p>
          <table style={{ width: '100%' }}>
            <tr>
              <th style={{ width: '100px' }}>
                <strong>Event</strong>
              </th>
              <th>
                <strong>Description</strong>
              </th>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>Normal events</td>
              <td>The events that has its start and end time duration on the same date.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>Spanned events</td>
              <td>
                The events on which its start and end time spans over multiple days and usually displays together with all-day events.
              </td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>All-day events</td>
              <td>
                The events that are defined as all-day in its event object by setting <code>isAllDay</code> to true.
                It usually renders at the date header section of the Scheduler where no time-cells are present.
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}