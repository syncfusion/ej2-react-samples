import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventRenderedArgs, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 * Schedule local data sample
 */

export class LocalData extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).zooEventsData, null, true) as Record<string, any>[];

  private onEventRendered(args: EventRenderedArgs): void {
    let categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.scheduleObj.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='650px' selectedDate={new Date(2021, 1, 15)} ref={t => this.scheduleObj = t}
              eventSettings={{ dataSource: this.data }} eventRendered={this.onEventRendered.bind(this)}>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
        </div>
        <div id='action-description'>
          <p>This demo shows the way of binding an array of JavaScript objects (local JSON datasource) to Scheduler.</p>
        </div>
        <div id='description'>
          <p>
            Scheduler can be bound either to local or remote data services which will load the data by default on demand to reduce the
            data transfer and load time. In this sample, the <code>dataSource</code> property
            available within the <code>eventSettings</code> needs to be assigned with the valid local JSON data.
          </p>
          <p>The <code>eventRendered</code> event is used to customize the events. In this sample, background color of the event is changed based on the custom field 'CategoryColor'</p>
        </div>
      </div>
    );
  }
}