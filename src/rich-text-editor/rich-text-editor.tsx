/**
 * Rich Text Editor default sample
 */
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar, Table, Video, Audio } from '@syncfusion/ej2-react-richtexteditor';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SampleBase } from '../common/sample-base';
import './rich-text-editor.css';

export class Default extends SampleBase<{}, {}> {

  private rteObj: RichTextEditorComponent;

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section' id="rte">
          <div className='rte-control-section'>
            <RichTextEditorComponent id="defaultRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor }} >
            <h2>Welcome to the Rich Text Editor Demo!</h2><p>The Rich Text Editor control is a WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content. Users can format their content using standard toolbar commands.</p><h4>Flexible Editing!</h4><p>For a better editing experience, the Angular Rich Text Editor component offers a variety of tools and choices. So, you can quickly insert <strong>images</strong>, <strong>videos</strong>, <strong>hyperlinks</strong>, and <strong>tables</strong>; <strong>merge table cells</strong>; and configure.</p><p>You can easily format the text and paragraphs by setting the editor’s foreground and <strong>background colors</strong>, <strong>font type</strong>, <strong>italicization</strong>, <strong>adding ordered </strong>and <strong>unordered custom lists</strong>, <strong>underlining</strong>, <strong>strikethrough</strong>, and <strong>bolding</strong>.<br/><br/></p><p><img alt="Editor Features Overview" src="https://cdn.syncfusion.com/ej2/richtexteditor-resources/RTE-Overview.png" width="400" height="200" className="e-img-left"/></p>  
              <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar, Table, Video, Audio]} />
            </RichTextEditorComponent>
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the default rendering of the Rich Text Editor with minimum configuration.</p>
        </div>

        <div id="description">
          <p>The Rich Text Editor is WYSIWYG ("what you see is what you get") editor that is used to create and
            edit content, and return valid HTML markup. The editor provides a standard toolbar to format content using its commands.
            The toolbar contains commands to align the text,
              insert link, insert image, insert list, undo/redo the operation, HTML view, and more.</p>
        </div>
      </div>
    );
  }
}
