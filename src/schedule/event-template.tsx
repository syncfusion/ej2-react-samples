import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ScheduleComponent, ViewsDirective, ViewsModelDirective, Day, Week, Inject } from '@syncfusion/ej2-react-schedule';
import { webinarData } from './datasource';
import './event-template.css';
import { Browser, Internationalization, extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

/**
 * Schedule editot template sample
 */

// Used in templates to get time string
let instance: Internationalization = new Internationalization();
(window as TemplateFunction).getTimeString = (value: Date) => {
  return instance.formatDate(value, { skeleton: 'hm' });
};
interface TemplateFunction extends Window {
  getTimeString?: Function;
}

export class EventTemplate extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Object[] = extend([], webinarData, null, true) as Object[];
  private eventTemplate: string = '<div class="template-wrap" style="background:${SecondaryColor}">' +
    '<div class="subject" style="background:${PrimaryColor}">${Subject}</div>' +
    '<div class="time" style="background:${PrimaryColor}">Time: ${getTimeString(data.StartTime)} - ${getTimeString(data.EndTime)}</div>' +
    '<div class="image"><img src="src/schedule/images/${ImageName}.svg" alt="${ImageName}" />' +
    '</div><div class="description">${Description}</div><div class="footer" style="background:${PrimaryColor}"></div></div>';

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent cssClass='event-template' width='100%' height='550px' selectedDate={new Date(2018, 1, 15)}
              currentView='Week' eventSettings={{ dataSource: this.data, template: this.eventTemplate }}>
              <ViewsDirective>
                <ViewsModelDirective option={Browser.isDevice ? 'Day' : 'Week'} />
              </ViewsDirective>
              <Inject services={[Day, Week]} />
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