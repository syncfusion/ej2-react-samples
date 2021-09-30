import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, Month, Agenda, ResourcesDirective, ResourceDirective,
  EventRenderedArgs, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './views-configuration.css';
import { Internationalization, extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 *  Schedule view based configuration sample
 */

export class ViewConfigurations extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).fifaEventsData, null, true) as Record<string, any>[];
  private instance: Internationalization = new Internationalization();
  private resourceData: Record<string, any>[] = [
    { GroupText: 'Group A', GroupId: 1, GroupColor: '#1aaa55' },
    { GroupText: 'Group B', GroupId: 2, GroupColor: '#357cd2' }
  ];

  private getTimeString(value: Date) {
    return this.instance.formatDate(value, { skeleton: 'Hm' });
  }

  private agendaTemplate(props): JSX.Element {
    return (<div><div className="subject ">{props.Subject}</div>
      {(props.Description !== null && props.Description !== undefined && props.Description !== "") ?
        <div className="group">{props.Description}</div> : ""}
      <div className="location">{this.getTimeString(props.StartTime)}
        {(props.City !== null && props.City !== undefined && props.City !== "") ? ", " + props.City : ""}</div></div>);
  }

  private monthEventTemplate(props): JSX.Element {
    return (<div className="e-subject">{props.Subject}</div>);
  }

  private onEventRendered(args: EventRenderedArgs): void {
    applyCategoryColor(args, this.scheduleObj.currentView);
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent cssClass='schedule-views-config' width='100%' height='650px' ref={t => this.scheduleObj = t}
              currentView='Month' selectedDate={new Date(2021, 5, 20)}
              eventSettings={{ dataSource: this.data, fields: { location: { name: 'City' } } }}
              eventRendered={this.onEventRendered.bind(this)}>
              <ResourcesDirective>
                <ResourceDirective field='GroupId' title='Owner' name='Owners'
                  dataSource={this.resourceData} textField='GroupText' idField='GroupId' colorField='GroupColor'>
                </ResourceDirective>
              </ResourcesDirective>
              <ViewsDirective>
                <ViewDirective option='Day' startHour='07:00' endHour='18:00' />
                <ViewDirective option='Week' startHour='09:00' endHour='19:00' showWeekend={false}
                  timeScale={{ interval: 60, slotCount: 4 }} />
                <ViewDirective option='Month' group={{ resources: ['Owners'] }} eventTemplate={this.monthEventTemplate.bind(this)} />
                <ViewDirective option='Agenda' eventTemplate={this.agendaTemplate.bind(this)} />
              </ViewsDirective>
              <Inject services={[Day, Week, Month, Agenda, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
        </div>
        <div id='action-description'>
          <p>
            This demo illustrates how to customize each view with specific configurations like applying event template on agenda view,
            setting different start/end hour to day and week views and enabling grouping in month view. It also shows how to
            hide the weekend days and to set different time intervals on week view.
          </p>
        </div>
        <div id='description'>
          <p>
            In this demo, the  <code>views</code> property is defined to accept the array of view options and therefore for each view,
            it is possible to set different configurations. In day view, the the <code>startHour</code> is set to 7 and <code>endHour</code> set to 18
            whereas in week view, the same is set as 9 and 19 respectively. Also, the <code>showWeekend</code> property is set to false
            only on week view along with different timescale interval. The customized template is applied to the events on Agenda view and on month view,
            the grouping functionality is enabled by setting <code>group</code> property.
          </p>
        </div>
      </div>
    );
  }
}