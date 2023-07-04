import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import './default-style.css';

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='datetimepicker-control-section'>
                    <DateTimePickerComponent></DateTimePickerComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    The following sample demonstrates the default functionalities of the DateTimePicker. Enter the value in input text box or Click/Touch the date and time popup icon to select the desired value.
                </p>
            </div>
            <div id='description'>
                <p>
                    The <code>DateTimePicker</code> is a graphical user interface component that allows the user to select, or to enter a date time value.
                </p>
                <p>More information on the DateTimePicker instantiation can be found in the
                    <a href="https://ej2.syncfusion.com/react/documentation/datetimepicker/getting-started/" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Default;