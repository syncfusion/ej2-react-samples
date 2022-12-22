import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import './default-style.css';

function Default() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const dateValue: Date = new Date();
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='datepicker-control-section'>
                    <DatePickerComponent value={dateValue}></DatePickerComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    The following sample demonstrates the default functionalities of the DatePicker. Today's date is always <code>highlighted</code> in the popup calendar and it get focused if there's no selected date. Click/Touch the desired date from the popup calendar and the selected date will be displayed in the element.
                </p>						 
            </div>
            <div id='description'>
                <p>
                    The <code>DatePicker</code> is a graphical user interface component that allows the user to select, or to enter a date value.
                </p>
                <p>More information on the DatePicker instantiation can be found in the
                    <a href="https://ej2.syncfusion.com/react/documentation/datepicker/getting-started/" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Default;