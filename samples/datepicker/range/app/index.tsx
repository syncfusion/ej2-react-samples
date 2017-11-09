import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from './sample-base';


let today: Date = new Date();
let currentYear: number = today.getFullYear();
let currentMonth: number = today.getMonth();
let currentDay: number = today.getDate();
let minDate: Date = new Date(currentYear, currentMonth, 7);
let maxDate: Date = new Date(currentYear, currentMonth, 27);
let dateValue: Date = new Date(currentYear, currentMonth, 14);
export class Range extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='datepicker-control-section'>
                        <DatePickerComponent id="calendar" min={minDate} max={maxDate} value={dateValue} placeholder='Choose a date'></DatePickerComponent>
                    </div>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<Range />, document.getElementById('sample'));