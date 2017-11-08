import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DateRangePickerComponent, PresetsArgs } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from './sample-base';


export class Presets extends SampleBase<{}, {}> {
  private presets: PresetsArgs[] = [
    { label: 'This Week', start: new Date(new Date().setDate(new Date().getDate() - new Date().getDay())), end: new Date() },
    { label: 'Last Week', start: new Date(new Date().setDate(new Date().getDate() - 6)), end: new Date() },
    { label: 'This Month', start: new Date(new Date().setDate(1)), end: new Date() },
    { label: 'Last Month', start: new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)), end: new Date() },
    { label: 'Last Year', start: new Date(new Date().setDate(new Date().getDate() - 365)), end: new Date() }
  ]
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='datepicker-control-section'>
            <DateRangePickerComponent presets={this.presets} placeholder='Select a range'></DateRangePickerComponent>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Presets />, document.getElementById('sample'));