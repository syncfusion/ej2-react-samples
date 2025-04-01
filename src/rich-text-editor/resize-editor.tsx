/**
 * Rich Text Editor Resizable sample
 */
import { HtmlEditor, Image, Inject, Link, QuickToolbar, Resize, RichTextEditorComponent, Toolbar, PasteCleanup, Table, Video, Audio } from '@syncfusion/ej2-react-richtexteditor';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SampleBase } from '../common/sample-base';
import './resize-editor.css';

export class ResizableEditor extends SampleBase<{}, {}> {

  private resize: boolean = true;

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section resize-rte' id="rte">
          <div className='rte-control-section'>
            <RichTextEditorComponent id="resizeRTE" enableResize={this.resize} height='250px'>
            <h2>The Greatest Lessons from Nature</h2><p>Nature is a powerful teacher, offering timeless wisdom through its beauty, resilience, and harmony. Here are three of the most important lessons we can learn from nature:</p><p><strong>Adaptability &amp; Resilience</strong> 🌿<br/></p><p>Nature is constantly changing and evolving. Trees withstand storms, rivers carve through rocks, and animals adapt to new environments. Similarly, life challenges us, and, like nature, we must be flexible and resilient in order to overcome obstacles.</p><p><strong>Patience &amp; Growth</strong> 🌱</p><p>A seed does not become a tree overnight. Growth takes time, whether in nature or in our personal and professional lives. Success, wisdom, and strength develop through persistence, effort, and patience.</p><p><strong>Balance &amp; Harmony</strong> 🌎</p><p>Nature maintains a delicate balance throughout the day and night, across the seasons, and within ecosystems. It teaches us the importance of balance in our own lives between work and rest, giving and receiving, and action and reflection.</p><p><br/></p><p style={{textAlign: 'center'}}><em>“Look deep into nature, and then you will understand everything better.” <strong>– Albert Einstein</strong></em></p>
              <Inject services={[HtmlEditor, Toolbar, Image, Link, Resize, QuickToolbar, PasteCleanup, Table, Video, Audio]} />
            </RichTextEditorComponent>
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the resize operation of the Rich Text Editor control. To resize the Rich Text Editor, select and resize the editor using its handle (grip) at the bottom right corner of the content panel.</p>
        </div>

        <div id="description">
          <p>Users can create resizable Rich Text Editor by setting the <code>enableResize</code> property to true, which is used to change the size of the Rich Text Editor dynamically.</p>
        </div>
      </div>
    );
  }
}
