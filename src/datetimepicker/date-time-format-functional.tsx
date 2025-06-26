import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './format-style.css';
import { DateTimePickerComponent, FormatObject, RenderDayCellEventArgs } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent, MultiSelectComponent, CheckBoxSelection, Inject } from '@syncfusion/ej2-react-dropdowns';
import { FloatLabelType } from '@syncfusion/ej2-react-inputs';

const dateValue: Date = new Date();
const Dateformat = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const dataTypes: { [key: string]: Object }[] = [
        { value: 'dd-MMM-yy hh:mm a' },
        { value: 'yyyy-MM-dd HH:mm' },
        { value: 'dd-MMMM HH:mm' },
    ];
    const inputFormatData: { text: string; value: string }[] = [
        { text: 'dd/MM/yyyy HH:mm', value: 'dd/MM/yyyy HH:mm' },
        { text: 'ddMMMyy HH:mm', value: 'ddMMMyy HH:mm' },
        { text: 'yyyyMMdd HH:mm', value: 'yyyyMMdd HH:mm' },
        { text: 'dd.MM.yy HH:mm', value: 'dd.MM.yy HH:mm' },
        { text: 'MM/dd/yyyy HH:mm', value: 'MM/dd/yyyy HH:mm' },
        { text: 'yyyy/MMM/dd HH:mm', value: 'yyyy/MMM/dd HH:mm' },
        { text: 'dd-MM-yyyy HH:mm', value: 'dd-MM-yyyy HH:mm' },
    ];
    const fields: object = { value: 'value' };
    const checkFields: Object = { text: 'text', value: 'value' };
    const waterMark: string = 'Format';
    const index: number = 0;
    const [format, setFormat] = useState<string | FormatObject>('dd-MMM-yy hh:mm a');
    const [inputFormats, setinputFormats] = useState<string[]>(['dd/MM/yyyy HH:mm', 'yyyyMMdd HH:mm']);
    /*Apply selected format to the component*/
    const onChange = (args: any): void => {
        setFormat(args.value);
    };
    const onChangeInputFormat = (args: any): void => {
        setinputFormats(args.value as any);
    }
    return (
        <div className='control-pane'>
            <div className='control-section row'>
                <div className='col-lg-8'>
                    <div className='datetimepicker-control-section'>
                        <DateTimePickerComponent format={format} value={dateValue} inputFormats={inputFormats} />
                    </div>
                </div>
                <div id="format" className='col-lg-4 property-section' style={{ width: '250px' }}>
                    <div className="property-panel-header">Properties</div>
                    <div>
                        <label className='example-label'>Choose a display format</label>
                        <DropDownListComponent id="dateFormats" dataSource={dataTypes} fields={fields} index={index} placeholder={waterMark} change={onChange.bind(this)}>
                        </DropDownListComponent>
                    </div>
                </div>
                <div id="format" className='col-lg-4 property-section' style={{ width: '250px' }}>
                    <div>
                        <label className="example-label" style={{ marginTop: '40px' }}>Choose input formats</label>
                        <MultiSelectComponent id="inputFormatsDatePicker" dataSource={inputFormatData}
                            fields={checkFields} placeholder="e.g. MM/dd/yyyy" value={inputFormats} mode="CheckBox" showSelectAll={true} showDropDownIcon={true}
                            enableSelectionOrder={false} change={onChangeInputFormat}>
                            <Inject services={[CheckBoxSelection]} />
                        </MultiSelectComponent>
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
                <p>
                    Furthermore, this example showcases the flexible date value parsing functionality available in DateTimePicker
                    component.
                    By utilizing the <code>inputFormats</code> property, users can enter dates in various formats, which will be
                    automatically parsed and formatted according to the chosen date format.
                </p>
            </div>
        </div>
    )
}
export default Dateformat;