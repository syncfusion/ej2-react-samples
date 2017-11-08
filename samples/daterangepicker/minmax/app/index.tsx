import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from './sample-base';


export class Minmax extends SampleBase<{}, {}> {

  private minDate: Date = new Date('1/15/2017');
  private maxDate: Date = new Date('12/20/2017');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='daterangepicker-control-section'>
            <DateRangePickerComponent min={this.minDate} max={this.maxDate} placeholder='Select a range'></DateRangePickerComponent>
          </div>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<Minmax />, document.getElementById('sample'));