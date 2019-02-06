/**
 * RichTextEditor API sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { RichTextEditorComponent, Toolbar, Inject, Image, Link, HtmlEditor, Count, QuickToolbar } from '@syncfusion/ej2-react-richtexteditor';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { NumericTextBox, ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './api.css';

export class RTEApi extends SampleBase<{}, {}> {

    private rteObj: RichTextEditorComponent;
    public rendereComplete(): void {
        let maxLength: NumericTextBox = new NumericTextBox({
            value: 560,
            min: 555,
            max: 2000,
            format: 'n0',
            change: (e: ChangeEventArgs) => {
                this.rteObj.maxLength = maxLength.value;
            }
        });
        maxLength.appendTo('#maxlength');
        let readonly: CheckBox = new CheckBox({
            // set false for enable the checked state at initial rendering
            checked: false,
            // bind change event
            change: (args: ChangeEventArgs) => {
                this.rteObj.readonly = (args as any).checked;
            }
        });
        readonly.appendTo('#readonly');
        let enable: CheckBox = new CheckBox({
            // set false for enable the checked state at initial rendering
            checked: true,
            // bind change event
            change: (args: ChangeEventArgs) => {
                this.rteObj.enabled = (args as any).checked;
            }
        });
        enable.appendTo('#enable');
        let enablehtml: CheckBox = new CheckBox({
            // set false for enable the checked state at initial rendering
            checked: false,
            // bind change event
            change: (args: ChangeEventArgs) => {
                this.rteObj.enableHtmlEncode = (args as any).checked;
            }
        });
        enablehtml.appendTo('#enablehtml');
        document.getElementById('getVal').onclick = () => {
            alert(this.rteObj.value);
        };
        document.getElementById('selectHtml').onclick = () => {
            alert(this.rteObj.getSelection());
        };
        document.getElementById('selectall').onclick = () => {
            this.rteObj.selectAll();
        };
    }

    // set the value to RichTextEditor
    private template: string = `<p>RichTextEditor is a WYSIWYG editing control which will reduce the effort for users while trying to express their formatting word content as HTML or Markdown format.</p>
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
    </ul>`;

    render() {
    return (
        <div className='control-pane'>
            <div className='col-lg-8'>
                <div className='control-section' id="rteAPI">
                <div className='rte-control-section'>
                    <RichTextEditorComponent id="defaultAPI" ref={(richtexteditor) => { this.rteObj = richtexteditor }}
                        valueTemplate={this.template} showCharCount={true} maxLength={1000}>
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
                                <input id="maxlength" type="text" className="form-control" value="1000"/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '8px', width: '50%' }}><div>Readonly</div></td>
                        <td>
                            <div style={{ paddingLeft: '10px' }}>
                                <input type="checkbox" id="readonly" checked={false}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '8px', width: '50%' }}><div>Enable</div></td>
                        <td>
                            <div style={{ paddingLeft: '10px' }}>
                                <input type="checkbox" id="enable" checked={true}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '8px', width: '50%' }}>
                            <div>Enable HTML Encode </div>
                        </td>
                        <td>
                            <div style={{ paddingLeft: '10px' }}>
                                <input type="checkbox" id="enablehtml" checked={false}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <div style={{ paddingTop: '10px' }}>
                                <ButtonComponent id="getVal" className="btn btn-default">Get Value</ButtonComponent>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <div style={{ paddingTop: '10px' }}>
                                <ButtonComponent id="selectHtml" className="btn btn-default">Get Selection</ButtonComponent>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <div style={{ paddingTop: '10px' }}>
                                <ButtonComponent id="selectall" className="btn btn-default">Select All </ButtonComponent>
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
            <p>RichTextEditor component features are segregated into individual feature-wise modules. To use richtexteditor feature, we need to inject <code>Toolbar, Link, Image, Count, HtmlEditor</code> modules into the services.</p>
        </div>
        </div>
    );
  }
}
