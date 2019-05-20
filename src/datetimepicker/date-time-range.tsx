import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './range-style.css';

export class Range extends SampleBase<{}, {}> {

    private minDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 7, 10);
    private maxDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 27, 22, 30);
    private dateValue: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 14, 10, 30);

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='datetimepicker-control-section'>
                        <DateTimePickerComponent id="calendar" min={this.minDate} max={this.maxDate} value={this.dateValue} ></DateTimePickerComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        In the following sample, a specific datetime ranges from 7th 10:00 AM to 27th 10:30 PM of the current month has been set to select from the Calendar. All the other dates are out of range and <code>restricted</code> to set or select.
                    </p>    
                </div>
                <div id='description'>
                    <p>
                        Date Range sample illustrates the date selection within the specific range in a calendar and time popup list by using min and max properties.
              Here, the date selection range was restricted within a range from 7th 10AM to 27th 10:30 PM days in a month.
          </p>
          <p>More information on the date range configuration can be found in the <a href="https://ej2.syncfusion.com/react/documentation/datetimepicker/date-time-range/" target="_blank"> documentation section</a>.</p>
                </div>
            </div>
        )
    }
}