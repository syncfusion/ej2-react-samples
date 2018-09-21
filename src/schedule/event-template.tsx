import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewDirective,
  Day, Week, TimelineViews, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { webinarData } from './datasource';
import './event-template.css';
import { Browser, Internationalization, extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

/**
 * Schedule event template sample
 */

export class EventTemplate extends SampleBase<{}, {}> {
  private data: Object[] = extend([], webinarData, null, true) as Object[];
  private instance: Internationalization = new Internationalization();
  private getTimeString(value: Date) {
    return this.instance.formatDate(value, { skeleton: 'hm' });
  }

  private eventTemplate(props): JSX.Element {
    return (<div className="template-wrap" style={{ background: props.SecondaryColor }}>
      <div className="subject" style={{ background: props.PrimaryColor }}>{props.Subject}</div>
      <div className="time" style={{ background: props.PrimaryColor }}>
        Time: {this.getTimeString(props.StartTime)} - {this.getTimeString(props.EndTime)}</div>
      <div className="image"><img src={"src/schedule/images/" + props.ImageName + ".svg"} alt={props.ImageName} /></div>
      <div className="event-description">{props.Description}</div>
      <div className="footer" style={{ background: props.PrimaryColor }}></div></div>
    );
  }
  private timelineEventTemplate(props): JSX.Element {
    return (<div className="template-wrap" style={{ background: props.PrimaryColor }}>
      <div className="subject" style={{ background: props.SecondaryColor, borderRightWidth: 15, borderLeftWidth: 15, borderLeftColor: props.PrimaryColor, borderRightColor: props.PrimaryColor, borderLeftStyle: 'solid', borderRightStyle: 'solid' }}>{props.Subject}</div>
    </div>
    );
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent cssClass='event-template' width='100%' height='550px' selectedDate={new Date(2018, 1, 15)} readonly={true}
              startHour='08:00' endHour='18:00' workHours={{ start: '08:00' }} eventSettings={{ dataSource: this.data }}>
              <ViewsDirective>
                <ViewDirective option={Browser.isDevice ? 'Day' : 'Week'} eventTemplate={this.eventTemplate.bind(this)} />
                <ViewDirective option={Browser.isDevice ? 'TimelineDay' : 'TimelineWeek'} eventTemplate={this.timelineEventTemplate.bind(this)} />
              </ViewsDirective>
              <Inject services={[Day, Week, TimelineViews, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
        </div>
        <div id='action-description'>
          <p>This demo illustrates the way of customizing the default editor window with custom template option and the customized
        design is automatically replaced onto the usual event editor. Here, a doctor’s daily appointment with his patients is listed
        out and shaded with specific color based on its status.</p>
        </div>
        <div id='description'>
          <p>With the usage of template,
            the user can format and change the default appearance of the events by making use of the <code>template</code> option
            which is available within the <code>eventSettings</code> property.
        Here, the HTML template design is compiled and then the resultant output will be displayed directly on the events.
          </p>
        </div>
      </div>
    );
  }
}