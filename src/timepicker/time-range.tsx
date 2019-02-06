import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import './range-style.css';

export class Range extends SampleBase<{}, {}> {
    private endObject: TimePickerComponent;
    private startObject: TimePickerComponent;
    private checkObj: CheckBoxComponent;
    private isStartTimeChange: Boolean = true;
    private endTimeInput: HTMLInputElement;
    private value: Date;

    public rendereComplete(): void {
        this.endTimeInput = document.getElementById('maxtimepick') as HTMLInputElement;
    }
    public changeTime(): void {
        /*To determine whether we have selected business hours or not*/
        this.isStartTimeChange = false;
        if (this.checkObj.checked) {
            /*Business hours*/
            this.startObject.value = new Date('9/6/2017 9:00');
            this.endObject.enabled = true;
            this.endObject.value = new Date('9/6/2017 18:00');
            this.startObject.readonly = true;
            this.endObject.readonly = true;
        } else {
            this.endObject.value = null;
            this.startObject.value = null;
            this.endTimeInput.value = '';
            this.startObject.readonly = false;
            this.endObject.readonly = false;
            this.endObject.enabled = false;
        }
    }
    public onEnableEndTime(args: any): void {
        /*Enables end time if start time is selected*/
        if (this.isStartTimeChange) {
            this.endObject.enabled = true;
            this.endObject.value = null;
            this.endTimeInput.value = '';
            this.value = new Date(args.value);
            this.value.setMinutes(this.value.getMinutes() + this.endObject.step);
            this.endObject.min = this.value;
        } else {
            this.isStartTimeChange = true;
        }
    }

    render() {
        return (
            <div className='control-pane range'>
                <div className='control-section'>
                    <div className='timepicker-control-section range'>
                        <TimePickerComponent id="mintimepick"  ref={(mintimepick) => { this.startObject = mintimepick }} change={this.onEnableEndTime.bind(this)}></TimePickerComponent>
                    </div>
                    <div className='timepicker-control-section range'>
                        <TimePickerComponent id="maxtimepick" enabled={false}  ref={(maxtimepick) => { this.endObject = maxtimepick }} ></TimePickerComponent>
                    </div>
                    <div className='timepicker-control-section range'>
                        <CheckBoxComponent id="checkbox" ref={(checkbox) => { this.checkObj = checkbox }} label="Business Hours" change={this.changeTime.bind(this)}></CheckBoxComponent>
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
}