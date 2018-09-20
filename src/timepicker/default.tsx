import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './timepicker-component.css';

export class Default extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane default'>
                <div className='control-section'>
                    <div className='timepicker-control-section'>
                        <TimePickerComponent ></TimePickerComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        The following sample demonstrates the default functionalities of the TimePicker. Click the TimePicker icon to select a desired time and the selected time value will be displayed in the TimePicker element.</p>
                </div>
                <div id='description'>
                    <p>
                        A <code>TimePicker</code> is an interactive component that provides an option to select a value from popup list or
              set a desired time value.
          </p>
                    <p> 	More information about TimePicker and it's configuration can be found in the  <a target='_blank'
                        href='https://ej2.syncfusion.com/react/documentation/timepicker/getting-started.html#adding-timepicker-component-to-the-application'>documentation</a>  section.
          </p>
                </div>
            </div>
        )
    }
}