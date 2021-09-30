import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { CalendarComponent, ChangedEventArgs } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './multi-style.css';

export class MultipleSelection extends SampleBase<{}, {}> {

    private calendarInstance: CalendarComponent;
    private selectedValues: Date[] = [new Date(new Date().getFullYear(), new Date().getMonth(), 10), new Date(new Date().getFullYear(), new Date().getMonth(), 15),
    new Date(new Date().getFullYear(), new Date().getMonth(), 25)];

    public onchange(): void {
        var element: Element = document.getElementById('multiselect');
        element.innerHTML = '';
        for (var index: number = 0; index < this.calendarInstance.values.length; index++) {
            element.insertBefore(document.createTextNode(this.calendarInstance.values[index].toString()), element.childNodes[0]);
            element.insertBefore(document.createElement('br'), element.childNodes[0]);
        }
    }

    render() {
        return (
            <div className="col-lg-12 control-section">
                <div className="col-lg-7">
                    <div id="control_wrapper" className="col-lg-6 col-sm-8 col-md-8 multiselectWrapper">
                        <div className='calendar-control-section' style={{ overflow: 'auto' }}>
                            <CalendarComponent id="calendar" isMultiSelection={true} values={this.selectedValues}
                                ref={(scope) => { this.calendarInstance = scope; }} change={this.onchange.bind(this)} created={this.onchange.bind(this)}></CalendarComponent>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5">
                    <label>Selected values</label>
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
            </div>);
    }
}

