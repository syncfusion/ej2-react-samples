import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DateTimePickerComponent, Inject, MaskedDateTime } from '@syncfusion/ej2-react-calendars';
import './default-style.css';

function MaskSupport() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='datetimepicker-control-section'>
                    <DateTimePickerComponent format='M/d/yyyy hh:mm a' enableMask={true}>
                <Inject services={[MaskedDateTime]} /></DateTimePickerComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    The following sample demonstrates the date time masking functionality in the DateTimePicker. It allows you to enter a valid value for each mask pattern of the date time masking.
                </p>
            </div>
            <div id='description'>
                <p>
                    DateTimePicker has an <code>enableMask</code> property that allows you to enable the built-in date time masking support. The mask pattern is defined based on the provided date time format to the component. If the format is not specified, the mask pattern is formed based on the default format of the current culture.
                </p>
            </div>
        </div>
    )
}
export default MaskSupport;