import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { CalendarComponent, ChangedEventArgs } from '@syncfusion/ej2-react-calendars';
import './multi-style.css';

function MultipleSelection() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let calendarInstance: CalendarComponent;
    const selectedValues: Date[] = [new Date(new Date().getFullYear(), new Date().getMonth(), 10), new Date(new Date().getFullYear(), new Date().getMonth(), 15),
    new Date(new Date().getFullYear(), new Date().getMonth(), 25)];

    function onchange(): void {
        var element: Element = document.getElementById('multiselect');
        element.innerHTML = '';
        for (var index: number = 0; index < calendarInstance.values.length; index++) {
            element.insertBefore(document.createTextNode(calendarInstance.values[index].toString()), element.childNodes[0]);
            element.insertBefore(document.createElement('br'), element.childNodes[0]);
        }
    }

    return (
        <div className="col-lg-12">
            <div className="col-lg-7 control-section">
                <div id="control_wrapper" className="col-lg-6 col-sm-8 col-md-8 multiselectWrapper">
                    <div className='calendar-control-section'>
                        <CalendarComponent id="calendar" isMultiSelection={true} values={selectedValues}
                            ref={(scope) => {calendarInstance = scope; }} change={onchange.bind(this)} created={onchange.bind(this)}></CalendarComponent>
                    </div>
                </div>
            </div>
            <div className="col-lg-5">
                <label style={{ paddingTop: "22px"}}>Selected values</label>
                <div className="content-value">
                    <div id="multiselect"></div>
                </div>
            </div>
            <div id="action-description">
                <p>
                    The following sample demonstrates the multiple date selection functionalities of the Calendar. Click /Touch the desired date from the Calendar and the selected date will be added to the values property of the calendar.
                </p>
            </div>
            <div id="description">
                <p>
                    Multi selection sample demonstrates, how to enable and select the multiple date in a calendar by using
                    <code>isMultiSelection</code> and
                    <code>values</code> properties . Here 10, 15 and 25 date's are selected.
                </p>
                <p>More information on the calendar instantiation can be found in this
                    <a href="https://ej2.syncfusion.com/react/documentation/calendar/multi-select/#multi-selection" target="_blank">
                    documentation section</a>.</p>
            </div>
        </div>
    );
}
export default MultipleSelection;
