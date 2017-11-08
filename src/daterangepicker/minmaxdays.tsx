import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './daterangepicker-component.css';

export class Minmaxdays extends SampleBase<{}, {}> {
  private minDays: number = 5;
  private maxDays: number = 10;
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='daterangepicker-control-section'>
            <DateRangePickerComponent minDays={this.minDays} maxDays={this.maxDays} placeholder='Select a range'></DateRangePickerComponent>
          </div>
        </div>
        <div id="description">
          <p>
              DateRangePicker has <code>minDays</code> and <code>maxDays</code> supports to force the user to select the minimum and maximum number of days in the range. Only the values in this range will be enabled.
          </p>
          <p>More information on the DateRangePicker minDays/maxDays support can be found in the
              <a href="http://ej2.syncfusion.com/react/documentation/daterangepicker/range-selection.html#range-span"
              target="_blank"> documentation section</a>.
          </p>
        </div>

      </div>
    )
  }
}
