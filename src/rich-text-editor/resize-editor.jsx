/**
 * RichTextEditor Resizable sample
 */
import { HtmlEditor, Image, Inject, Link, QuickToolbar, Resize, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import './resize-editor.css';
export class ResizableEditor extends SampleBase {
    constructor() {
        super(...arguments);
        this.resize = true;
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section' id="rte">
          <div className='rte-control-section'>
            <RichTextEditorComponent id="resizeRTE" enableResize={this.resize} height='250px'>
              <p>The rich text editor component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content.
  Users can format their content using standard toolbar commands.</p>
              <Inject services={[HtmlEditor, Toolbar, Image, Link, Resize, QuickToolbar]}/>
            </RichTextEditorComponent>
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the resize operation of the rich text editor control. To resize the rich text editor, select and resize the editor using its handle (grip) at the bottom right corner of the content panel.</p>
        </div>

        <div id="description">
          <p>Users can create resizable rich text editor by setting the <code>enableResize</code> property to true, which is used to change the size of the rich text editor dynamically.</p>
        </div>
      </div>);
    }
}
