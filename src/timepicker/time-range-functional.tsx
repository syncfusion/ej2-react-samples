import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import './range-style.css';

function Range() {
    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])
    let endObject: TimePickerComponent;
    let startObject: TimePickerComponent;
    let checkObj: CheckBoxComponent;
    let isStartTimeChange: Boolean = true;
    let endTimeInput: HTMLInputElement;
    let value: Date;

    function rendereComplete(): void {
        endTimeInput = document.getElementById('maxtimepick') as HTMLInputElement;
    }

    function changeTime(): void {
        /*To determine whether we have selected business hours or not*/
        isStartTimeChange = false;
        if (checkObj.checked) {
            /*Business hours*/
            startObject.value = new Date('9/6/2017 9:00');
            endObject.enabled = true;
            endObject.value = new Date('9/6/2017 18:00');
            startObject.readonly = true;
            endObject.readonly = true;
        } else {
            endObject.value = null;
            startObject.value = null;
            endTimeInput.value = '';
            startObject.readonly = false;
            endObject.readonly = false;
            endObject.enabled = false;
        }
    }
    function onEnableEndTime(args: any): void {
        /*Enables end time if start time is selected*/
        if (isStartTimeChange) {
            endObject.enabled = true;
            endObject.value = null;
            endTimeInput.value = '';
            value = new Date(args.value);
            value.setMinutes(value.getMinutes() + endObject.step);
            endObject.min = value;
        } else {
            isStartTimeChange = true;
        }
    }
    return (
        <div className='control-pane range'>
            <div className='control-section'>
                <div className='timepicker-control-section range'>
                    <TimePickerComponent id="mintimepick"  ref={(mintimepick) => {startObject = mintimepick }} change={onEnableEndTime.bind(this)}></TimePickerComponent>
                </div>
                <div className='timepicker-control-section range'>
                    <TimePickerComponent id="maxtimepick" enabled={false}  ref={(maxtimepick) => {endObject = maxtimepick }} ></TimePickerComponent>
                </div>
                <div className='timepicker-control-section range'>
                    <CheckBoxComponent id="checkbox" ref={(checkbox) => {checkObj = checkbox }} label="Business Hours" change={changeTime.bind(this)}></CheckBoxComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    Select a start time from the first TimePicker and then the second TimePicker will be enabled. Select an end time from the second TimePicker to get a <code>time range</code>. Click/Touch the Business Hours checkbox to change both the TimePickers to <code>read-only</code> state.
                </p>
            </div>
            <div id='description'>
                <p>Time Range sample illustrates the appointment time selection scenario with the start and end time option. Here, two TimePicker
                   components are used to select the start and end time.</p>
                <p>Before the start time selection, the end time TimePicker is in disable state. When the start time is selected, then you
                   will be able to select the end time or else, need to select the entire business hours 9:00 to 18:00 from the <code>Business Hours</code> option. Once the options are checked, both the TimePicker components goes to readonly state.
                </p>
                <p>More information about time range restriction can be found in the  <a target='_blank'
                    href='https://ej2.syncfusion.com/react/documentation/timepicker/time-range/'>documentation</a>  section.</p>
            </div>
        </div>
    )
}
export default Range;