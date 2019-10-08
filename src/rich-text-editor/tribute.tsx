/**
 * RichTextEditor tribute sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RichTextEditorComponent, HtmlEditor, Inject, Toolbar, QuickToolbar, Image, Link, IToolbarItems } from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';
import './tribute.css';
declare const Tribute: any;
export class TributeJs extends SampleBase<{}, {}> {

  private rteObj: RichTextEditorComponent;
  public onCreate(): void {
    let script: HTMLScriptElement = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/tributejs/3.7.3/tribute.min.js";
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
      var tribute = new Tribute({
        values: [
          { key: 'Phil Heartman', value: 'pheartman' },
          { key: 'Gordon Ramsey', value: 'gramsey' },
          { key: 'Jordan Humphreys', value: 'jhumphreys' },
          { key: 'Howard Johnson', value: 'hjohnson' }
        ]
      });
      tribute.attach(this.rteObj.inputElement);
    }
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section' id='rteImage'>
          <div className="content-wrapper">
            <RichTextEditorComponent id="defaultRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor }}  placeholder="Type @ to get the employee list with their email IDs." created={this.onCreate.bind(this)}>
              <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
            </RichTextEditorComponent>
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates how to integrate the third-party library `Tribute JS` (Mentions library) into the Rich Text Editor. Type @ to open autocomplete popup with employee list.</p>
        </div>

        <div id="description">
          <p>The Rich Text Editor allows you to integrate the third-party libraries such as Tribute JS or At JS for mentions. If you want to tag or address someone directly during a conversation, the mentions library will be helpful. Type @ to show autocomplete
        popup with a list of matching items based on the provided key-value pair.</p>
          <p>For example, type '@' in the above sample to show the employee list with their mail IDs in the autocomplete popup.</p>
        </div>
      </div>
    );
  }
}
