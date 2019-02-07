import * as ReactDOM from 'react-dom';
import * as React from 'react';
import './format-style.css';
import { DateRangePickerComponent, RenderDayCellEventArgs } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { FloatLabelType } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

let startValue: Date = new Date(new Date().setDate(1));
let endValue: Date = new Date(new Date().setDate(20))
export class Format extends SampleBase<{}, {}> {
  private daterangepickerInstance: DateRangePickerComponent;
  private listObj: DropDownListComponent;
  private dataTypes: { [key: string]: Object }[] = [
    {  value: 'dd\'\/\'MMM\'\/\'yy hh:mm a', text: 'dd/MMM/yy hh:mm a' },
    {  value: 'yyyy\'\/\'MM\'\/\'dd HH:mm', text: 'yyyy/MM/dd HH:mm' },
    {  value: 'dd\'\/\'MMMM\'\/\'yyyy', text: 'dd/MMMM/yyyy' },
  ];
  private fields: object = { value: 'value', text: 'text' };
  public waterMark: string = 'Format';
  public floatLabelType: FloatLabelType = 'Auto';
  public index: number = 0;
  /*Apply selected format to the component*/
  public onChange(): void {
    let format: any = this.listObj.value;
    this.daterangepickerInstance.format = format;
    this.daterangepickerInstance.separator = (this.listObj.text === 'yyyy/MM/dd HH:mm') ? 'to' : '-';
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section row'>
          <div className='col-lg-8'>
            <div className='daterangepicker-control-section format'>
              <DateRangePickerComponent format='dd/MMM/yy hh:mm a' ref={calendar => this.daterangepickerInstance = calendar} startDate={startValue} endDate={endValue} ></DateRangePickerComponent>
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
            In this sample, the DateRangePicker has been configured with the <code> dd/MMM/yy hh:mm a</code> date time format. To change this current date time format, go to the properties panel at the right side and select a date format from the dropdown options. For mobile mode touch the icon at the right side and select a date time format from the dropdown options.
          </p>
        </div>
        <div id='description'>
          <p>
            Format sample illustrates the support of custom date format in the DateRangePicker component by
            using the <code>format</code> property. You can also change the date format by selecting it from the format options in the properties
            panel.
        </p>
        <p> More information on the date format configuration can be found in the <a href="https://ej2.syncfusion.com/react/documentation/daterangepicker/globalization/#date-format" target="_blank"> documentation section</a>.</p>
        </div>
      </div>
    )
  }
}