import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './format-style.css';
import { DatePickerComponent, FormatObject } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { FloatLabelType } from '@syncfusion/ej2-react-inputs';

const dateValue: Date = new Date();
const Dateformat = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const dataTypes: { [key: string]: Object }[] = [
        { value: 'dd-MMM-yy' },
        { value: 'yyyy-MM-dd' },
        { value: 'dd-MMMM' },
    ];
    const fields: object = { value: 'value' };
    const waterMark: string = 'Format';
    const floatLabelType: FloatLabelType = 'Auto';
    const index: number = 0;
    const [format, setFormat] = useState<string | FormatObject>('dd-MMM-yy');
    /*Apply selected format to the component*/
    const onChange = (args: ChangeEventArgs): void => {
        setFormat(args.value as FormatObject);
    }
    return (
        <div className='control-pane'>
            <div className='control-section row'>
                <div className='col-lg-8'>
                    <div className='datepicker-control-section'>
                        <DatePickerComponent format={format} value={dateValue} ></DatePickerComponent>
                    </div>
                </div>
                <div id="format" className='col-lg-4 property-section'>
                    <div>
                        <DropDownListComponent id="dateFormats" dataSource={dataTypes} fields={fields} floatLabelType={floatLabelType} index={index} placeholder={waterMark} change={onChange.bind(this)}>
                        </DropDownListComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>In this sample, the DatePicker has been configured with the <code>dd-MMM-yy</code> date format.
                    To change this current date format, go to the properties panel at the right side and select a date format from the dropdown options.
                    For mobile mode touch the icon at the right side and select a date format from the dropdown options.</p>
            </div>
            <div id='description'>
                <p>Format sample illustrates the support of custom date format in the DatePicker component by
                    using the <code>format</code> property. You can also change the date format by selecting it from the format options in the properties
                    panel.</p>
                <p> More information on the date format configuration can be found in the <a href="https://ej2.syncfusion.com/react/documentation/datepicker/date-format/" target="_blank"> documentation section</a>.</p>
            </div>
        </div>
    )
}
export default Dateformat;