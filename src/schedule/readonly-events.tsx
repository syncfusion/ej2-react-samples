import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewsModelDirective, Day, Week, WorkWeek, Month,
  EventClickArgs, EventRenderedArgs, PopupOpenEventArgs, Inject
} from '@syncfusion/ej2-react-schedule';
import { readonlyEventsData } from './datasource';
import './readonly-events.css';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

/**
 * Schedule readonly events sample
 */

export class ReadonlyEvents extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Object[] = extend([], readonlyEventsData, null, true) as Object[];

  private isReadOnly(dataObj: Object): boolean {
    let data: { [key: string]: Object } = dataObj as { [key: string]: Object };
    return data.ReadOnly as boolean || (data.EndTime < new Date());
  }

  private onEventClick(args: EventClickArgs): void {
    if ((args.element as HTMLElement).classList.contains('e-read-only')) {
      args.cancel = true;
    }
  }

  private onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor' && this.isReadOnly(args.data)) {
      args.cancel = true;
    }
  }

  private onEventRendered(args: EventRenderedArgs): void {
    if (this.isReadOnly(args.data)) {
      args.element.setAttribute('aria-readonly', 'true');
      args.element.classList.add('e-read-only');
    }
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='550px' ref={t => this.scheduleObj = t}
              eventSettings={{ dataSource: this.data }} eventClick={this.onEventClick.bind(this)}
              popupOpen={this.onPopupOpen.bind(this)} eventRendered={this.onEventRendered.bind(this)}>
              <ViewsDirective>
                <ViewsModelDirective option='Day' />
                <ViewsModelDirective option='Week' />
                <ViewsModelDirective option='WorkWeek' />
                <ViewsModelDirective option='Month' />
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek, Month]} />
            </ScheduleComponent>
          </div>
        </div>
        <div id='action-description'>
          <p>
            This demo showcases how to make specific events on the Schedule to be displayed in a read-only mode. The read-only events
          can be simply viewed and prevented from undergoing any edit actions.
          </p>
        </div>
        <div id='description'>
          <p>
            In this demo, the events that has occurred on the past hours from the current time are made as read-only and the CRUD actions
          has been prevented on it. Also, the way to make specific events as read-only regardless of time has been done by
          adding an additional field <code>ReadOnly</code> to the event object to hold the value for it either as true or false.
          </p>
          <p>
            By checking these two conditions, the events are marked as read-only in this sample and also, visually differentiated the
            shade of the readonly events by setting CSS style and <code>aria-readonly</code> attribute to it within the
        <code>eventRendered</code> event which gets triggered before every event rendering on the Schedule user interface.
          </p>
          <p>
            The event editor is prevented to open on these read-only events by setting <code>args.cancel = true</code> within the
        <code>popupOpen</code> event which checks for the condition whether the popup type is <code>editor</code> and the event is readonly.
          </p>
        </div>
      </div>
    );
  }
}