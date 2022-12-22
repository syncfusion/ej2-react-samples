import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import './format-style.css';
import { DateTimePickerComponent, RenderDayCellEventArgs } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { FloatLabelType } from '@syncfusion/ej2-react-inputs';
import { PropertyPane } from '../common/property-pane';

let dateValue: Date = new Date();
function Dateformat() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let datetimepickerInstance: DateTimePickerComponent;
    let listObj: DropDownListComponent;
    const dataTypes: { [key: string]: Object }[] = [
        { value: 'dd-MMM-yy hh:mm a' },
        { value: 'yyyy-MM-dd HH:mm' },
        { value: 'dd-MMMM HH:mm' },
    ];
    const fields: object = { value: 'value' };
    const waterMark: string = 'Format';
    const floatLabelType: FloatLabelType = 'Auto';
    const index: number = 0;
    /*Apply selected format to the component*/
    function onChange(): void {
        let format: any = listObj.value;
        datetimepickerInstance.format = format;
    }
    return (
        <div className='control-pane'>
            <div className='control-section row'>
                <div className='col-lg-8'>
                    <div className='datetimepicker-control-section'>
                        <DateTimePickerComponent format='dd-MMM-yy hh:mm a'
                        ref={calendar => datetimepickerInstance = calendar} value={dateValue} ></DateTimePickerComponent>
                    </div>
                </div>
                <div id="format" className='col-lg-4 property-section'>
                    <div>
                        <DropDownListComponent id="dateFormats" dataSource={dataTypes} fields={fields} floatLabelType={floatLabelType} index={index} ref={(dropdownlist) => {listObj = dropdownlist }} placeholder={waterMark} change={onChange.bind(this)}>
                        </DropDownListComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>In this sample, the DateTimePicker has been configured with the
                 <code>dd-MMM-yy hh:mm a</code> date time format.
                To change this current date time format, go to the properties panel at the right side and select a date format from the dropdown options.
                For mobile mode touch the icon at the right side and select a date time format from the dropdown options.</p>
            </div>
            <div id='description'>
                <p>
                    Format sample illustrates the support of custom date format in the DateTimePicker component by
                    using the <code>format</code> property. You can also change the datetime format by selecting it from the format options in the properties
                    panel.  By using the <code>timeFormat</code> property to customize the displayed time value in a time popup list.
                </p>
            </div>
        </div>
    )
}
export default Dateformat;