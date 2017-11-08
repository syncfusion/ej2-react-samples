import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from './sample-base';


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

      </div>
    )
  }
}

ReactDOM.render(<Minmaxdays />, document.getElementById('sample'));