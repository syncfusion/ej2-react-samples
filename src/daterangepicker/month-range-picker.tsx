import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DateRangePickerComponent ,CalendarView} from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './monthrangepicker-style.css';

export class MonthRangePicker extends SampleBase<{}, {}> {
    private start: CalendarView = 'Year';
    private depth: CalendarView = 'Year';
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='daterangepicker-control-section'>
                        <DateRangePickerComponent format='MMM/yyyy hh:mm a' start={this.start} depth={this.depth}></DateRangePickerComponent>
                    </div>
                </div>
                <div id="action-description">
    <p>
        The following sample demonstrates the DateRangePicker component acting as a month range picker. It allows you to select values within the range of months.
    </p>
</div>
<div id="description">
    <p>
    DateRangePicker has the <code>Start</code> and the <code>Depth</code> properties that provide options to restrict users from navigating to any Calendar view (year, month, or decade). 
    </p>
</div>
            </div>
        )
    }
}