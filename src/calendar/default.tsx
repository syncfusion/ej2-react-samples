import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { CalendarComponent, ChangedEventArgs } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './default-style.css';

export class Default extends SampleBase<{}, {}> {

    public onchange(args: ChangedEventArgs): void {
        /*Displays selected date in the label*/
        (document.getElementById('date_label') as HTMLElement).textContent = 'Selected Value: ' + args.value.toLocaleDateString();
    }
    
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='calendar-control-section' style={{ overflow: 'auto' }}>
                        <CalendarComponent change={this.onchange} ></CalendarComponent>
                        <label id='date_label'>Selected Value:</label>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        The following sample demonstrates the default functionalities of the Calendar. Today's date is always <code>highlighted</code> in the Calendar and it get <code>focused</code> if there is no selected date. Click/Touch the desired date from the Calendar and the selected date will be displayed in the below label.
                    </p>
                </div>
                <div id='description'>
                    A Calendar is a graphical user interface component which provides the multi-view
          representation to display and select a
          date. Also, provide options to navigate in different levels of views like month, year, decade.
          <p>
             More information on the calendar instantiation can be found in this <a target='_blank'
             href='https://ej2.syncfusion.com/react/documentation/calendar/getting-started/'>documentation</a> section.
          </p>
                </div>
            </div>
        )
    }
}
