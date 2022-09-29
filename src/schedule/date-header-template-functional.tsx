import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, TimelineMonth,
  RenderCellEventArgs, EventRenderedArgs, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './date-header-template.css';
import { Internationalization, extend } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 * Schedule date header template sample
 */

function DateHeaderTemplate() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  let scheduleObj: ScheduleComponent;
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).scheduleData, null, true) as Record<string, any>[];
  let instance: Internationalization = new Internationalization();

  function getDateHeaderText(value: Date): string {
    return instance.formatDate(value, { skeleton: 'Ed' });
  }

  function getWeather(value: Date) {
    switch (value.getDay()) {
      case 0:
        return '<img class="weather-image"  src= "src/schedule/images/weather-clear.svg" /><div class="weather-text">25°C</div>';
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
  }

  function dateHeaderTemplate(props): JSX.Element {
    return (<div><div>{getDateHeaderText(props.date)}</div><div className="date-text"
      dangerouslySetInnerHTML={{ __html: getWeather(props.date) }}></div></div>);
  }

  function onRenderCell(args: RenderCellEventArgs): void {
    if (args.elementType === 'monthCells' && scheduleObj.currentView === 'Month') {
      let ele: Element = document.createElement('div');
      ele.innerHTML = getWeather(args.date);
      (args.element).appendChild(ele.firstChild);
    }
  }

  function onEventRendered(args: EventRenderedArgs): void {
    applyCategoryColor(args, scheduleObj.currentView);
  }
  return (
    <div className='schedule-control-section'>
      <div className='control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent width='100%' height='650px' cssClass='schedule-date-header-template' ref={t => scheduleObj = t}
            renderCell={onRenderCell.bind(this)} eventRendered={onEventRendered.bind(this)} selectedDate={new Date(2021, 0, 10)}
            eventSettings={{ dataSource: data }} dateHeaderTemplate={dateHeaderTemplate.bind(this)}>
            <ViewsDirective>
              <ViewDirective option='Day' />
              <ViewDirective option='Week' />
              <ViewDirective option='WorkWeek' />
              <ViewDirective option='Month' />
              <ViewDirective option='TimelineMonth' />
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, TimelineMonth, Resize, DragAndDrop]} />
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
export default DateHeaderTemplate;