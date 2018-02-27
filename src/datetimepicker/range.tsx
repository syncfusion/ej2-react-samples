import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './datetimepicker-component.css';

let today: Date = new Date();
let currentYear: number = today.getFullYear();
let currentMonth: number = today.getMonth();
let currentDay: number = today.getDate();
let minDate: Date = new Date(currentYear, currentMonth, 7, 10);
let maxDate: Date = new Date(currentYear, currentMonth, 27, 22, 30);
let dateValue: Date = new Date(currentYear, currentMonth, 14, 10, 30);
export class Range extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='datetimepicker-control-section'>
                        <DateTimePickerComponent id="calendar" min={minDate} max={maxDate} value={dateValue} ></DateTimePickerComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        In the following sample, a specific date ranges from 7th 10:00 AM to 27th 10:30 PM of the current month has been set to select from the Calendar. All the other dates are out of range and <code>restricted</code> to set or select.</p>    
                </div>
                <div id='description'>
                    <p>
                        Date Range sample illustrates the date selection within the specific range in a calendar and time popup list by using min and max properties.
              Here, the date selection range was restricted within a range from 7th 10AM to 27th 10:30 PM days in a month.
          </p>
                    <p>More information on the date range configuration can be found in the <a href="http://ej2.syncfusion.com/react/documentation/datetimepicker/date-range.html" target="_blank"> documentation section</a>.</p>
                </div>
            </div>
        )
    }
}