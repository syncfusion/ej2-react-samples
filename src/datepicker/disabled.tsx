import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DatePickerComponent, RenderDayCellEventArgs } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './datepicker-component.css';

export class Disabled extends SampleBase<{}, {}> {
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='datepicker-control-section'>
            <DatePickerComponent renderDayCell={disabledDate} placeholder='Choose a date'></DatePickerComponent>
          </div>
        </div>
        <div id="action-description">
    <p>
        In the following sample, all the weekends (Saturday and Sunday) of a month are <code>disabled</code>, and these dates are restricted to set or select in the DatePicker. 
   </p>
</div>
        <div id='description'>
          <p>
              Disabled Dates sample demonstrates how to disable specific dates in the DatePicker by using <code>renderDayCell</code>        event. This event gets triggered on each day cell element creation, that allows you to customize, or disable specific
              dates in the DatePicker. Here the weekend dates are disabled by using renderDayCell.
          </p>
          <p>More information on the disabled dates can be found in the
              <a href="http://ej2.syncfusion.com/react/documentation/datepicker/customization.html" target="_blank"> documentation section</a>.
          </p>
        </div>
      </div>
    )
  }
}
function disabledDate(args: RenderDayCellEventArgs): void {
  if (args.date.getDay() === 0 || args.date.getDay() === 6) {
    /*set 'true' to disable the weekends*/
    args.isDisabled = true;
  }
}