/**
 * Rich Text Editor Enter Key Configuration sample
 */
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { DropDownListComponent, FieldSettingsModel } from '@syncfusion/ej2-react-dropdowns';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { updateSampleSection } from '../common/sample-base';
import { createElement } from '@syncfusion/ej2-base';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import './enter-key-configuration.css';
interface ITextValue {
    textAreaValue: string;
}
function EnterKeyConfiguration() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let state = {
        textAreaValue: `<p>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</p><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>`
    };
    let rteObj: RichTextEditorComponent;
    let enterList: DropDownListComponent;
    let shiftEnterList: DropDownListComponent;
    const rteValue: string = `<p>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</p><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>`;
    const popupHeight: string = '200px';
    const enterValue: string = "P";
    const shiftEnterValue: string = "BR";
    const enterPlaceholder: string = "When pressing the enter key";
    const shiftEnterPlaceholder: string = "When pressing the shift + enter key";
    const fields: FieldSettingsModel = { text: "text", value: "value" };
    const enterData: { [key: string]: Object }[] = [
        { text: 'Create a new <p>', value: 'P' },
        { text: 'Create a new <div>', value: 'DIV' },
        { text: 'Create a new <br>', value: 'BR' }
    ];
    const shiftEnterData: { [key: string]: Object }[] = [
        { text: 'Create a new <br>', value: 'BR' },
        { text: 'Create a new <div>', value: 'DIV' },
        { text: 'Create a new <p>', value: 'P' }
    ];
    const enterChange = (): void => {
        if (enterList.value === 'P') {
            rteObj.enterKey = 'P';
            rteObj.value = `<p>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</p><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>`;
        } else if (enterList.value === 'DIV') {
            rteObj.enterKey = 'DIV';
            rteObj.value = `<div>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</div><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>`;
        } else if (enterList.value === 'BR') {
            rteObj.enterKey = 'BR';
            rteObj.value = `In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:<ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>`;
        }
        onChange();
    }
    const shiftEnterChange = (): void => {
        if (shiftEnterList.value === 'BR') {
            rteObj.shiftEnterKey = 'BR';
        } else if (shiftEnterList.value === 'DIV') {
            rteObj.shiftEnterKey = 'DIV';
        } else if (shiftEnterList.value === 'P') {
            rteObj.shiftEnterKey = 'P';
        }
    }
    const onCreate = (): void => {
        onChange();
    }
    const onChange = (): void => {
        let id: string = rteObj.getID() + 'mirror-view';
        let codeView: HTMLElement = document.getElementById('codeView');
        let mirrorView: HTMLElement;
        if (document.getElementById(id)) {
            mirrorView = document.getElementById(id);
            mirrorView.innerHTML = '';
        } else {
            mirrorView = createElement('div', { className: 'e-content codeViewContent' });
            mirrorView.id = id;
            codeView.appendChild(mirrorView);
        }
        mirrorView.style.display = 'block';
        if (rteObj.value !== null) {
            CodeMirror(mirrorView, {
                value: rteObj.value,
                mode: 'text/html',
                lineWrapping: true,
                readOnly: true
            });
        }
    }
    return (
        <div className='control-pane'>
            <div className='control-section enter-key' id="rte">
                <div className='rte-control-section'>
                    <table className='api'>
                        <tbody>
                            <tr>
                                <td>
                                    <div>
                                        <DropDownListComponent id="enterOption" dataSource={enterData} ref={(dropdownlist) => { enterList = dropdownlist }} fields={fields} change={enterChange.bind(this)} value={enterValue} popupHeight={popupHeight} placeholder={enterPlaceholder} floatLabelType="Always" />
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent id="shiftEnterOption" dataSource={shiftEnterData} ref={(dropdownlist) => { shiftEnterList = dropdownlist }} fields={fields} change={shiftEnterChange.bind(this)} value={shiftEnterValue} popupHeight={popupHeight} placeholder={shiftEnterPlaceholder} floatLabelType="Always" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <RichTextEditorComponent id="defaultRTE" ref={(richtexteditor) => { rteObj = richtexteditor }} change={onChange.bind(this)} created={onCreate.bind(this)}
                        height={220} saveInterval={1} value={rteValue}>
                        <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                    </RichTextEditorComponent>
                    <br />
                    <label>Code View </label>
                    <div id="codeView" className="codeView"></div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the API usage to customize the enter key and shift + enter key actions in the Rich Text Editor content. Code view represents the current rich text editor value when pressing typing any content or pressing enter key or shift + enter keys.</p>
            </div>

            <div id="description">
                <p>In this demo, ensure the API's behaviors by</p>
                <ul>
                    <li>Changing the value of <code>enterKey</code> dropdown to customize the enter key action when it is pressed.</li>
                    <li>Changing the value of <code>shiftEnterKey</code> dropdown to customize the shift + enter key action when it is pressed.</li>
                </ul>
            </div>
        </div>
    );
}
export default EnterKeyConfiguration;
