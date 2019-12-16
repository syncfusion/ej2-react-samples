import { ButtonComponent, CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { Count, HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import './api.css';
export class RTEApi extends SampleBase {
    constructor() {
        super(...arguments);
        this.Numericvalue = 1000;
        this.min = 555;
        this.max = 2000;
        this.format = 'n0';
        this.numericChange = (e) => {
            this.rteObj.maxLength = e.value;
        };
        this.readonlyChecked = false;
        this.readonlyChange = (args) => {
            this.rteObj.readonly = args.checked;
        };
        this.enableChecked = true;
        this.enableChange = (args) => {
            this.rteObj.enabled = args.checked;
        };
        this.htmlChecked = false;
        this.htmlChange = (args) => {
            this.rteObj.enableHtmlEncode = args.checked;
        };
        this.getValue = () => {
            alert(this.rteObj.value);
        };
        this.getSelection = () => {
            alert(this.rteObj.getSelection());
        };
        this.selectAll = () => {
            this.rteObj.selectAll();
        };
    }
    render() {
        return (<div className='control-pane'>
                <div className='col-lg-8'>
                    <div className='control-section' id="rteAPI">
                        <div className='rte-control-section'>
                            <RichTextEditorComponent id="API" ref={(richtexteditor) => { this.rteObj = richtexteditor; }} showCharCount={true} maxLength={1000}>
                                <p>RichTextEditor is a WYSIWYG editing control which will reduce the effort for users while trying to express their formatting word content as HTML or Markdown format.</p>
                                <p><b>API’s:</b></p>
                                <ul>
                                    <li>
                                        <p>maxLength - allows to restrict the maximum length to be entered.</p>
                                    </li>
                                    <li>
                                        <p>readOnly - allows to change it as non-editable state.</p>
                                    </li>
                                    <li>
                                        <p>enabled - enable or disable the RTE component.</p>
                                    </li>
                                    <li>
                                        <p>enableHtmlEncode - Get the encoded string value through value property and source code panel</p>
                                    </li>
                                    <li>
                                        <p>getValue - get the value of RTE.</p>
                                    </li>
                                    <li>
                                        <p>getSelection - get the selected text of RTE.</p>
                                    </li>
                                    <li>
                                        <p>selectAll - select all content in RTE.</p>
                                    </li>
                                </ul>
                                <Inject services={[Toolbar, Image, Link, HtmlEditor, Count, QuickToolbar]}/>
                            </RichTextEditorComponent>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 property-section' id="rteAPIProperty">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" style={{ width: '100%', margin: '10px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '8px', width: '50%' }}><div>Max Length </div></td>
                                    <td>
                                        <div style={{ paddingLeft: '10px' }}>
                                            <NumericTextBoxComponent id="maxlength" min={this.min} max={this.max} format={this.format} change={this.numericChange.bind(this)} value={this.Numericvalue}></NumericTextBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '8px', width: '50%' }}><div>Readonly</div></td>
                                    <td>
                                        <div style={{ paddingLeft: '10px' }}>
                                            <CheckBoxComponent id="readonly" checked={this.readonlyChecked} change={this.readonlyChange.bind(this)}></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '8px', width: '50%' }}><div>Enable</div></td>
                                    <td>
                                        <div style={{ paddingLeft: '10px' }}>
                                            <CheckBoxComponent id="enable" checked={this.enableChecked} change={this.enableChange.bind(this)}></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '8px', width: '50%' }}>
                                        <div>Enable HTML Encode </div>
                                    </td>
                                    <td>
                                        <div style={{ paddingLeft: '10px' }}>
                                            <CheckBoxComponent id="enablehtml" checked={this.htmlChecked} change={this.htmlChange.bind(this)}></CheckBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <div style={{ paddingTop: '10px' }}>
                                            <ButtonComponent id="getVal" ref={(btn) => { this.getVal = btn; }} onClick={this.getValue.bind(this)} className="btn btn-default">Get Value</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <div style={{ paddingTop: '10px' }}>
                                            <ButtonComponent id="selectHtml" ref={(btn) => { this.selectHtml = btn; }} onClick={this.getSelection.bind(this)} className="btn btn-default">Get Selection</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <div style={{ paddingTop: '10px' }}>
                                            <ButtonComponent id="selectall" ref={(btn) => { this.selectall = btn; }} onClick={this.selectAll.bind(this)} className="btn btn-default">Select All </ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>This sample demonstrate the usage of API in RichTextEditor, use the properties panel to change the maximum length, read
                only mode, disable status, to get value, enable HTML encode, select all content and get selected HTML from the RichTextEditor.</p>
                </div>

                <div id="description">
                    <p>In this demos, Ensuring the API'S behavious by doing</p>
                    <ul>
                        <li>Change the value of <code>maxLength</code> textbox to change maximum Length of character.</li>
                        <li>Click the <code>readOnly</code> check box to enable/disable editable and non-editable mode of the RTE.</li>
                        <li>Click the <code>enabled</code> check box to enable/disable the RTE component.</li>
                        <li>Click the <code>enableHtmlEncode</code> check box to enableHtmlEncode/disableHtmlEncode the RTE component.</li>
                        <li>Click the <code>getValue</code> button which shows the RTE values in the alert window.</li>
                        <li>Click the <code>getSelection</code> button which shows the selectedText in the alert window.</li>
                        <li>Click the <code>selectAll</code> button selecting all text content in the RTE.</li>
                    </ul>
                    <p><b>Injecting Module</b></p>
                    <p>RichTextEditor component features are segregated into individual feature-wise modules.
            To use richtexteditor feature, we need to inject <code>Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar</code> modules into the services.</p>
                </div>
            </div>);
    }
}
