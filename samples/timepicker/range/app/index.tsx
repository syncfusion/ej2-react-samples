import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from './sample-base';


let value: Date;

export class Range extends SampleBase<{}, {}> {
  private endObject: TimePickerComponent;
  private startObject: TimePickerComponent;
  private checkObj: CheckBoxComponent;
  private isStartTimeChange: Boolean = true;
  private endTimeInput: HTMLInputElement
  
  public rendereComplete():void{
    this.endTimeInput = document.getElementById('maxtimepick') as HTMLInputElement;
  }
  
  public changeTime(): void {
    this.isStartTimeChange = false;
    if (this.checkObj.checked) {
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
    if (this.isStartTimeChange) {
      this.endObject.enabled = true;
      this.endObject.value = null;
      this.endTimeInput.value = '';
      value = new Date(args.value);
      value.setMinutes(value.getMinutes() + this.endObject.step);
      this.endObject.min = value;
    }else{
      this.isStartTimeChange = true;
    }
  }

  render() {
    return (
      <div className='control-pane range'>
        <div className='control-section'>
          <div className='timepicker-control-section range'>
            <TimePickerComponent id="mintimepick" placeholder='Start Time' ref={(mintimepick) => { this.startObject = mintimepick }} change={this.onEnableEndTime.bind(this)}></TimePickerComponent>
          </div>
          <div className='timepicker-control-section range'>
            <TimePickerComponent id="maxtimepick" enabled={false} placeholder='End Time' ref={(maxtimepick) => { this.endObject = maxtimepick }} ></TimePickerComponent>
          </div>
          <div className='timepicker-control-section range'>
            <CheckBoxComponent id="checkbox" ref={(checkbox) => { this.checkObj = checkbox }} label="Business Hours" change={this.changeTime.bind(this)}></CheckBoxComponent>
          </div>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<Range />, document.getElementById('sample'));