/**
 * Rich Text Editor API sample
 */
import { ChangeEventArgs as checked } from '@syncfusion/ej2-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { ButtonComponent, CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { Count, HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PropertyPane } from '../common/property-pane';
import { updateSampleSection } from '../common/sample-base';
import './api.css';
function RTEApi() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let rteObj: RichTextEditorComponent;
    let getVal: ButtonComponent;
    let selectHtml: ButtonComponent;
    let selectall: ButtonComponent;
    const Numericvalue: number = 1000;
    const min: number = 555;
    const max: number = 2000;
    const format: string = 'n0';
    const numericChange = (e: ChangeEventArgs): void => {
        rteObj.maxLength = e.value;
    }
    const readonlyChecked: boolean = false;
    const readonlyChange = (args: checked): void => {
        rteObj.readonly = args.checked;
    }
    const enableChecked: boolean = true;
    const enableChange = (args: checked): void => {
        rteObj.enabled = args.checked;
    }
    const htmlChecked: boolean = false;
    const htmlChange = (args: checked): void => {
        rteObj.enableHtmlEncode = args.checked;
    }
    const getValue = (): void => {
        alert(rteObj.value);
    }
    const getSelection = (): void => {
        alert(rteObj.getSelection());
    }
    const selectAll = (): void => {
        rteObj.selectAll();
    }
    return (
        <div className='control-pane'>
            <div className='col-lg-8'>
                <div className='control-section' id="rteAPI">
                    <div className='rte-control-section'>
                        <RichTextEditorComponent id="API" ref={(richtexteditor) => { rteObj = richtexteditor }}
                            showCharCount={true} maxLength={1000}>
                            <p>Rich Text Editor is a WYSIWYG editing control which will reduce the effort for users while trying to express their formatting word content as HTML or Markdown format.</p>
                            <p><b>API’s:</b></p>
                            <ul>
                                <li>
                                    <p>maxLength - allows restricting the maximum length to be entered.</p>
                                </li>
                                <li>
                                    <p>readOnly - allows to change it as a non-editable state.</p>
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
                            <Inject services={[Toolbar, Image, Link, HtmlEditor, Count, QuickToolbar]} />
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
                                        <NumericTextBoxComponent id="maxlength" min={min} max={max} format={format} change={numericChange.bind(this)} value={Numericvalue} ></NumericTextBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px', width: '50%' }}><div>Readonly</div></td>
                                <td>
                                    <div style={{ paddingLeft: '10px' }}>
                                        <CheckBoxComponent id="readonly" checked={readonlyChecked} change={readonlyChange.bind(this)} ></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px', width: '50%' }}><div>Enable</div></td>
                                <td>
                                    <div style={{ paddingLeft: '10px' }}>
                                        <CheckBoxComponent id="enable" checked={enableChecked} change={enableChange.bind(this)} ></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px', width: '50%' }}>
                                    <div>Enable HTML Encode </div>
                                </td>
                                <td>
                                    <div style={{ paddingLeft: '10px' }}>
                                        <CheckBoxComponent id="enablehtml" checked={htmlChecked} change={htmlChange.bind(this)} ></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <div style={{ paddingTop: '10px' }}>
                                        <ButtonComponent id="getVal" ref={(btn) => { getVal = btn }} onClick={getValue.bind(this)} className="btn btn-default">Get Value</ButtonComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <div style={{ paddingTop: '10px' }}>
                                        <ButtonComponent id="selectHtml" ref={(btn) => { selectHtml = btn }} onClick={getSelection.bind(this)} className="btn btn-default">Get Selection</ButtonComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <div style={{ paddingTop: '10px' }}>
                                        <ButtonComponent id="selectall" ref={(btn) => { selectall = btn }} onClick={selectAll.bind(this)} className="btn btn-default">Select All </ButtonComponent>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>This sample demonstrate the usage of API in Rich Text Editor, use the properties panel to change maximum length, read
                    only mode, disable status, to get value, enable HTML encode, select all content and get selected HTML from the Rich Text Editor.</p>
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
                <p>Rich Text Editor component features are segregated into individual feature-wise modules.
                    To use Rich Text Editor feature, we need to inject <code>Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar</code> modules into the services.</p>
            </div>
        </div>
    );
}
export default RTEApi;
