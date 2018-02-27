import * as ReactDOM from 'react-dom';
import * as React from 'react';
import './datetimepicker-component.css';
import { DateTimePickerComponent, RenderDayCellEventArgs } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { FloatLabelType } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

let dateValue: Date = new Date();
export class Dateformat extends SampleBase<{}, {}> {
  private datetimepickerInstance: DateTimePickerComponent;
  private listObj: DropDownListComponent;
  private dataTypes: { [key: string]: Object }[] = [
    { value: 'dd-MMM-yy hh:mm a' },
    { value: 'yyyy-MM-dd HH:mm' },
    { value: 'dd-MMMM HH:mm' },
  ];
  private fields: object = { value: 'value' };
  public waterMark: string = 'Format';
  public floatLabelType: FloatLabelType = 'Auto';
  public index: number = 0;
  /*Apply selected format to the component*/
  public onChange(): void {
    let format: any = this.listObj.value;
    this.datetimepickerInstance.format = format;
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section row'>
          <div className='col-lg-8'>
            <div className='datetimepicker-control-section'>
              <DateTimePickerComponent format='dd-MMM-yy hh:mm a'
                ref={calendar => this.datetimepickerInstance = calendar} value={dateValue} ></DateTimePickerComponent>
            </div>
          </div>
          <div id="format" className='col-lg-3 property-section'>
            <div>
              <DropDownListComponent id="dateFormats" dataSource={this.dataTypes} fields={this.fields} floatLabelType={this.floatLabelType} index={this.index} ref={(dropdownlist) => { this.listObj = dropdownlist }} placeholder={this.waterMark} change={this.onChange.bind(this)}>
              </DropDownListComponent>
            </div>
          </div>
        </div>
        <div id="action-description">
          <p>
            In this sample, the DateTimePicker has been configured with the <code>dd-MMM-yy hh:mm a</code> datetime format. To change this current datetime format, go to the properties panel at the right side and select a datetime format from the dropdown options.</p>
        </div>
        <div id='description'>
          <p>
            Format sample illustrates the support of custom date format in the DateTimePicker component by
            using the <code>format</code> property. You can also change the datetime format by selecting it from the format options in the properties
            panel.  By using the <code>timeFormat</code> property to customize the displayed time value in a time popup list.
        </p>
          <p> More information on the datetime format configuration can be found in the <a href="http://ej2.syncfusion.com/react/documentation/datetimepicker/globalization.html#date-format" target="_blank"> documentation section</a>.</p>
        </div>
      </div>
    )
  }
}
