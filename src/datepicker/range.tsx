import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './datepicker-component.css';

let today: Date = new Date();
let currentYear: number = today.getFullYear();
let currentMonth: number = today.getMonth();
let currentDay: number = today.getDate();
let minDate: Date = new Date(currentYear, currentMonth, 7);
let maxDate: Date = new Date(currentYear, currentMonth, 27);
let dateValue: Date = new Date(currentYear, currentMonth, 14);
export class Range extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='datepicker-control-section'>
                        <DatePickerComponent id="calendar" min={minDate} max={maxDate} value={dateValue} ></DatePickerComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        In the following sample, a specific date ranges from 7th to 27th of the current month has been set to select from the calendar. All the other dates are out of range and <code>restricted</code> to set or select.</p>    
                </div>
                <div id='description'>
                    <p>
                        Date Range sample illustrates the date selection within the specific range in a calendar by using min and max properties.
              Here, the date selection range was restricted within a range from 7th to 27th days in a month.
          </p>
                    <p>More information on the date range configuration can be found in the <a href="http://ej2.syncfusion.com/react/documentation/datepicker/date-range.html" target="_blank"> documentation section</a>.</p>
                </div>
            </div>
        )
    }
}