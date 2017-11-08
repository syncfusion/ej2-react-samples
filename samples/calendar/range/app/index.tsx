import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { CalendarComponent, ChangedEventArgs } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from './sample-base';


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
      </div>
    )
  }
}
function onchange(args: ChangedEventArgs): void {
  (document.getElementById('date_label') as HTMLElement).textContent = 'Selected Value: ' + args.value.toLocaleDateString();
}
ReactDOM.render(<Range />, document.getElementById('sample'));