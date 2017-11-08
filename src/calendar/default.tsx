import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { CalendarComponent, ChangedEventArgs } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './calendar-component.css';

export class Default extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='calendar-control-section'>
          <CalendarComponent change={onchange} ></CalendarComponent>
           <label id='date_label'>Selected Value:</label>
          </div>         
        </div>
        <div id='description'>
          A Calendar is a graphical user interface control which provides the multi-view
          representation to display and select a
          date. Also, provide options to navigate in different levels of views like month, year, decade.
          <p>
          More information on the calendar instantiation can be found in this <a target='_blank'
          href='http://ej2.syncfusion.com/react/documentation/calendar/getting-started.html'>documentation</a> section.
          </p>
        </div>
      </div>
    )
  }
}
function onchange(args: ChangedEventArgs): void {
  (document.getElementById('date_label') as HTMLElement).textContent = 'Selected Value: ' + args.value.toLocaleDateString();
}