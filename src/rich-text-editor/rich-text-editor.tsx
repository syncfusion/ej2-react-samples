/**
 * RichTextEditor default sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RichTextEditorComponent, HtmlEditor, Inject, Toolbar, Image, Link, QuickToolbar } from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';
import './rich-text-editor.css';

export class Default extends SampleBase<{}, {}> {

  private rteObj: RichTextEditorComponent;

  // set the value to RichTextEditor
  private template: string = `<p>The rich text editor component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content. 
  Users can format their content using standard toolbar commands.</p>
                    
  <p><b>Key features:</b></p>
                    
  <ul>
      <li>
          <p>Provides &lt;IFRAME&gt; and &lt;DIV&gt; modes</p>
      </li>
      <li>
          <p>Capable of handling markdown editing.</p>
      </li>
      <li>
          <p>Contains a modular library to load the necessary functionality on demand.</p>
      </li>
      <li>
          <p>Provides a fully customizable toolbar.</p>
      </li>
      <li>
          <p>Provides HTML view to edit the source directly for developers.</p>
      </li>
      <li>
          <p>Supports third-party library integration.</p>
      </li>
      <li>
          <p>Allows preview of modified content before saving it.</p>
      </li>
      <li>
          <p>Handles images, hyperlinks, video, hyperlinks, uploads, etc.</p>
      </li>
      <li>
          <p>Contains undo/redo manager.</p>
      </li>
      <li>
          <p>Creates bulleted and numbered lists.</p>
      </li>
  </ul>`;


  render() {
    return (
      <div className='control-pane'>
          <div className='control-section' id="rte">
            <div className='rte-control-section'>
              <RichTextEditorComponent id="defaultRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor }} valueTemplate={this.template}  >
              <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
              </RichTextEditorComponent>
            </div>
          </div>
          <div id="action-description">
            <p>This sample demonstrates the default rendering of the rich text editor with minimum configuration.</p>
          </div>

          <div id="description">
            <p>The rich text editor is WYSIWYG ("what you see is what you get") editor that is used to create and 
              edit content, and return valid HTML markup. The editor provides a standard toolbar to format content using its commands. 
              The toolbar contains commands to align the text, 
              insert link, insert image, insert list, undo/redo the operation, HTML view, and more.</p>
          </div>
      </div>
    );
  }
}
