/**
 * Rich Text Editor overview sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PaneDirective, PanesDirective, SplitterComponent } from '@syncfusion/ej2-react-layouts';
import { RichTextEditorComponent, Toolbar, Inject, Image, Link, HtmlEditor } from '@syncfusion/ej2-react-richtexteditor';
import { QuickToolbar, Table, ToolbarSettingsModel, ToolbarType, Count, PasteCleanup, EmojiPicker, Audio ,Video, FormatPainter } from '@syncfusion/ej2-react-richtexteditor';
import { createElement, KeyboardEventArgs, Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import './online-html-editor.css';

export class OnlineHtmlEditor extends SampleBase<{}, {}> {

  private rteObj: RichTextEditorComponent;
  private splitterInstance;
  // Rich Text Editor items list
  private items: string[] = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
    'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
    'Formats', 'Alignments', 'Blockquote', 'OrderedList', 'UnorderedList',
    'Outdent', 'Indent',
    'CreateLink', 'Image', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
    '|', 'EmojiPicker', 'SourceCode', '|', 'Undo', 'Redo'
  ];

  //Rich Text Editor ToolbarSettings
  private toolbarSettings: ToolbarSettingsModel = {
    items: this.items,
    type: ToolbarType.Expand,
    enableFloating: false
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
  private onCreate(): void {
    this.updateValue();
    this.textArea = this.rteObj.contentModule.getEditPanel() as HTMLTextAreaElement;
    this.srcArea = document.querySelector('.source-code');
    if (this.srcArea) {
        this.srcArea.addEventListener('keyup', (e: KeyboardEventArgs) => {
            this.updateHtmlValue();
        });
    }
  }

  private updateHtmlValue(): void {
    this.rteObj.value = this.myCodeMirror.getValue();
    this.rteObj.dataBind();
  }

  private onChange(): void {
    this.updateValue();
  }
  private onResizing(): void {
    this.rteObj.refreshUI();
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
    if(this.rteObj.value){
    this.renderCodeMirror(srcViewEle, this.rteObj.value);
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
  public updateOrientation() { 
    if (Browser.isDevice) {
        this.splitterInstance.orientation = 'Vertical';
        (document.body.querySelector('.heading') as any).style.width = 'auto';
    }
  }
  private content1(): JSX.Element {
    return (
      <div className="content">
        <RichTextEditorComponent id='defaultRTE' ref={(richtexteditor) => { this.rteObj = richtexteditor }}
          toolbarSettings={this.toolbarSettings} height='447px' saveInterval={1} showCharCount={true} maxLength={5000}
          created={this.onCreate.bind(this)} change={this.onChange.bind(this)} actionComplete={this.updateValue.bind(this)}>
            <h3>Welcome to the HTML real-time live editor!</h3>
            <p>Create and edit the valid HTML code simply! You don't worry about the HTML syntax to format your text content. The WYSIWYG editor (left side view) provided the toolbar to make format text and insert images, tables, and more options.</p>
            <h4>Don't worry about syntax</h4>
            <p>The content editing works bi-directional, you can write the HTML code on the right-side view (code view), and changes will reflect in the WYSIWYG editor.</p>
          <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table, Count, PasteCleanup, EmojiPicker, Audio ,Video, FormatPainter]} />
        </RichTextEditorComponent>
      </div>
    );
  };

  private content2(): JSX.Element {
    return (
      <div className="heading right">
        <h6 className="title"><b>HTML SOURCE</b></h6>
        <div className="splitter-default-content source-code pane2" contentEditable={true}></div>
      </div>
    );
  };

  render() {
    return (
      <div className="control-pane">
        <div className='control-section onlineEditor'>
          <div id="rte-online-sample-view">
            <SplitterComponent id='splitter-rte-online-html-editor' ref={splitter => (this.splitterInstance = splitter)} height='450px' width='100%' resizing={this.onResizing.bind(this)} created={this.updateOrientation.bind(this)}>
              <PanesDirective>
                <PaneDirective resizable={true} size='50%' min="40%" cssClass='pane1' content={this.content1.bind(this)} ></PaneDirective>
                <PaneDirective min="40%" cssClass='pane2' content={this.content2.bind(this)}></PaneDirective>
              </PanesDirective>
            </SplitterComponent>
          </div>
        </div>
        <div id="action-description">
            <p>The online HTML editor sample demonstrates how to create LIVE editing scenario with real-world applications
            using JavaScript Rich Text Editor. Most of the control features are enabled in this sample to edit the
            content quickly.</p>
            <p>You can edit the source code and content also parallelly. The source code is formatted using the code mirror
            library.</p>
          </div>

          <div id="description">
            <p>This sample explains how to create a live HTML editor application using Rich Text Editor.</p>
          </div>
      </div>
    );
  }
}
