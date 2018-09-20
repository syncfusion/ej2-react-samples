import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewDirective,
  Day, Week, Month, EventRenderedArgs, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { recurrenceData, applyCategoryColor } from './datasource';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

/**
 * Schedule Recurrence events sample
 */

export class RecurrenceEvents extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Object[] = extend([], recurrenceData, null, true) as Object[];
  private onEventRendered(args: EventRenderedArgs): void {
    applyCategoryColor(args, this.scheduleObj.currentView);
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='control-section'>
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
        <div id='action-description'>
          <p>This demo showcases the schedule with recurring meetings handled by a top-level manager on a regular pattern.</p>
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
        </div>
      </div>
    );
  }
}