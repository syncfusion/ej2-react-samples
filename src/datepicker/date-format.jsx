import * as React from 'react';
import './format-style.css';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
let dateValue = new Date();
export class Dateformat extends SampleBase {
    constructor() {
        super(...arguments);
        this.dataTypes = [
            { value: 'dd-MMM-yy' },
            { value: 'yyyy-MM-dd' },
            { value: 'dd-MMMM' },
        ];
        this.fields = { value: 'value' };
        this.waterMark = 'Format';
        this.floatLabelType = 'Auto';
        this.index = 0;
    }
    /*Apply selected format to the component*/
    onChange() {
        let format = this.listObj.value;
        this.datepickerInstance.format = format;
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section row'>
          <div className='col-lg-8'>
            <div className='datepicker-control-section'>
              <DatePickerComponent format='dd-MMM-yy' ref={calendar => this.datepickerInstance = calendar} value={dateValue}></DatePickerComponent>
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
          In this sample, the DatePicker has been configured with the <code>dd-MMM-yy</code> date format.
        To change this current date format, go to the properties panel at the right side and select a date format from the dropdown options.
        For mobile mode touch the icon at the right side and select a date format from the dropdown options.</p>
        </div>
        <div id='description'>
          <p>
            Format sample illustrates the support of custom date format in the DatePicker component by
            using the <code>format</code> property. You can also change the date format by selecting it from the format options in the properties
            panel.
        </p>
        <p> More information on the date format configuration can be found in the <a href="https://ej2.syncfusion.com/react/documentation/datepicker/date-format/" target="_blank"> documentation section</a>.</p>
        </div>
      </div>);
    }
}
