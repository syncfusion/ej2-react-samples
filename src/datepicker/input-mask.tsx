import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DatePickerComponent, Inject, MaskedDateTime } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './default-style.css';

export class MaskSupport extends SampleBase<{}, {}> {
    private dateValue: Date = new Date();
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='datepicker-control-section'>
                        <DatePickerComponent format='M/d/yyyy' enableMask={true}>
                    <Inject services={[MaskedDateTime]} /></DatePickerComponent>
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
}