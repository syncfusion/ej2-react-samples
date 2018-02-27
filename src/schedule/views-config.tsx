import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewsModelDirective, Day, Week, Month, Agenda,
  EventRenderedArgs, Inject
} from '@syncfusion/ej2-react-schedule';
import { fifaEventsData, applyCategoryColor } from './datasource';
import './views-config.css';
import { Internationalization, extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

/**
 *  Schedule view based configuration sample
 */

/** To get time */
let instance: Internationalization = new Internationalization();
(window as TemplateFunction).getTimeString = (value: Date) => {
  return instance.formatDate(value, { skeleton: 'Hm' });
};
interface TemplateFunction extends Window {
  getTimeString?: Function;
}

export class ViewConfigurations extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Object[] = extend([], fifaEventsData, null, true) as Object[];
  private agendaTemplate: string = '<div class="subject">${Subject}</div><div class="group">${Description}</div>' +
    '<div class="location">${getTimeString(data.StartTime)}, ${City}</div>';
  private onEventRendered(args: EventRenderedArgs): void {
    applyCategoryColor(args, this.scheduleObj.currentView);
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent cssClass='schedule-views-config' width='100%' height='550px' ref={t => this.scheduleObj = t}
              selectedDate={new Date(2018, 5, 20)} eventSettings={{ dataSource: this.data }}
              eventRendered={this.onEventRendered.bind(this)}>
              <ViewsDirective>
                <ViewsModelDirective option='Day' startHour='07:00' endHour='18:00' />
                <ViewsModelDirective option='Week' startHour='09:00' endHour='19:00' showWeekend={false} />
                <ViewsModelDirective option='Month' />
                <ViewsModelDirective option='Agenda' eventTemplate={this.agendaTemplate} />
              </ViewsDirective>
              <Inject services={[Day, Week, Month, Agenda]} />
            </ScheduleComponent>
          </div>
        </div>
        <div id='action-description'>
          <p>This demo illustrates how to customize each view with specific configurations like applying event template on agenda view,
        setting different start/end hour to Day and Week views and hiding weekend days in week view alone.</p>
        </div>
        <div id='description'>
          <p>
            In this demo, the <code>views</code> property is defined to accept the array of view options and therefore for each view, 
            it is possible to set different configurations. In day view, the <code>startHour</code> is set to 7 and <code>endHour</code> set to 18
             whereas in week view, the same is set as 9 and 19 respectively. Also, the <code>showWeekend</code> property is set to false only on week view. 
             The customized template is applied to the events on Agenda view alone.
          </p>
          <p>
            The sub-options that are applicable to be used within the <code>views</code> property, 
            when it is defined as an array of object can be referred from
        <a target="_blank" href="http://ej2.syncfusion.com/documentation/schedule/api-schedule.html#views"> here</a>.
          </p>
        </div>
      </div>
    );
  }
}