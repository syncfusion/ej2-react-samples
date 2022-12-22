import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import { Internationalization } from '@syncfusion/ej2-base';
import './monthpicker-style.css';
function MonthPicker() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const start = 'Year';
    const depth = 'Year';
    function onchange(args) {
        let intl = new Internationalization();
        let value = intl.formatDate(args.value, { type: 'dateTime', format: 'MMMM y' });
        /*Displays selected date in the label*/
        document.getElementById('date_label').textContent = 'Selected Value: ' + value;
    }
    return (<div className='control-pane'>
            <div className='control-section'>
                <div className='calendar-control-section' style={{ overflow: 'auto' }}>
                    <CalendarComponent change={onchange} start={start} depth={depth}></CalendarComponent>
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
        </div>
    );
}
export default MonthPicker;
