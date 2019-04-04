/**
 * RichTextEditor Ajax content sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RichTextEditorComponent, HtmlEditor, Inject, Image, Link, Toolbar, QuickToolbar } from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';
import { Ajax } from '@syncfusion/ej2-base';
import './ajax-load.css';

export class AjaxContent extends SampleBase<{}, {}> {

    private rteObj: RichTextEditorComponent;
    public rendereComplete(): void {
        let ajax: Ajax = new Ajax('./src/rich-text-editor/ajax-content.html', 'GET', false);
        ajax.send().then(
            (result: any) => {
                this.rteObj.value = result;
                this.rteObj.dataBind();
            });
    }
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section' id="rteAjax">
          <div className="content-wrapper">
              <RichTextEditorComponent id="defaultRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor }}>
              <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
              </RichTextEditorComponent>
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates how to load content to the editor from an external source using <code>Ajax library</code>. </p>
        </div>
        <div id="description">
          <p>The rich text editor allows you to load content from an external source. The sample content is loaded from “Ajax_content.html” file using AJAX library, and when the event is <code>successful</code> the content is loaded into the editor using <code>value</code> property</p>
          <p><b>Injecting Module</b></p>
          <p>RichTextEditor component features are segregated into individual feature-wise modules. To use richtexteditor feature, we need to inject <code>Toolbar, Link, Image, HtmlEditor</code> modules into the services.</p>
        </div>
      </div>
    );
  }
}
