import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DatePickerComponent, CalendarView } from '@syncfusion/ej2-react-calendars';
import './monthpicker-style.css';

const MonthPicker = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const start: CalendarView = 'Year';
    const depth: CalendarView = 'Year';
    const format: string = 'MMMM y';
    const dateValue: Date = new Date();

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='datepicker-control-section'>
                    <DatePickerComponent value={dateValue} start={start} depth={depth} format={format}></DatePickerComponent>
                </div>
            </div>
            <div id="action-description">
                <p>The following sample demonstrates the DatePicker component acting as a month picker. It allows you to select values in terms of months.</p>
            </div>
            <div id="description">
                <p>DatePicker has the <code>Start</code> and the <code>Depth</code> properties that provide options to restrict users from navigating to any Calendar view (year, month, or decade). </p>
                <p>More information on the DatePicker Start/Depth can be found in the
                    <a href="https://ej2.syncfusion.com/react/documentation/datepicker/date-views/#start-and-depth-view" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default MonthPicker;