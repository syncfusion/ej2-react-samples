import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from './sample-base';


export class Default extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane default'>
        <div className='control-section'>
          <div className='timepicker-control-section'>
            <TimePickerComponent placeholder='Select a Time'></TimePickerComponent>
          </div>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<Default />, document.getElementById('sample'));