import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DateRangePicker, Inject, InPlaceEditorComponent, TimePicker } from '@syncfusion/ej2-react-inplace-editor';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import './pickers.component.css';
// tslint:disable:max-line-length
export class Pickers extends SampleBase {
    constructor() {
        super(...arguments);
        this.dateValue = new Date('5/23/2017');
        this.dateTimeValue = new Date('5/23/2017 12:00 PM');
        this.dateRangeValue = [new Date('5/23/2017'), new Date('7/5/2017')];
        this.datePickerModel = { placeholder: 'Select a date' };
        this.timePickerModel = { placeholder: 'Select a time', value: new Date('5/23/2017,12:00 PM') };
        this.dateTimePickerModel = { placeholder: 'Select a date and time' };
        this.dateRangePickerModel = { placeholder: 'Select a date range' };
        // Mapping DropDownList dataSource property
        this.editorData = [
            { 'value': 'inline', 'text': 'Inline' }, { 'value': 'popup', 'text': 'Popup' }
        ];
        // Mapping DropDownList fields property
        this.dropDownFields = { text: 'text', value: 'value' };
        // Mapping DropDownList value property
        this.dropDownVal = 'inline';
        this.scrollRightPane = () => {
            let mode = document.getElementById('editorMode').value;
            if (mode === 'Inline') {
                return;
            }
            if (this.dateObj && (this.dateObj.element.querySelectorAll('.e-editable-open').length > 0)) {
                this.dateObj.enableEditMode = false;
            }
            if (this.timeObj && (this.timeObj.element.querySelectorAll('.e-editable-open').length > 0)) {
                this.timeObj.enableEditMode = false;
            }
            if (this.dateTimeObj && (this.dateTimeObj.element.querySelectorAll('.e-editable-open').length > 0)) {
                this.dateTimeObj.enableEditMode = false;
            }
            if (this.dateRangeObj && (this.dateRangeObj.element.querySelectorAll('.e-editable-open').length > 0)) {
                this.dateRangeObj.enableEditMode = false;
            }
        };
    }
    // Change event funtion for DropDownList component   
    changeEditorMode(e) {
        let mode = this.editorMode.value;
        this.dateObj.mode = mode;
        this.timeObj.mode = mode;
        this.dateTimeObj.mode = mode;
        this.dateRangeObj.mode = mode;
        this.dateObj.dataBind();
        this.timeObj.dataBind();
        this.dateTimeObj.dataBind();
        this.dateRangeObj.dataBind();
    }
    rendereComplete() {
        let rightPane = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.addEventListener('scroll', () => {
                this.scrollRightPane();
            });
        }
    }
    componentWillUnmount() {
        let rightPane = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.removeEventListener('scroll', () => {
                this.scrollRightPane();
            });
        }
    }
    render() {
        return (<div className='control-pane'>
                <div className="col-lg-8 control-section inplace-control-section pickers-layout">
                    <div className="control_wrapper form-horizontal">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label className="control-label" style={{ textAlign: 'left', fontSize: '14px', fontWeight: 400 }}>
                                            DatePicker </label>
                                    </td>
                                    <td>
                                        <InPlaceEditorComponent ref={(date) => { this.dateObj = date; }} id='datePickerEle' mode='Inline' type='Date' value={this.dateValue} model={this.datePickerModel}>
                                        </InPlaceEditorComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="control-label" style={{ textAlign: 'left', fontSize: '14px', fontWeight: 400 }}>
                                            TimePicker </label>
                                    </td>
                                    <td>
                                        <InPlaceEditorComponent ref={(time) => { this.timeObj = time; }} id='timePickerEle' mode='Inline' type='Time' value={this.dateValue} model={this.timePickerModel}>
                                            <Inject services={[TimePicker]}/>
                                        </InPlaceEditorComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="control-label" style={{ textAlign: 'left', fontSize: '14px', fontWeight: 400 }}>
                                            DateTimePicker </label>
                                    </td>
                                    <td>
                                        <InPlaceEditorComponent ref={(dateTime) => { this.dateTimeObj = dateTime; }} id='dateTimePickerEle' mode='Inline' type='DateTime' value={this.dateTimeValue} model={this.dateTimePickerModel}>
                                        </InPlaceEditorComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="control-label" style={{ textAlign: 'left', fontSize: '14px', fontWeight: 400 }}>
                                            DateRangePicker </label>
                                    </td>
                                    <td>
                                        <InPlaceEditorComponent ref={(dateRange) => { this.dateRangeObj = dateRange; }} id='dateRangePickerEle' mode='Inline' type='DateRange' value={this.dateRangeValue} model={this.dateRangePickerModel}>
                                            <Inject services={[DateRangePicker]}/>
                                        </InPlaceEditorComponent>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-lg-4 property-section' id="pickerProperty">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" className="property-panel-table">
                            <tbody>
                                <tr>
                                    <td>
                                        <div>Mode</div>
                                    </td>
                                    <td>
                                        <div>
                                            
                                            <DropDownListComponent ref={(drop) => { this.editorMode = drop; }} id='editorMode' className='form-control' dataSource={this.editorData} fields={this.dropDownFields} value={this.dropDownVal} width={'90%'} change={this.changeEditorMode.bind(this)}/>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the usage of picker components such as Date, Time, DateTime, and DateRange.
                        Click on the dotted input element to switch to the editable state of the corresponding integrated component.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This sample illustrates the way to integrate picker components with the <code>In-place Editor</code> control. The
                        applicable types of
                        components are:
                    </p>
                    <p>
                        <ul>
                            <li>
                                <code>DatePicker</code>
                            </li>
                            <li>
                                <code>TimePicker</code>
                            </li>
                            <li>
                                <code>DateTimePicker</code>
                            </li>
                            <li>
                                <code>DateRangePicker</code>
                            </li>
                        </ul>
                    </p>
                    <p>
                        The above components and their features are editable in place and can be customized with the model
                        properties
                        of the specific component.
                    </p>
                    <p>
                        More information on the <code>In-place Editor</code> instantiation can be found in the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/inplace-editor/getting-started/">
                            documentation section</a>.
                    </p>
                </div>
            </div>);
    }
}
