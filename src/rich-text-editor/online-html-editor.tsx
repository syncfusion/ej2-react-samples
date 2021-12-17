/**
 * Rich Text Editor overview sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PaneDirective, PanesDirective, SplitterComponent } from '@syncfusion/ej2-react-layouts';
import { RichTextEditorComponent, Toolbar, Inject, Image, Link, HtmlEditor } from '@syncfusion/ej2-react-richtexteditor';
import { QuickToolbar, Table, ToolbarSettingsModel, ToolbarType, Count } from '@syncfusion/ej2-react-richtexteditor';
import { createElement } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import './online-html-editor.css';

export class OnlineHtmlEditor extends SampleBase<{}, {}> {

  private rteObj: RichTextEditorComponent;

  // Rich Text Editor items list
  private items: string[] = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
    'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
    'LowerCase', 'UpperCase', '|',
    'Formats', 'Alignments', 'NumberFormatList', 'BulletFormatList',
    'Outdent', 'Indent', 'SuperScript', 'SubScript', '|',
    'CreateTable', 'CreateLink', 'Image', 'FileManager', '|', 'ClearFormat', 'Print',
    'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'
  ];

  //Rich Text Editor ToolbarSettings
  private toolbarSettings: ToolbarSettingsModel = {
    items: this.items,
    type: ToolbarType.MultiRow
  };

  private myCodeMirror;
  private srcArea: HTMLTextAreaElement;
  private textArea: HTMLTextAreaElement;

  constructor(props) {
    super(props);
    this.myCodeMirror = null;
    this.srcArea = undefined;
    this.textArea = undefined
  }

  private initialize(): void {
    // Add the styles and script referrence for code-mirror.
    let link: any = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/codemirror.min.css');
    document.head.appendChild(link);

    let elem1: any = document.createElement('script');
    elem1.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/codemirror.js';
    elem1.type = 'text/javascript';
    document.head.appendChild(elem1);

    let elem2: any = document.createElement('script');
    elem2.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/mode/xml/xml.js';
    elem2.type = 'text/javascript';
    document.head.appendChild(elem2);
    
    let url: string = location.href.replace(location.search, '');
    let anchorEle: Element = document.querySelector('#newTab');
    if (anchorEle) {
      anchorEle.setAttribute('href', url.split('#')[0] + 'rich-text-editor/online-html-editor/index.html');
    }
  }

  private onCreate(): void {
    this.initialize();
    setTimeout(() => {
        this.updateValue();
        this.textArea = this.rteObj.contentModule.getEditPanel() as HTMLTextAreaElement;
        this.srcArea = document.querySelector('.source-code');
        if (this.srcArea) {
            this.srcArea.addEventListener('keyup', this.updateHtmlValue.bind(this));
        }
    }, 500);
  }

  private updateHtmlValue(): void {
    this.textArea.innerHTML = this.myCodeMirror.getValue();
  }

  private onChange(): void {
    this.updateValue();
  }

  private updateValue(): void {
    let mirrorView: HTMLElement = document.querySelector('#src-view');
    if (!mirrorView) {
      mirrorView = createElement('div', {
        className: 'e-content'
      });
      mirrorView.id = 'src-view';
      let srcCodeElement: HTMLElement = document.querySelector('.source-code');
      if (srcCodeElement) {
        srcCodeElement.appendChild(mirrorView);
      }
      mirrorView.innerHTML = '';
      mirrorView.style.display = 'block';
    }
    let srcViewEle: HTMLElement = document.querySelector('#src-view');
    let codemirrorEle: HTMLElement = document.querySelector('.CodeMirror-wrap');
    if (codemirrorEle) {
      codemirrorEle.remove();
    }
    this.renderCodeMirror(srcViewEle, this.rteObj.value);
  }

  public renderCodeMirror(mirrorView: HTMLElement, content: string): void {
    if (content) {
      this.myCodeMirror = CodeMirror(mirrorView, {
        value: content,
        lineNumbers: true,
        mode: 'text/html',
        lineWrapping: true,
      });
    }
  }

  private content1(): JSX.Element {
    return (
      <div className="content">
        <RichTextEditorComponent id='defaultRTE' ref={(richtexteditor) => { this.rteObj = richtexteditor }}
          toolbarSettings={this.toolbarSettings} height='447px' saveInterval={1} showCharCount={true} maxLength={5000}
          created={this.onCreate.bind(this)} change={this.onChange.bind(this)} actionComplete={this.updateValue.bind(this)}>
            <p>The Rich Text Editor is a WYSIWYG (what you see is what you get) editor used to create and edit
              the content and return the valid HTML markup or markdown of the content.
              This provides a lot of commands to edit and format the content. </p>
            <p><b>Toolbar</b></p>
            <p>The editor’s toolbar provides various commands to align the text, format, insert a link, image,
              list, undo/redo operations, HTML view, and more. The toolbar comes with different modes such as
              floating, multi-row, and expanded. </p>
            <p><b>Links</b></p>
            <p>Create a hyperlink using the 'insert link' dialog and you can edit the hyperlink text, display text,
              and tooltip using the 'edit link' dialog and quick toolbar. If the text has valid hyperlink text,
              the editor converts it to hyperlink automatically. For example, link to Rich Text Editor.</p>
            <p><b>Table</b></p>
            <p>This editor allows you to insert a table with options to add, edit, and remove and perform other
              table-related actions. </p>
            <p>For example</p>
            <table>
              <tbody>
                <tr>
                  <th>Employee name</th>
                  <th>Role</th>
                  <th>Mail</th>
                  <th>Country</th>
                </tr>
                <tr>
                  <td>Janet Fleet</td>
                  <td>Manager</td>
                  <td>janet95@arpy.com</td>
                  <td>France</td>
                </tr>
                <tr>
                  <td>Nancy Buchanan</td>
                  <td>Project Lead</td>
                  <td>nancy55@rpy.com</td>
                  <td>Sweden</td>
                </tr>
                <tr>
                  <td>Rose Rose</td>
                  <td>Project Lead</td>
                  <td>rose44@sample.com</td>
                  <td>France</td>
                </tr>
              </tbody>
            </table>
            <p><b>Image</b></p>
            <p>Allows you to insert images with caption, alt text, link, resize, and drag-and-drop from an
              online source and local computer. You can upload an image to the server and insert it into the editor.
              It provides an option to customize a quick toolbar for an image.</p>
            <p>For example</p>
            <img id='rteImageID' alt="Logo"
              src="https://ej2.syncfusion.com/react/demos/src/rich-text-editor/images/RTEImage-Feather.png" />
            <p><b>Lists</b></p>
            <p>You can include content with ordered and unordered lists.</p>
            <p>Examples for an ordered list:</p>
            <ul>
              <li>TypeScript</li>
              <li>Javascript</li>
              <li>Angular</li>
              <li>React</li>
              <li>Vue</li>
            </ul>
            <p>Examples for an unordered list:</p>
            <ol>
              <li>Rich Text Editor</li>
              <li>Toolbar</li>
              <li>Button</li>
              <li>Dialog</li>
              <li>Data Grid</li>
            </ol>
            <p>The editor has a lot of features to edit HTML content and Markdown content in web applications.</p>
          <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table, Count]} />
        </RichTextEditorComponent>
      </div>
    );
  };

  private content2(): JSX.Element {
    return (
      <div className="content">
        <div className="splitter-default-content source-code pane2" contentEditable={true}></div>
      </div>
    );
  };

  render() {
    return (
      <div className="control-pane">
        <div className='control-section onlineEditor'>
          <div className='rte-online-button-content'>
            <div className="center"> Click/Touch the button to view the sample </div>
            <div className="center">
              <a className="e-btn" id="newTab" target="_blank">Open in new tab</a>
            </div>
          </div>

          <div id="rte-online-sample-view">
            <h3 className="title-head">Rich Text Editor Online Html Editor</h3>
            <div className="heading">
              <h6 className="title"><b>PREVIEW</b> </h6>
            </div>
            <div className="heading right">
              <h6 className="title"><b>HTML SOURCE CODE </b></h6>
            </div>
            <SplitterComponent height='450px' width='100%'>
              <PanesDirective>
                <PaneDirective resizable={false} size='50%' cssClass='pane1' content={this.content1.bind(this)}></PaneDirective>
                <PaneDirective cssClass='pane2' content={this.content2.bind(this)}></PaneDirective>
              </PanesDirective>
            </SplitterComponent>
          </div>
        </div>
        <div id="action-description">
              <p>This sample demonstrates an HTML content LIVE editing scenario using React Rich Text Editor. Click the <code>Open in new tab</code> button and you can edit the content in Rich Text Editor and also in the source code view.</p>
          </div>

          <div id="description">
              <p>This sample Rich Text Editor enabled most of the features to edit the content quickly such as insert image, table, etc... The source code view is formatted using the <code>Code-mirror</code> plugin.</p>
          </div>
      </div>
    );
  }
}
