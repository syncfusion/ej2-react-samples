import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './range-style.css';

export class Range extends SampleBase<{}, {}> {

    private minDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 7, 10);
    private maxDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 27, 22, 30);
    private minTime: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 7, 10);
    private maxTime: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 27, 20, 30);
    private dateValue: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 14, 10, 30);

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='col-lg-6'>
                        <div className='datetimepicker-control-section' id="datetime-restriction">
                        <h4>DateTime Restriction</h4>
                            <DateTimePickerComponent id="calendar1" min={this.minDate} max={this.maxDate} value={this.dateValue} ></DateTimePickerComponent>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='datetimepicker-control-section' id="time-restriction">
                        <h4>Time Restriction</h4>
                            <DateTimePickerComponent id="calendar2" minTime={this.minTime} maxTime={this.maxTime}  value={this.dateValue} ></DateTimePickerComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>This example demonstrates date and time selection within specific ranges defined by the <code>Min</code>, <code>Max</code>, <code>MinTime</code>, and <code>MaxTime</code> properties. Dates and times outside these ranges are <code>restricted</code> and cannot be set or selected.</p>
                </div>
                <div id='description'>
                    <p>Date Range example explains the date and time selection within the specific range in a calendar and time popup list by using <code>Min</code>, <code>Max</code>, <code>MinTime</code> and <code>MaxTime</code> properties. Here, the 1st datetimepicker date selection range was restricted within a range from 7th 10:00 AM to 27th 10:30 PM days in a month.</p>
                    <p>The 2nd datetimepicker time selection range is restricted from 10:00 AM to 8:30 PM of each day.</p>
                    <p>More information on the date range configuration can be found in the <a href="https://ej2.syncfusion.com/react/documentation/datetimepicker/date-time-range/" target="_blank"> documentation section</a>.</p>
                </div>
            </div>
        )
    }
}