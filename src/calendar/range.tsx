import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { CalendarComponent, ChangedEventArgs } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './calendar-component.css';

let today: Date = new Date();
let currentYear: number = today.getFullYear();
let currentMonth: number = today.getMonth();
let currentDay: number = today.getDate();
let minDate: Date = new Date(currentYear, currentMonth, 7);
let maxDate: Date = new Date(currentYear, currentMonth, 27);
export class Range extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='calendar-control-section'>
            <CalendarComponent id="calendar" min={minDate} max={maxDate} change={onchange}></CalendarComponent>
            <label id='date_label'>Selected Value:</label>
          </div>
        </div>
        <div id='description'>
          Date Range sample illustrates the date selection within a specific range in a calendar by using min and max properties.
        Here, the date selection range was resricted within  a range from 7th to 27th days in a month.
        <p>
            More information on the calendar instantiation can be found in this <a target='_blank'
              href='http://ej2.syncfusion.com/react/documentation/calendar/date-range.html'>documentation</a> section.
        </p>
        </div>
      </div>
    )
  }
}
function onchange(args: ChangedEventArgs): void {
  (document.getElementById('date_label') as HTMLElement).textContent = 'Selected Value: ' + args.value.toLocaleDateString();
}