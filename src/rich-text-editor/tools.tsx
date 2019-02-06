/**
 * RichTextEditor overview sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { RichTextEditorComponent, Toolbar, Inject, Image, Link, HtmlEditor, Count, QuickToolbar, Table} from '@syncfusion/ej2-react-richtexteditor';
import { createElement } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import * as CodeMirror from 'codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import './tools.css';

export class Overview extends SampleBase<{}, {}> {

  private rteObj: RichTextEditorComponent;

  // set the value to RichTextEditor
  private template: string = `<p>The rich text editor is WYSIWYG ("what you see is what you get") editor useful to create and edit content, and return the valid <a href='https://ej2.syncfusion.com/home/' target='_blank'>HTML markup</a> or <a href='https://ej2.syncfusion.com/home/' target='_blank'>markdown</a> of the content</p> <p><b>Toolbar</b></p><ol><li> <p>Toolbar contains commands to align the text, insert link, insert image, insert list, undo/redo operations, HTML view, etc</p></li><li><p>Toolbar is fully customizable </p></li></ol> <p><b>Links</b></p><ol><li><p>You can insert a hyperlink with its corresponding dialog </p></li><li><p>Attach a hyperlink to the displayed text. </p></li><li><p>Customize the quick toolbar based on the hyperlink </p> </li></ol><p><b>Image.</b></p><ol><li><p>Allows you to insert images from an online source as well as the local computer </p> </li><li><p>You can upload an image</p></li><li><p>Provides an option to customize quick toolbar for an image</p></li></ol><img alt="Logo" src="./src/rich-text-editor/images/RTEImage-Feather.png" style="width: 300px;"/>`;

 // RichTextEditor items list
  private items: string[] = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
  'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
  'LowerCase', 'UpperCase', '|',
  'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
  'Outdent', 'Indent', '|',
  'CreateTable', 'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
  'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'];

  //RichTextEditor ToolbarSettings
  private toolbarSettings: object = {
      items: this.items
  };

  private textArea: HTMLTextAreaElement;
  private myCodeMirror: any;

  public mirrorConversion(e?: any): void {
    this.textArea = this.rteObj.contentModule.getEditPanel() as HTMLTextAreaElement;
    let id: string = (this.rteObj as any).getID() + 'mirror-view';
    let mirrorView: HTMLElement = this.rteObj.element.querySelector('#' + id) as HTMLElement;
    let charCount: HTMLElement = this.rteObj.element.querySelector('.e-rte-character-count') as HTMLElement;
    if (e.targetItem === 'Preview') {
        this.textArea.style.display = 'block';
        mirrorView.style.display = 'none';
        this.textArea.innerHTML = this.myCodeMirror.getValue();
        charCount.style.display = 'block';
    } else {
        if (!mirrorView) {
            mirrorView = createElement('div', { className: 'e-content' });
            mirrorView.id = id;
            this.textArea.parentNode.appendChild(mirrorView);
        } else {
            mirrorView.innerHTML = '';
        }
        this.textArea.style.display = 'none';
        mirrorView.style.display = 'block';
        this.renderCodeMirror(mirrorView, (this.rteObj as any).value);
        charCount.style.display = 'none';
    }
  }

  public renderCodeMirror(mirrorView: HTMLElement, content: string): void {
    this.myCodeMirror = CodeMirror(mirrorView, {
        value: content,
        lineNumbers: true,
        mode: 'text/html',
        lineWrapping: true,

    });
  }

  public handleFullScreen(e: any): void {
    let leftBar: HTMLElement;
    let transformElement: HTMLElement;
    if (Browser.isDevice) {
        leftBar = document.querySelector('#right-sidebar');
        transformElement = document.querySelector('.sample-browser.e-view.e-content-animation');
    } else {
        leftBar = document.querySelector('#left-sidebar');
        transformElement = document.querySelector('#right-pane');
    }
    if (e.targetItem === 'Maximize') {
        addClass([leftBar], ['e-close']);
        removeClass([leftBar], ['e-open']);
        if (!Browser.isDevice) { transformElement.style.marginLeft = '0px'; }
        transformElement.style.transform = 'inherit';
    } else if (e.targetItem === 'Minimize') {
        removeClass([leftBar], ['e-close']);
        if (!Browser.isDevice) { 
        addClass([leftBar], ['e-open']);
        transformElement.style.marginLeft = leftBar.offsetWidth + 'px'; }
        transformElement.style.transform = 'translateX(0px)';
    }
  }

  public actionCompleteHandler(e: any): void {
    if (e.targetItem && (e.targetItem === 'SourceCode' || e.targetItem === 'Preview')) {
        (this.rteObj.sourceCodeModule.getPanel() as HTMLTextAreaElement).style.display = 'none';
        this.mirrorConversion(e);
    } else {
        setTimeout(() => { (this.rteObj as any).toolbarModule.refreshToolbarOverflow(); }, 400);
    }
  }

  render() {
    return (
      <div className='control-pane'>
          <div className='control-section' id="rteTools">
            <div className='rte-control-section'>
                <RichTextEditorComponent id="defaultRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor }}
                    valueTemplate={this.template} showCharCount={true} actionBegin={this.handleFullScreen.bind(this)}
                    actionComplete={this.actionCompleteHandler.bind(this)} maxLength={2000} toolbarSettings={ this.toolbarSettings}>
                    <Inject services={[Toolbar, Image, Link, HtmlEditor, Count, QuickToolbar, Table]} />
                    </RichTextEditorComponent>
            </div>
          </div>
          <div id="action-description">
            <p>This sample demonstrates the full features of rich text editor that includes all the tools and functionalities.</p>
          </div>

          <div id="description">
            <p>This sample used <code>Code mirror</code> plugins helps to highlight the HTML content and when changes happens in code view, the same has been reflected in preview mode. </p>
            <p>The editor’s toolbar contains commands to format the content. The toolbar consists of:</p>
            <ul>
                <li><code>Lists</code> - Ordered and unordered list types.</li>
                <li><code>Links</code> - A hyperlink can be inserted into the editor for quick access to related information.</li>
                <li><code>Image</code> - Inserts and manages images.</li>
                <li><code>Table</code> - Inserts and manages Tables.</li>
                <li><code>Alignment</code> - Aligns the content with left, center, and right margins.</li>
                <li><code>Undo/Redo</code> - Allows undo/redo operations.</li>
                <li><code>Indent/ Outdent</code> - Increases/decreases the indent level of the content.</li>
                <li><code>Font</code> - Able to do styling on text like font family, size, fore color and background color.</li>
                <li><code>Lower / Upper case</code> – Changes the casing of the selected text.</li>
                <li><code>SubScript / SuperScript</code> - Makes the selected text as subscript (lower)/superscript(upper).</li>
                <li><code>FullScreen</code> - Stretches the editor to the maximum width and height of the browser window.</li>
                <li><code>Format</code> – Formats the sentence in different ways such as heading level, quotation, and code snippet</li>
                <li><code>Styles</code> – Allows you to apply inline styles to the selected content like bold, italic, and more.</li>
            </ul>
            <p><b>Injecting Module</b></p>
            <p>RichTextEditor component features are segregated into individual feature-wise modules. To use richtexteditor feature, we need to inject <code>Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar</code> modules into the services.</p>
          </div>
      </div>
    );
  }
}
