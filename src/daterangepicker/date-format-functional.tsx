import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './format-style.css';
import { DateRangePickerComponent, FormatObject, RenderDayCellEventArgs } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent, ChangeEventArgs, MultiSelectComponent, CheckBoxSelection, Inject } from '@syncfusion/ej2-react-dropdowns';
import { FloatLabelType } from '@syncfusion/ej2-react-inputs';

const startValue: Date = new Date(new Date().setDate(1));
const endValue: Date = new Date(new Date().setDate(20))
const Format = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const dataTypes: { [key: string]: Object }[] = [
        { value: 'dd-MMM-yy' },
        { value: 'yyyy-MM-dd' },
        { value: 'dd-MMMM' },
        { value: 'dd/MMM/yy hh:mm a' },
    ];
    const inputFormatData: { text: string; value: string }[] = [
        { text: 'dd/MM/yyyy', value: 'dd/MM/yyyy' },
        { text: 'ddMMMyy', value: 'ddMMMyy' },
        { text: 'yyyyMMdd', value: 'yyyyMMdd' },
        { text: 'dd.MM.yy', value: 'dd.MM.yy' },
        { text: 'MM/dd/yyyy', value: 'MM/dd/yyyy' },
        { text: 'yyyy/MMM/dd', value: 'yyyy/MMM/dd' },
        { text: 'dd-MM-yyyy', value: 'dd-MM-yyyy' },
    ];
    const fields: any = { value: 'value' };
    const checkFields: Object = { text: 'text', value: 'value' };
    const waterMark: string = 'Format';
    const floatLabelType: FloatLabelType = 'Auto';
    const index: number = 3;
    const [format, setFormat] = useState<string | FormatObject>('dd/MMM/yy hh:mm a');
    const [inputFormats, setinputFormats] = useState<string[]>(['dd/MM/yyyy', 'yyyyMMdd']);
    const [separator, setSeparator] = useState<string>('-');
    /*Apply selected format to the component*/
    const onChange = (args: ChangeEventArgs): void => {
        setFormat(args.value as FormatObject);
    }
    const onChangeInputFormat = (args: any): void => {
        if (args != null && fields.text != null) {
            setinputFormats(args.value as any);
            setSeparator(
                args.itemData[fields.text] === 'yyyy/MM/dd HH:mm' ? 'to' : '-'
            );
        }
    }
    return (
        <div className='control-pane'>
            <div className='control-section row'>
                <div className='col-lg-7'>
                    <div className='daterangepicker-control-section format'>
                        <DateRangePickerComponent format={format} separator={separator} startDate={startValue} endDate={endValue} inputFormats={inputFormats}></DateRangePickerComponent>
                    </div>
                </div>
                <div id="format" className='col-lg-4 property-section'>
                    <div className="property-panel-header">Properties</div>
                    <div>
                        <label className='example-label'>Choose a display format</label>
                        <DropDownListComponent id="dateFormats" dataSource={dataTypes} fields={fields} index={index} placeholder={waterMark} change={onChange.bind(this)}>
                        </DropDownListComponent>
                    </div>
                </div>
                <div id="format" className='col-lg-4 property-section'>
                    <div>
                        <label className="example-label" style={{ marginTop: '40px' }}>Choose input formats</label>
                        <MultiSelectComponent id="inputFormatsDatePicker" dataSource={inputFormatData} allowFiltering={false}
                            fields={checkFields} placeholder="e.g. MM/dd/yyyy" value={inputFormats} mode="CheckBox" showSelectAll={true} showDropDownIcon={true}
                            enableSelectionOrder={false} change={onChangeInputFormat}>
                            <Inject services={[CheckBoxSelection]} />
                        </MultiSelectComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>In this sample, the DateRangePicker has been configured with the <code>dd-MMM-yy hh:mm a</code> date time format. To change this current date time format, go to the properties panel at the right side and select a date format from the dropdown options. For mobile mode touch the icon at the right side and select a date time format from the dropdown options.</p>
            </div>
            <div id='description'>
                <p>Format sample illustrates the support of custom date format in the DateRangePicker component by
                    using the <code>format</code> property. You can also change the date format by selecting it from the format options in the properties
                    panel.</p>
                <p>
                    Furthermore, this example showcases the flexible date value parsing functionality available in DateRangePicker component.
                    By utilizing the <code>inputFormats</code> property, users can enter dates in various formats, which will be
                    automatically parsed and formatted according to the chosen date format.
                </p>
                <p> More information on the date format configuration can be found in the <a href="https://ej2.syncfusion.com/react/documentation/daterangepicker/globalization/#date-format" target="_blank"> documentation section</a>.</p>
            </div>
        </div>
    )
}
export default Format;