import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from './sample-base';


export class Default extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='datepicker-control-section'>
                        <DatePickerComponent placeholder='Choose a date'></DatePickerComponent>
                    </div>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<Default />, document.getElementById('sample'));