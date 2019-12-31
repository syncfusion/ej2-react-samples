import * as React from 'react';
import './format-style.css';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
let dateValue = new Date();
export class Dateformat extends SampleBase {
    constructor() {
        super(...arguments);
        this.dataTypes = [
            { value: 'dd-MMM-yy hh:mm a' },
            { value: 'yyyy-MM-dd HH:mm' },
            { value: 'dd-MMMM HH:mm' },
        ];
        this.fields = { value: 'value' };
        this.waterMark = 'Format';
        this.floatLabelType = 'Auto';
        this.index = 0;
    }
    /*Apply selected format to the component*/
    onChange() {
        let format = this.listObj.value;
        this.datetimepickerInstance.format = format;
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section row'>
          <div className='col-lg-8'>
            <div className='datetimepicker-control-section'>
              <DateTimePickerComponent format='dd-MMM-yy hh:mm a' ref={calendar => this.datetimepickerInstance = calendar} value={dateValue}></DateTimePickerComponent>
            </div>
          </div>
          <div id="format" className='col-lg-3 property-section'>
            <div>
              <DropDownListComponent id="dateFormats" dataSource={this.dataTypes} fields={this.fields} floatLabelType={this.floatLabelType} index={this.index} ref={(dropdownlist) => { this.listObj = dropdownlist; }} placeholder={this.waterMark} change={this.onChange.bind(this)}>
              </DropDownListComponent>
            </div>
          </div>
        </div>
        <div id="action-description">
          <p>
            In this sample, the DateTimePicker has been configured with the
            <code>dd-MMM-yy hh:mm a</code> date time format.
            To change this current date time format, go to the properties panel at the right side and select a date format from the dropdown options.
            For mobile mode touch the icon at the right side and select a date time format from the dropdown options.
          </p>
        </div>
        <div id='description'>
          <p>
            Format sample illustrates the support of custom date format in the DateTimePicker component by
            using the <code>format</code> property. You can also change the datetime format by selecting it from the format options in the properties
            panel.  By using the <code>timeFormat</code> property to customize the displayed time value in a time popup list.
        </p>
        </div>
      </div>);
    }
}
