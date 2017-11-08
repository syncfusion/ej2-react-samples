import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DatePickerComponent, RenderDayCellEventArgs } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from './sample-base';


export class Disabled extends SampleBase<{}, {}> {
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='datepicker-control-section'>
            <DatePickerComponent renderDayCell={disabledDate} placeholder='Choose a date'></DatePickerComponent>
          </div>
        </div>
      </div>
    )
  }
}
function disabledDate(args: RenderDayCellEventArgs): void {
  if (args.date.getDay() === 0 || args.date.getDay() === 6) {
    //set 'true' to disable the weekends
    args.isDisabled = true;
  }
}
ReactDOM.render(<Disabled />, document.getElementById('sample'));