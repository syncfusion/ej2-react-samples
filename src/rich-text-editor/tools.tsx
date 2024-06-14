/**
 * Rich Text Editor overview sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { RichTextEditorComponent, Toolbar, Inject, Image, Link, HtmlEditor, Count, QuickToolbar, Table, EmojiPicker, Video, Audio, FormatPainter, PasteCleanup } from '@syncfusion/ej2-react-richtexteditor';
import { ToolbarSettingsModel, ActionBeginEventArgs, FileManager, FileManagerSettingsModel, QuickToolbarSettingsModel } from '@syncfusion/ej2-react-richtexteditor';
import { createElement } from '@syncfusion/ej2-base';
import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import * as CodeMirror from 'codemirror';
import { Editor as ICodeMirror } from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import './tools.css';

export class Overview extends SampleBase<{}, {}> {

  private editor: RichTextEditorComponent;
  private uploadObj: UploaderComponent;
  private mention: MentionComponent;
  private codeMirror: ICodeMirror;

  private hostUrl: string = 'https://services.syncfusion.com/react/production/';

  // Rich Text Editor items list
  private items: any = [
    'Undo', 'Redo', '|',
    {
      tooltipText: "Import from Word",
      template:
        `<button class="e-tbar-btn e-control e-btn e-lib e-icon-btn" tabindex="-1" id="custom_tbarbtn_1" style="width:100%">
          <span class="e-icons e-rte-import-doc e-btn-icon"></span></button>`,
      click: this.importContentFromWord.bind(this)
    },
    {
      tooltipText: "Export to Word",
      template:
        `<button class="e-tbar-btn e-control e-btn e-lib e-icon-btn" tabindex="-1" id="custom_tbarbtn_2" style="width:100%">
          <span class="e-icons e-rte-export-doc e-btn-icon"></span></button>`,
      click: this.exportContentToWord.bind(this)
    },
    {
      tooltipText: "Export to PDF",
      template:
        `<button class="e-tbar-btn e-control e-btn e-lib e-icon-btn" tabindex="-1" id="custom_tbarbtn_3" style="width:100%">
          <span class="e-icons e-rte-export-pdf e-btn-icon"></span></button>`,
      click: this.exportContentToPDF.bind(this)
    }, '|',
    'Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
    'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
    'LowerCase', 'UpperCase', '|',
    'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList', '|',
    'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'FileManager', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
    '|', 'EmojiPicker', 'Print', '|',
    'SourceCode', 'FullScreen']
  private rteValue: string = `<h1>Welcome to the Syncfusion Rich Text Editor</h1><p>The Rich Text Editor, a WYSIWYG (what you see is what you get) editor, is a user interface that allows you to create, edit, and format rich text content. You can try out a demo of this editor here.</p><h2>Do you know the key features of the editor?</h2><ul> <li>Basic features include headings, block quotes, numbered lists, bullet lists, and support to insert images, tables, audio, and video.</li> <li>Inline styles include <b>bold</b>, <em>italic</em>, <span style="text-decoration: underline">underline</span>, <span style="text-decoration: line-through">strikethrough</span>, <a class="e-rte-anchor" href="https://ej2.syncfusion.com/react/demos/#/material3/rich-text-editor/tools" title="https://ej2.syncfusion.com/react/demos/#/material3/rich-text-editor/tools">hyperlinks</a>, 😀 and more.</li> <li>The toolbar has multi-row, expandable, and scrollable modes. The Editor supports an inline toolbar, a floating toolbar, and custom toolbar items.</li> <li>Integration with Syncfusion Mention control lets users tag other users. To learn more, check out the <a class="e-rte-anchor" href="https://ej2.syncfusion.com/react/documentation/rich-text-editor/mention-integration" title="Mention Documentation">documentation</a> and <a class="e-rte-anchor" href="https://ej2.syncfusion.com/react/demos/#/material3/rich-text-editor/mention-integration" title="Mention Demos">demos</a>.</li> <li><b>Paste from MS Word</b> - helps to reduce the effort while converting the Microsoft Word content to HTML format with format and styles. To learn more, check out the documentation <a class="e-rte-anchor" href="https://ej2.syncfusion.com/react/documentation/rich-text-editor/paste-cleanup" title="Paste from MS Word Documentation">here</a>.</li> <li>Other features: placeholder text, character count, form validation, enter key configuration, resizable editor, IFrame rendering, tooltip, source code view, RTL mode, persistence, HTML Sanitizer, autosave, and <a class="e-rte-anchor" href="https://ej2.syncfusion.com/react/documentation/api/rich-text-editor" title="Rich Text Editor API">more</a>.</li></ul><blockquote><p><em>Easily access Audio, Image, Link, Video, and Table operations through the quick toolbar by right-clicking on the corresponding element with your mouse.</em></p></blockquote><h2>Unlock the Power of Tables</h2><p>A table can be created in the editor using either a keyboard shortcut or the toolbar. With the quick toolbar, you can perform table cell insert, delete, split, and merge operations. You can style the table cells using background colours and borders.</p><table class="e-rte-table" style="width: 100%; min-width: 0px; height: 151px"> <thead style="height: 16.5563%"> <tr style="height: 16.5563%"> <th style="width: 12.1813%"><span>S No</span><br/></th> <th style="width: 23.2295%"><span>Name</span><br/></th> <th style="width: 9.91501%"><span>Age</span><br/></th> <th style="width: 15.5807%"><span>Gender</span><br/></th> <th style="width: 17.9887%"><span>Occupation</span><br/></th> <th style="width: 21.1048%">Mode of Transport</th> </tr> </thead> <tbody> <tr style="height: 16.5563%"> <td style="width: 12.1813%">1</td> <td style="width: 23.2295%">Selma Rose</td> <td style="width: 9.91501%">30</td> <td style="width: 15.5807%">Female</td> <td style="width: 17.9887%"><span>Engineer</span><br/></td> <td style="width: 21.1048%"><span style="font-size: 14pt">🚴</span></td> </tr> <tr style="height: 16.5563%"> <td style="width: 12.1813%">2</td> <td style="width: 23.2295%"><span>Robert</span><br/></td> <td style="width: 9.91501%">28</td> <td style="width: 15.5807%">Male</td> <td style="width: 17.9887%"><span>Graphic Designer</span></td> <td style="width: 21.1048%"><span style="font-size: 14pt">🚗</span></td> </tr> <tr style="height: 16.5563%"> <td style="width: 12.1813%">3</td> <td style="width: 23.2295%"><span>William</span><br/></td> <td style="width: 9.91501%">35</td> <td style="width: 15.5807%">Male</td> <td style="width: 17.9887%">Teacher</td> <td style="width: 21.1048%"><span style="font-size: 14pt">🚗</span></td> </tr> <tr style="height: 16.5563%"> <td style="width: 12.1813%">4</td> <td style="width: 23.2295%"><span>Laura Grace</span><br/></td> <td style="width: 9.91501%">42</td> <td style="width: 15.5807%">Female</td> <td style="width: 17.9887%">Doctor</td> <td style="width: 21.1048%"><span style="font-size: 14pt">🚌</span></td> </tr> <tr style="height: 16.5563%"> <td style="width: 12.1813%">5</td><td style="width: 23.2295%"><span>Andrew James</span><br/></td><td style="width: 9.91501%">45</td><td style="width: 15.5807%">Male</td><td style="width: 17.9887%">Lawyer</td><td style="width: 21.1048%"><span style="font-size: 14pt">🚕</span></td></tr></tbody></table><h2>Elevating Your Content with Images</h2><p>Images can be added to the editor by pasting or dragging into the editing area, using the toolbar to insert one as a URL, or uploading directly from the File Browser. Easily manage your images on the server by configuring the <a class="e-rte-anchor" href="https://ej2.syncfusion.com/react/documentation/api/rich-text-editor/#insertimagesettings" title="Insert Image Settings API">insertImageSettings</a> to upload, save, or remove them. </p><p>The Editor can integrate with the Syncfusion Image Editor to crop, rotate, annotate, and apply filters to images. Check out the demos <a class="e-rte-anchor" href="https://ej2.syncfusion.com/react/demos/#/material3/rich-text-editor/image-editor-integration" title="Image Editor Demo">here</a>.</p><p><img alt="Sky with sun" src="https://cdn.syncfusion.com/ej2/richtexteditor-resources/RTE-Overview.png" style="width: 440px" class="e-rte-image e-imginline" /></p>`;

  private emailData: { [key: string]: string; }[] = [
    { name: "Selma Rose", initial: 'SR', email: "selma@gmail.com", color: '#FAFDFF', bgColor: '#01579B' },
    { name: "Maria", initial: 'MA', email: "maria@gmail.com", color: '#004378', bgColor: '#ADDBFF' },
    { name: "Russo Kay", initial: 'RK', email: "russo@gmail.com", color: '#F9DEDC', bgColor: '#8C1D18' },
    { name: "Robert", initial: 'RO', email: "robert@gmail.com", color: '#FFD6F7', bgColor: '#37003A' },
    { name: "Camden Kate", initial: 'CK', email: "camden@gmail.com", color: '#FFFFFF', bgColor: '#464ECF' },
    { name: "Garth", initial: 'GA', email: "garth@gmail.com", color: '#FFFFFF', bgColor: '#008861' },
    { name: "Andrew James", initial: 'AJ', email: "james@gmail.com", color: '#FFFFFF', bgColor: '#53CA17' },
    { name: "Olivia", initial: 'OL', email: "olivia@gmail.com", color: '#FFFFFF', bgColor: '#8C1D18' },
    { name: "Sophia", initial: 'SO', email: "sophia@gmail.com", color: '#000000', bgColor: '#D0BCFF' },
    { name: "Margaret", initial: 'MA', email: "margaret@gmail.com", color: '#000000', bgColor: '#F2B8B5' },
    { name: "Ursula Ann", initial: 'UA', email: "ursula@gmail.com", color: '#000000', bgColor: '#47ACFB' },
    { name: "Laura Grace", initial: 'LG', email: "laura@gmail.com", color: '#000000', bgColor: '#FFE088' },
    { name: "Albert", initial: 'AL', email: "albert@gmail.com", color: '#FFFFFF', bgColor: '#00335B' },
    { name: "William", initial: 'WA', email: "william@gmail.com", color: '#FFFFFF', bgColor: '#163E02' }
  ];


  private fileManagerSettings: FileManagerSettingsModel = {
    enable: true,
    path: '/Pictures/Food',
    ajaxSettings: {
      url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
      getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage',
      uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload',
      downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download'
    }
  }

  private quickToolbarSettings: QuickToolbarSettingsModel = {
    table: ['TableHeader', 'TableRows', 'TableColumns', 'TableCell', '-', 'BackgroundColor', 'TableRemove', 'TableCellVerticalAlign', 'Styles'],
    showOnRightClick: true,
  }
  private insertImageSettings: any  = {
    saveUrl: this.hostUrl + 'api/RichTextEditor/SaveFile',
    removeUrl: this.hostUrl + 'api/RichTextEditor/DeleteFile',
    path: this.hostUrl + 'RichTextEditor/'
  }

  //Rich Text Editor ToolbarSettings
  private toolbarSettings: ToolbarSettingsModel = {
    items: this.items
  };
  
  private uploadAsyncSettings: any = {
    saveUrl: this.hostUrl + 'api/RichTextEditor/ImportFromWord',
  }

  private importContentFromWord(): void {
    this.uploadObj.element.click();
  }
  private exportContentToWord(): void {
    const rteHtmlData = this.editor.getHtml();
    const html = `<html><head></head><body>${rteHtmlData}</body></html>`;
    fetch(this.hostUrl + 'api/RichTextEditor/ExportToDocx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html: html }) // Wrap HTML in a JSON object
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const filename: string = 'Result.docx';
        // Create a Blob from the response and initiate the download
        return response.blob().then(blob => ({ blob, filename }));
      })
      .then(({ blob, filename }) => {
        const url = window.URL.createObjectURL(blob);       // Create a Blob URL from the response and initiate the download    
        const a = document.createElement('a');              // Create an anchor element
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);                       // Append the anchor element to the document
        a.click();                                          // Trigger a click on the anchor element to initiate the download
        document.body.removeChild(a);                       // Remove the anchor element from the document
        window.URL.revokeObjectURL(url);                    // Revoke the object URL to free up resources
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }
  private exportContentToPDF(): void {
    const rteHtmlData = this.editor.getHtml();
    const html = `<html><head></head><body>${rteHtmlData}</body></html>`;
    fetch(this.hostUrl + 'api/RichTextEditor/ExportToPdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html: html }) // Wrap HTML in a JSON object
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob();
      })
      .then(blob => {
        const url: string = window.URL.createObjectURL(blob);       // Create a Blob URL from the response and initiate the download
        const a: HTMLAnchorElement = document.createElement('a');   // Create an anchor element
        a.href = url;
        a.download = 'Sample.pdf';
        document.body.appendChild(a);             // Append the anchor element to the document
        a.click();                                // Trigger a click on the anchor element to initiate the download
        document.body.removeChild(a);             // Remove the anchor element from the document
        window.URL.revokeObjectURL(url);          // Revoke the object URL to free up resources
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }

  private onUploadSuccess(args: any): void {
    this.editor.executeCommand('insertHTML', args.e.currentTarget.response, { undo: true });
  }

  private mirrorConversion(e?: any): void {
    const id: string = this.editor.getID() + 'mirror-view';
    const rteContainer: HTMLElement = this.editor.element.querySelector('.e-rte-container') as HTMLElement;
    let mirrorView: HTMLElement = this.editor.element.querySelector('#' + id) as HTMLElement;
    if (e.targetItem === 'Preview') {
      this.editor.value = this.codeMirror.getValue();
      this.editor.dataBind();
      rteContainer.classList.remove('e-rte-code-mirror-enabled');
      this.editor.focusIn();
    } else {
      rteContainer.classList.add('e-rte-code-mirror-enabled');
      rteContainer.classList.remove('e-source-code-enabled');
      if (!mirrorView) {
        mirrorView = createElement('div', { className: 'rte-code-mirror', id: id, styles: 'display: none;' });
        rteContainer.appendChild(mirrorView);
        this.renderCodeMirror(mirrorView, this.editor.value === null ? '' : this.editor.value);
      }
      else {
        this.codeMirror.setValue(this.editor.value);
      }
      this.codeMirror.focus();
    }
  }
  private renderCodeMirror(mirrorView: HTMLElement, content: string): void {
    this.codeMirror = CodeMirror(mirrorView, {
      value: content,
      lineNumbers: true,
      mode: 'text/html',
      lineWrapping: true,
    });
  }
  private actionCompleteHandler(e: any): void {
    if (e.targetItem && (e.targetItem === 'SourceCode' || e.targetItem === 'Preview')) {
      this.mirrorConversion(e);
    }
    if (e.requestType === 'SourceCode') {
      this.editor.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.add('e-overlay');
      this.editor.getToolbar().querySelector('#custom_tbarbtn_2').parentElement.classList.add('e-overlay');
      this.editor.getToolbar().querySelector('#custom_tbarbtn_3').parentElement.classList.add('e-overlay');
    } else if (e.requestType === 'Preview') {
      this.editor.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.remove('e-overlay');
      this.editor.getToolbar().querySelector('#custom_tbarbtn_2').parentElement.classList.remove('e-overlay');
      this.editor.getToolbar().querySelector('#custom_tbarbtn_3').parentElement.classList.remove('e-overlay');
    }
  }
  private quickToolbarOpenHandler(args: any): void {
    if (!isNullOrUndefined(args.targetElement) && args.targetElement.nodeName === 'IMG') {
      this.editor.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.add('e-overlay');
      this.editor.getToolbar().querySelector('#custom_tbarbtn_2').parentElement.classList.add('e-overlay');
      this.editor.getToolbar().querySelector('#custom_tbarbtn_3').parentElement.classList.add('e-overlay');
    }
  }
  private quickToolbarClosehandler(args: any): void {
    if (!isNullOrUndefined(args.element) && args.element.classList.contains('e-rte-image-popup')) {
      this.editor.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.remove('e-overlay');
      this.editor.getToolbar().querySelector('#custom_tbarbtn_2').parentElement.classList.remove('e-overlay');
      this.editor.getToolbar().querySelector('#custom_tbarbtn_3').parentElement.classList.remove('e-overlay');
    }
  }
  private actionBeginHandler(e: ActionBeginEventArgs): void {
    if (e.requestType === 'EnterAction' && this.mention.element.classList.contains('e-popup-open')) {
      e.cancel = true;
    }
    if (e.requestType === 'Maximize' || e.requestType === 'Minimize') {
      this.handleFullScreen(e);
    }
  }

  private handleFullScreen(e: any): void {
    let sbCntEle: HTMLElement = document.querySelector('.sb-content.e-view') as HTMLElement;
    let sbHdrEle: HTMLElement = document.querySelector('.sb-header.e-view') as HTMLElement;
    let leftBar: HTMLElement;
    let transformElement: HTMLElement;
    if (Browser.isDevice) {
      leftBar = document.querySelector('#right-sidebar') as HTMLElement;
      transformElement = document.querySelector('.sample-browser.e-view.e-content-animation') as HTMLElement;
    } else {
      leftBar = document.querySelector('#left-sidebar') as HTMLElement;
      transformElement = document.querySelector('#right-pane') as HTMLElement;
    }
    if (e.targetItem === 'Maximize') {
      if (Browser.isDevice && Browser.isIos) { addClass([sbCntEle, sbHdrEle], ['hide-header']); }
      addClass([leftBar], ['e-close']);
      removeClass([leftBar], ['e-open']);
      if (!Browser.isDevice) { transformElement.style.marginLeft = '0px'; }
      transformElement.style.transform = 'inherit';
    } else if (e.targetItem === 'Minimize') {
      if (Browser.isDevice && Browser.isIos) { removeClass([sbCntEle, sbHdrEle], ['hide-header']); }
      removeClass([leftBar], ['e-close']);
      if (!Browser.isDevice) {
        addClass([leftBar], ['e-open']);
        transformElement.style.marginLeft = leftBar.offsetWidth + 'px';
      }
      transformElement.style.transform = 'translateX(0px)';
    }
  }

  private itemTemplate(data: any): React.JSX.Element {
    return (
      <div className="editor-mention-item-template">
        <div className="em-header">
          <div className="em-avatar" style={{ backgroundColor: data.bgColor, color: data.color }}>
            <div className="em-initial">{data.initial}</div>
          </div>
        </div>
        <div className="em-content">
          <div className="em-name">{data.name}</div>
          <div className="em-email">{data.email}</div>
        </div>
      </div>
    );
  }

  private displayTemplate(data: any): React.JSX.Element {
    return (
      <a href={"mailto:" + data.email} title={data.email}>@{data.name}</a>
    );
  }
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section' id="rteTools">
          <div className='rte-control-section'>
            <RichTextEditorComponent id="toolsRTE" ref={(richtexteditor: RichTextEditorComponent) => { this.editor = richtexteditor }}
              value={this.rteValue} showCharCount={true} actionBegin={this.actionBeginHandler.bind(this)}
              actionComplete={this.actionCompleteHandler.bind(this)} beforeQuickToolbarOpen={this.quickToolbarOpenHandler.bind(this)} quickToolbarClose={this.quickToolbarClosehandler.bind(this)} toolbarSettings={this.toolbarSettings}
              fileManagerSettings={this.fileManagerSettings} quickToolbarSettings={this.quickToolbarSettings} enableTabKey={true}
              insertImageSettings={this.insertImageSettings} enableXhtml={true} placeholder='Type something or use @ to tag a user...'>
              <Inject services={[Toolbar, Image, Link, HtmlEditor, Count, QuickToolbar, Table, FileManager, EmojiPicker, Video, Audio, FormatPainter, PasteCleanup]} />
            </RichTextEditorComponent>
            <UploaderComponent id='rteCustomWordUpload' name='UploadFiles' ref={(upload: UploaderComponent) => { this.uploadObj = upload; }} type='file' asyncSettings={this.uploadAsyncSettings} success={this.onUploadSuccess.bind(this)} allowedExtensions='.docx,.doc,.rtf'></UploaderComponent>
            <MentionComponent id='editorMention' ref={(mention: MentionComponent) => { this.mention = mention }} dataSource={this.emailData} displayTemplate={this.displayTemplate} itemTemplate={this.itemTemplate} target="#toolsRTE_rte-edit-view" fields={{ text: 'name' }} popupWidth='250px' popupHeight='200px' sortOrder='Ascending' allowSpaces={true}></MentionComponent>
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the full features of Rich Text Editor that includes all the tools and functionalities.</p>
        </div>

        <div id="description">
          <p>This sample used <code>Code mirror</code> plugins helps to highlight the HTML content and when changes happens in code view, the same has been reflected in preview mode. </p>
          <p>The quick toolbar provides a convenient way to customize Image, Video, Audio, Table, and Link elements. Simply right-click on the desired element, utilizing the <code>showOnRightClick</code> property, and the quick toolbar will appear, providing an easy way for customization.</p>
          <p>The editor’s toolbar contains commands to format the content. The toolbar consists of:</p>
          <ul>
            <li><code>Lists</code> - NumberFormat list and BulletFormat list types.</li>
            <li><code>Links</code> - A hyperlink can be inserted into the this.editor for quick access to related information.</li>
            <li><code>Image</code> - Inserts and manages images.</li>
            <li><code>Table</code> - Inserts and manages Tables.</li>
            <li><code>Alignment</code> - Aligns the content with left, center, and right margins.</li>
            <li><code>Undo/Redo</code> - Allows undo/redo operations.</li>
            <li><code>Indent/ Outdent</code> - Increases/decreases the indent level of the content.</li>
            <li><code>Font</code> - Able to do styling on text like font family, size, fore color and background color.</li>
            <li><code>Lower / Upper case</code> – Changes the casing of the selected text.</li>
            <li><code>SubScript / SuperScript</code> - Makes the selected text as subscript (lower)/superscript(upper).</li>
            <li><code>FullScreen</code> - Stretches the this.editor to the maximum width and height of the browser window.</li>
            <li><code>Format</code> – Formats the sentence in different ways such as heading level, quotation, and code snippet</li>
            <li><code>Styles</code> – Allows you to apply inline styles to the selected content like bold, italic, and more.</li>
            <li><code>Insert Code</code> - Allows you to apply code format to the selected parent nodes. In the above sample, the style for the code format ('pre' tag) is applied by adding the background color.</li>
            <li><code>Insert Emoticon</code> - Inserts the emoticon to the this.editor</li>
            <li><code>Audio</code> - Inserts and manages audios.</li>
            <li><code>Video</code> - Inserts and manages videos.</li>
            <li><code>Format Painter</code> - The Format Painter feature allows you to copy the formats and apply them to content without formatting thus saving time to reformat the content.</li>
          </ul>
          <p><b>Injecting Module</b></p>
          <p>Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject <code>Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, Table, EmojiPicker, Video, Audio, FormatPainter, PasteCleanup</code> modules into the services.</p>
        </div>
      </div>
    );
  }
}
