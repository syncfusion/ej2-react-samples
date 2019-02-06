import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, MonthAgenda, Inject } from '@syncfusion/ej2-react-schedule';
import './month-agenda.css';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 * Schedule month agenda sample
 */

export class MonthAgendaView extends SampleBase<{}, {}> {
  private data: Object[] = extend([], (dataSource as any).fifaEventsData, null, true) as Object[];

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper schedule-wrapper'>
            <ScheduleComponent width='100%' height='510px' selectedDate={new Date(2018, 5, 20)}
              eventSettings={{ dataSource: this.data }}>
              <ViewsDirective>
                <ViewDirective option='MonthAgenda' />
              </ViewsDirective>
              <Inject services={[MonthAgenda]} />
            </ScheduleComponent>
          </div>
        </div>
        <div id='action-description'>
          <p>This demo showcases the layout of Month Agenda view and its working.</p>
        </div>
        <div id='description'>
          <p>
            In this demo, the active view of Scheduler is set to <code>MonthAgenda</code> and no other view options are provided
             to <code>views</code> property.
 This view is designed by considering the combination of both the calendar and agenda layout together,
so that whenever a particular date is selected – the events belonging to that date will be displayed on the event
section at the bottom. Also, the dates which holds one or more events are marked with a round indicator below that
date.
          </p>
          <p>
            On double clicking the date cells, the user can open the default event editor to create events. The events displayed on this
            view at the bottom section can be edited or deleted either through popup options or edit event editor.
          </p>
          <p>
            <strong>Module Injection</strong>
          </p>
          <p>To work with Month Agenda view on Scheduler – it is necessary to inject the MonthAgenda module
          using <code>services</code> property under <code>Inject</code> tag.
          </p>
        </div>
      </div>
    );
  }
}