import * as React from 'react';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import { Internationalization } from '@syncfusion/ej2-base';
import './monthpicker-style.css';
export class MonthPicker extends SampleBase {
    constructor() {
        super(...arguments);
        this.start = 'Year';
        this.depth = 'Year';
    }
    onchange(args) {
        let intl = new Internationalization();
        let value = intl.formatDate(args.value, { type: 'dateTime', format: 'MMMM y' });
        /*Displays selected date in the label*/
        document.getElementById('date_label').textContent = 'Selected Value: ' + value;
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <div className='calendar-control-section' style={{ overflow: 'auto' }}>
                        <CalendarComponent change={this.onchange} start={this.start} depth={this.depth}></CalendarComponent>
                        <label id='date_label'>Selected Value:</label>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                    The following sample demonstrates the Calendar component acting as a month picker. It allows you to select values in terms of months.
                    </p>
                </div>
                <div id="description">
                    <p>
                    The Calendar has the <code>Start</code> and the <code>Depth</code> properties that provide options to restrict users from navigating to any Calendar view (year, month, or decade). </p>
                    <p>More information on the Calendar Start/Depth can be found in the
                    <a href="https://ej2.syncfusion.com/react/documentation/api/calendar/#start" target="_blank">Start</a>|<a href="https://ej2.syncfusion.com/react/documentation/api/calendar/#depth" target="_blank">Depth</a> documentation section.</p>
                </div>
            </div>);
    }
}
