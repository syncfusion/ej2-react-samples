import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DatePickerComponent, Inject, MaskedDateTime } from '@syncfusion/ej2-react-calendars';
import './default-style.css';

function MaskSupport() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const dateValue: Date = new Date();

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='datepicker-control-section'>
                    <DatePickerComponent format='M/d/yyyy' enableMask={true}>
                    <Inject services={[MaskedDateTime]} />
                    </DatePickerComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    The following sample demonstrates the date masking functionality in the DatePicker. It allows you to enter a valid value for each mask pattern of the date masking.
                </p>						 
            </div>
            <div id='description'>
                <p>
                    DatePicker has an <code>enableMask</code> property that allows you to enable the built-in date masking support. The mask pattern is defined based on the provided date format to the component. If the format is not specified, the mask pattern is formed based on the default format of the current culture.
                </p>
            </div>
        </div>
    )
}
export default MaskSupport;