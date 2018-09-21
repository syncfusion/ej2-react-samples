import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './datepicker-component.css';

export class Default extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='datepicker-control-section'>
                        <DatePickerComponent></DatePickerComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        The following sample demonstrates the default functionalities of the DatePicker. Today's date is always <code>highlighted</code> in the popup calendar and it get focused if there's no selected date. Click the desired date from the popup calendar and the selected date will be displayed in the element. </p>						 
                </div>
                <div id='description'>
                    <p>
                        The <code>DatePicker</code> is a graphical user interface component that allows the user to select, or to enter a date value.
                   </p>
                    <p>More information on the DatePicker instantiation can be found in the
              <a href="https://ej2.syncfusion.com/react/documentation/datepicker/getting-started.html" target="_blank"> documentation section</a>.
          </p>
                </div>
            </div>
        )
    }
}