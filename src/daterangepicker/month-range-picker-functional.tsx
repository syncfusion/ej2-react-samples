import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DateRangePickerComponent ,CalendarView} from '@syncfusion/ej2-react-calendars';
import './monthrangepicker-style.css';

function MonthRangePicker() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const start: CalendarView = 'Year';
    const depth: CalendarView = 'Year';

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='daterangepicker-control-section'>
                    <DateRangePickerComponent format='MMM/yyyy hh:mm a' start={start} depth={depth}></DateRangePickerComponent>
                </div>
            </div>
            <div id="action-description">
                <p>The following sample demonstrates the DateRangePicker component acting as a month range picker. It allows you to select values within the range of months.</p>
            </div>
            <div id="description">
                <p>DateRangePicker has the <code>Start</code> and the <code>Depth</code> properties that provide options to restrict users from navigating to any Calendar view (year, month, or decade).</p>
            </div>
        </div>
    )
}
export default MonthRangePicker;