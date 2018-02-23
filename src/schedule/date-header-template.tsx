import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ScheduleComponent, ViewsDirective, ViewsModelDirective, View, Day, Week, WorkWeek, Month, RenderCellEventArgs, EventRenderedArgs, Inject } from '@syncfusion/ej2-react-schedule';
import { scheduleData, applyCategoryColor } from './datasource';
import './date-header-template.css';
import { Internationalization, extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { DataManager, Query } from '@syncfusion/ej2-data';

/**
 * Schedule date header template sample
 */

let instance: Internationalization = new Internationalization();
(window as TemplateFunction).getDateHeaderText = (value: Date) => {
  return instance.formatDate(value, { skeleton: 'Ed' });
};
let getWeather: Function = (value: Date) => {
  switch (value.getDay()) {
    case 0:
      return '<img class="weather-image" src="src/schedule/images/weather-clear.svg"/><div class="weather-text">25°C</div>';
    case 1:
      return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg"/><div class="weather-text">18°C</div>';
    case 2:
      return '<img class="weather-image" src="src/schedule/images/weather-rain.svg"/><div class="weather-text">10°C</div>';
    case 3:
      return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg"/><div class="weather-text">16°C</div>';
    case 4:
      return '<img class="weather-image" src="src/schedule/images/weather-rain.svg"/><div class="weather-text">8°C</div>';
    case 5:
      return '<img class="weather-image" src="src/schedule/images/weather-clear.svg"/><div class="weather-text">27°C</div>';
    case 6:
      return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg"/><div class="weather-text">17°C</div>';
    default:
      return null;
  }
};
(window as TemplateFunction).getWeather = getWeather;

interface TemplateFunction extends Window {
  getDateHeaderText?: Function;
  getWeather?: Function;
}

export class DateHeaderTemplate extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Object[] = extend([], scheduleData, null, true) as Object[];
  private dateHeaderTemplate: string = '<div class="date-text">${getDateHeaderText(data.date)}</div>${getWeather(data.date)}';
  private onRenderCell(args: RenderCellEventArgs): void {
    if (args.elementType === 'monthCells') {
      let ele: Element = document.createElement('div');
      ele.innerHTML = getWeather(args.date);
      (args.element).appendChild(ele.firstChild);
    }
  }

  private onEventRendered(args: EventRenderedArgs): void {
    applyCategoryColor(args, this.scheduleObj.currentView);
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='550px' cssClass='schedule-date-header-template' ref={t => this.scheduleObj = t}
              renderCell={this.onRenderCell.bind(this)} eventRendered={this.onEventRendered.bind(this)} selectedDate={new Date(2018, 1, 15)}
              eventSettings={{ dataSource: this.data }} dateHeaderTemplate={this.dateHeaderTemplate}>
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
          <p>This demo depicts the way to add images and custom text to the date header bar by making use of the date header template
          option.</p>
        </div>
        <div id='description'>
          <p>In this demo, the <code>dateHeaderTemplate</code> option is used to customize the date header cells of day,
           week and workweek views. In month view, the date header is not applicable and therefore the same customizations can be
            added beside the date text in the month cells by making use of the <code>renderCells</code> event.</p>
        </div>
      </div>
    );
  }
}