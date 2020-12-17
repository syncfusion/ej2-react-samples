/**
 * Rich Text Editor Iframe sample
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RichTextEditorComponent, Toolbar, Inject, Image, Table, Link, HtmlEditor, QuickToolbar, IFrameSettingsModel } from '@syncfusion/ej2-react-richtexteditor';
import { ToolbarSettingsModel, FileManager, FileManagerSettingsModel } from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import './iframe.css';

export class IFrame extends SampleBase<{}, {}> {

  private rteObj: RichTextEditorComponent;

  private hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';

  private iframeSetting: IFrameSettingsModel = {
    enable: true
  };

  // Rich Text Editor items list
  private items: string[] = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
    'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
    'LowerCase', 'UpperCase', 'SuperScript', 'SubScript', '|',
    'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
    'Outdent', 'Indent', '|',
    'CreateTable', 'CreateLink', 'Image', 'FileManager', '|', 'ClearFormat', 'Print',
    'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'
  ];

  private fileManagerSettings: FileManagerSettingsModel = {
    enable: true,
    path: '/Pictures/Food',
    ajaxSettings: {
      url: this.hostUrl + 'api/FileManager/FileOperations',
      getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
      uploadUrl: this.hostUrl + 'api/FileManager/Upload',
      downloadUrl: this.hostUrl + 'api/FileManager/Download'
    }
  }

  //Rich Text Editor ToolbarSettings
  private toolbarSettings: ToolbarSettingsModel = {
    items: this.items
  };
  public handleFullScreen(e: any): void {
    let sbCntEle: HTMLElement = document.querySelector('.sb-content.e-view');
    let sbHdrEle: HTMLElement = document.querySelector('.sb-header.e-view');
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
      if (Browser.isDevice && Browser.isIos) {
        addClass([sbCntEle, sbHdrEle], ['hide-header']);
      }
      addClass([leftBar], ['e-close']);
      removeClass([leftBar], ['e-open']);
      if (!Browser.isDevice) { transformElement.style.marginLeft = '0px'; }
      transformElement.style.transform = 'inherit';
    } else if (e.targetItem === 'Minimize') {
      if (Browser.isDevice && Browser.isIos) {
        removeClass([sbCntEle, sbHdrEle], ['hide-header']);
      }
      removeClass([leftBar], ['e-close']);
      if (!Browser.isDevice) {
        addClass([leftBar], ['e-open']);
        transformElement.style.marginLeft = leftBar.offsetWidth + 'px';
      }
      transformElement.style.transform = 'translateX(0px)';
    }
  }
  public actionCompleteHandler(): void {
    setTimeout(() => { this.rteObj.toolbarModule.refreshToolbarOverflow(); }, 400);
  }
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section' id='rteIFrame'>
          <div className="content-wrapper">
            <RichTextEditorComponent id="iframeRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor }}
              height={'500px'} actionBegin={this.handleFullScreen.bind(this)} actionComplete={this.actionCompleteHandler.bind(this)} toolbarSettings={this.toolbarSettings}
              iframeSettings={this.iframeSetting} fileManagerSettings={this.fileManagerSettings}>
              <p>The Rich Text Editor component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content.
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
              </ul>
              <Inject services={[Toolbar, Image, Link, HtmlEditor, Table, QuickToolbar, FileManager]} />
            </RichTextEditorComponent>
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the default rendering of the Rich Text Editor in <code>iframe mode</code>.</p>
        </div>

        <div id="description">
          <p>The Rich Text Editor is WYSIWYG ("what you see is what you get") editor that is used to create and edit content, and return valid HTML markup. The editor provides a standard toolbar to format content using its commands. The toolbar contains commands to align the text, insert link, insert image,
            insert list, undo/redo the operation, HTML view, and more.</p>
          <p><b>Injecting Module</b></p>
          <p>Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject <code>Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar</code> modules into the services.</p>
        </div>
      </div>
    );
  }
}
