import * as React from 'react';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './monthpicker-style.css';
export class MonthPicker extends SampleBase {
    constructor() {
        super(...arguments);
        this.start = 'Year';
        this.depth = 'Year';
        this.format = 'MMMM y';
        this.dateValue = new Date();
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <div className='datepicker-control-section'>
                        <DatePickerComponent value={this.dateValue} start={this.start} depth={this.depth} format={this.format}></DatePickerComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                    The following sample demonstrates the DatePicker component acting as a month picker. It allows you to select values in terms of months.
                    </p>
                </div>
                <div id="description">
                    <p>
                    DatePicker has the <code>Start</code> and the <code>Depth</code> properties that provide options to restrict users from navigating to any Calendar view (year, month, or decade). </p>
                                <p>More information on the DatePicker Start/Depth can be found in the
                    <a href="https://ej2.syncfusion.com/react/documentation/datepicker/date-views/#start-and-depth-view" target="_blank"> documentation section</a>.
                </p>
                </div>
            </div>);
    }
}
