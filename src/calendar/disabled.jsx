import * as React from 'react';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './disabled-style.css';
export class Disabled extends SampleBase {
    disabledDate(args) {
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            /*set 'true' to disable the weekends*/
            args.isDisabled = true;
        }
    }
    onchange(args) {
        /*Displays selected date in the label*/
        document.getElementById('date_label').textContent = 'Selected Value: ' + args.value.toLocaleDateString();
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <div className='calendar-control-section' style={{ overflow: 'auto' }}>
                        <CalendarComponent renderDayCell={this.disabledDate} change={this.onchange}></CalendarComponent>
                        <label id='date_label'>Selected Value:</label>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                    In the following sample, all the weekends (Saturday and Sunday) of a month are <code>disabled</code>, and these dates are <code>restricted</code> to set or select in the Calendar.
                    </p> 
                </div>
                <div id='description'>
                    Disabled Dates sample demonstrates,
          how to disable a specific dates in a calendar by using renderDayCell event.
          This event gets triggered on each day cell element creation, that allows you to
          customize or disable the specific dates in calendar. Here the weekend date's are disabled by using renderDayCell event.
          <p>
                        More information on the disabled dates can be found in this <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/calendar/customization/'>documentation</a> section.
          </p>
                </div>
            </div>);
    }
}
