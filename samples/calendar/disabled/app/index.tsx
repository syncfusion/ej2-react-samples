import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { CalendarComponent, RenderDayCellEventArgs, ChangedEventArgs } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from './sample-base';


export class Disabled extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='calendar-control-section' style={{ overflow: 'auto' }}>
                        <CalendarComponent renderDayCell={disabledDate} change={onchange} ></CalendarComponent>
                        <label id='date_label'>Selected Value:</label>
                    </div>
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
function onchange(args: ChangedEventArgs): void {
                    /*Displays selected date in the label*/
                    (document.getElementById('date_label') as HTMLElement).textContent = 'Selected Value: ' + args.value.toLocaleDateString();
                }
ReactDOM.render(<Disabled />, document.getElementById('sample'));