/**
 * Rich Text Editor Enter Key Configuration sample
 */
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { DropDownListComponent, FieldSettingsModel } from '@syncfusion/ej2-react-dropdowns';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SampleBase } from '../common/sample-base';

import { createElement } from '@syncfusion/ej2-base';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import './enter-key-configuration.css';

interface ITextValue {
    textAreaValue: string;
}

export class EnterKeyConfiguration extends SampleBase<{}, ITextValue> {
    constructor(props) {
        super(props);
        this.state = {
            textAreaValue: `<p>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</p><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>`
        };
    }
    
  private rteObj: RichTextEditorComponent;
  private rteValue: string = `<p>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</p><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>`;
  private enterList: DropDownListComponent;
  private shiftEnterList: DropDownListComponent;
  private popupHeight: string = '200px';
  private enterValue: string = "P";
  private shiftEnterValue: string = "BR";
  private enterPlaceholder: string = "When pressing the enter key";
  private shiftEnterPlaceholder: string = "When pressing the shift + enter key";
  private fields: FieldSettingsModel = { text: "text", value: "value" };
  private enterData: { [key: string]: Object }[] = [
      { text: 'Create a new <p>', value: 'P' },
      { text: 'Create a new <div>', value: 'DIV' },
      { text: 'Create a new <br>', value: 'BR' }
  ];
  private shiftEnterData: { [key: string]: Object }[] = [
      { text: 'Create a new <br>', value: 'BR' },
      { text: 'Create a new <div>', value: 'DIV' },
      { text: 'Create a new <p>', value: 'P' }
  ];

  private enterChange = (): void => {
      if (this.enterList.value === 'P') {
          this.rteObj.enterKey = 'P';
          this.rteObj.value = `<p>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</p><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>`;
      } else if (this.enterList.value === 'DIV') {
          this.rteObj.enterKey = 'DIV';
          this.rteObj.value = `<div>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</div><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>`;
      } else if (this.enterList.value === 'BR') {
          this.rteObj.enterKey = 'BR';
          this.rteObj.value = `In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:<ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>`;
      }
      this.onChange();
  }
  private shiftEnterChange = (): void => {
      if (this.shiftEnterList.value === 'BR') {
          this.rteObj.shiftEnterKey = 'BR';
      } else if (this.shiftEnterList.value === 'DIV') {
          this.rteObj.shiftEnterKey = 'DIV';
      } else if (this.shiftEnterList.value === 'P') {
          this.rteObj.shiftEnterKey = 'P';
      }
  }
  private onCreate = (): void => {
      this.onChange();
  }
  private onChange = (): void => {
    let id: string = this.rteObj.getID() + 'mirror-view';
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
    if (this.rteObj.value !== null) {
        CodeMirror(mirrorView, {
            value: this.rteObj.value,
            mode: 'text/html',
            lineWrapping: true,
            readOnly: true
        });
    }
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section enter-key' id="rte">
          <div className='rte-control-section'>
           <table className='api'>
                <tbody>
                    <tr>
                        <td>
                            <div>
                                <DropDownListComponent id="enterOption" dataSource={this.enterData} ref={(dropdownlist) => { this.enterList = dropdownlist }} fields={this.fields} change={this.enterChange.bind(this)} value={this.enterValue} popupHeight={this.popupHeight} placeholder={this.enterPlaceholder} floatLabelType="Always" />
                            </div>
                        </td>
                        <td>
                            <div>
                                <DropDownListComponent id="shiftEnterOption" dataSource={this.shiftEnterData} ref={(dropdownlist) => { this.shiftEnterList = dropdownlist }} fields={this.fields} change={this.shiftEnterChange.bind(this)} value={this.shiftEnterValue} popupHeight={this.popupHeight} placeholder={this.shiftEnterPlaceholder} floatLabelType="Always" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <RichTextEditorComponent id="defaultRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor }} change={this.onChange.bind(this)} created={this.onCreate.bind(this)}
                height={220} saveInterval={1} value={ this.rteValue }>
              <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
            </RichTextEditorComponent>
            <br/>
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
}
