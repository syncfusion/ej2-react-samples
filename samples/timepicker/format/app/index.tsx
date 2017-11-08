import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from './sample-base';


let value: Date = new Date();
let interval: number = 60;
let customFormat: string = 'HH:mm';

export class Format extends SampleBase<{}, {}> {
  render() {
    return (
      <div className='control-pane format'>
        <div className='control-section'>
          <div className='timepicker-control-section'>
            <TimePickerComponent value={value} step={interval} format={customFormat}></TimePickerComponent>
          </div>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<Format />, document.getElementById('sample'));