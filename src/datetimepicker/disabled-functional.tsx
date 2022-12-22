import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DateTimePickerComponent, RenderDayCellEventArgs } from '@syncfusion/ej2-react-calendars';
import './disabled-style.css';

function Disabled() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    function disabledDate(args: RenderDayCellEventArgs): void {
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            /*set 'true' to disable the weekends*/
            args.isDisabled = true;
        }
    }
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='datetimepicker-control-section'>
                    <DateTimePickerComponent renderDayCell={disabledDate}></DateTimePickerComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                  In the following sample, all the weekends (Saturday and Sunday) of a month are
                  <code>disabled</code>, and these dates are restricted to set or select in the DateTimePicker.
                </p>
            </div>
            <div id='description'>
                <p>
                  Disabled Dates sample demonstrates how to disable specific dates in the DateTimePicker by using <code>renderDayCell</code>        event. This event gets triggered on each day cell element creation, that allows you to customize, or disable specific
                  dates in the DateTimePicker. Here the weekend dates are disabled by using renderDayCell.
                </p>
                <p>More information on the disabled dates can be found in the
                  <a href="https://ej2.syncfusion.com/react/documentation/datetimepicker/customization/" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Disabled;