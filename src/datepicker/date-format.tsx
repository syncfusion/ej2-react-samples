import * as ReactDOM from 'react-dom';
import * as React from 'react';
import './format-style.css';
import { DatePickerComponent, RenderDayCellEventArgs, ChangedEventArgs } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent, ChangeEventArgs, MultiSelectComponent, CheckBoxSelection, Inject } from '@syncfusion/ej2-react-dropdowns';
import { FloatLabelType } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

let dateValue: Date = new Date();
export class Dateformat extends SampleBase<{}, {}> {
  private datepickerInstance: DatePickerComponent;
  private listObj: DropDownListComponent;
  private inputFormatInstance: MultiSelectComponent;
  private inputFormats: string[] = ['dd/MM/yyyy', 'yyyyMMdd'];

  private dataTypes: { [key: string]: Object }[] = [
    { value: 'dd-MMM-yy' },
    { value: 'yyyy-MM-dd' },
    { value: 'dd-MMMM' },
  ];
  private inputFormatData: { text: string; value: string }[] = [
    { text: 'dd/MM/yyyy', value: 'dd/MM/yyyy' },
    { text: 'ddMMMyy', value: 'ddMMMyy' },
    { text: 'yyyyMMdd', value: 'yyyyMMdd' },
    { text: 'dd.MM.yy', value: 'dd.MM.yy' },
    { text: 'MM/dd/yyyy', value: 'MM/dd/yyyy' },
    { text: 'yyyy/MMM/dd', value: 'yyyy/MMM/dd' },
    { text: 'dd-MM-yyyy', value: 'dd-MM-yyyy' },
  ];
  private fields: object = { value: 'value' };
  private checkFields: Object = { text: 'text', value: 'value' };
  public waterMark: string = 'Format';
  public index: number = 0;
  /*Apply selected format to the component*/
  public onChange(): void { 
    let format: any = this.listObj.value;
    this.datepickerInstance.format = format;
  }
  public onChangeInputFormat(args: any) {
    this.datepickerInstance.inputFormats = args.value;
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section row'>
          <div className='col-lg-8'>
            <div className='datepicker-control-section'>
              <DatePickerComponent format='dd-MMM-yy' ref={calendar => this.datepickerInstance = calendar} value={dateValue} inputFormats={this.inputFormats} ></DatePickerComponent>
            </div>
          </div>
          <div id="format" className='col-lg-4 property-section'>
            <div className="property-panel-header">Properties</div>
            <div>
              <label className='example-label'>Choose a display format</label>
              <DropDownListComponent id="dateFormats" dataSource={this.dataTypes} fields={this.fields} index={this.index} ref={(dropdownlist) => { this.listObj = dropdownlist }} placeholder={this.waterMark} change={this.onChange.bind(this)}>
              </DropDownListComponent>
            </div>
          </div>
          <div id="format" className='col-lg-4 property-section'>
            <div>
              <label className='example-label' style={{ marginTop: '40px' }}>Choose input formats</label>
              <MultiSelectComponent id="inputFormatsDatePicker" ref={multiselect => this.inputFormatInstance = multiselect} dataSource={this.inputFormatData}
                fields={this.checkFields} placeholder="e.g. MM/dd/yyyy" value={this.inputFormats} mode="CheckBox" showSelectAll={true} showDropDownIcon={true}
                enableSelectionOrder={false} change={this.onChangeInputFormat}>
                <Inject services={[CheckBoxSelection]} />
              </MultiSelectComponent>
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
      </div>
    )
  }
}
