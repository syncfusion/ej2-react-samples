import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from './sample-base';


export class Default extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='daterangepicker-control-section'>
            <DateRangePickerComponent placeholder='Select a range'></DateRangePickerComponent>
          </div>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<Default />, document.getElementById('sample'));