/**
 * RichTextEditor Iframe sample
 */
import * as React from 'react';
import { RichTextEditorComponent, Toolbar, Inject, Image, Table, Link, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import './iframe.css';
export class IFrame extends SampleBase {
    constructor() {
        super(...arguments);
        this.iframeSetting = {
            enable: true
        };
        // RichTextEditor items list
        this.items = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
            'LowerCase', 'UpperCase', 'SuperScript', 'SubScript', '|',
            'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
            'Outdent', 'Indent', '|',
            'CreateTable', 'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
            'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'
        ];
        //RichTextEditor ToolbarSettings
        this.toolbarSettings = {
            items: this.items
        };
    }
    handleFullScreen(e) {
        let sbCntEle = document.querySelector('.sb-content.e-view');
        let sbHdrEle = document.querySelector('.sb-header.e-view');
        let leftBar;
        let transformElement;
        if (Browser.isDevice) {
            leftBar = document.querySelector('#right-sidebar');
            transformElement = document.querySelector('.sample-browser.e-view.e-content-animation');
        }
        else {
            leftBar = document.querySelector('#left-sidebar');
            transformElement = document.querySelector('#right-pane');
        }
        if (e.targetItem === 'Maximize') {
            if (Browser.isDevice && Browser.isIos) {
                addClass([sbCntEle, sbHdrEle], ['hide-header']);
            }
            addClass([leftBar], ['e-close']);
            removeClass([leftBar], ['e-open']);
            if (!Browser.isDevice) {
                transformElement.style.marginLeft = '0px';
            }
            transformElement.style.transform = 'inherit';
        }
        else if (e.targetItem === 'Minimize') {
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
    actionCompleteHandler() {
        setTimeout(() => { this.rteObj.toolbarModule.refreshToolbarOverflow(); }, 400);
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section' id='rteIFrame'>
          <div className="content-wrapper">
            <RichTextEditorComponent id="iframeRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor; }} height={'500px'} actionBegin={this.handleFullScreen.bind(this)} actionComplete={this.actionCompleteHandler.bind(this)} toolbarSettings={this.toolbarSettings} iframeSettings={this.iframeSetting}>
              <p>The rich text editor component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content.
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
              <Inject services={[Toolbar, Image, Link, HtmlEditor, Table, QuickToolbar]}/>
            </RichTextEditorComponent>
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the default rendering of the rich text editor in <code>iframe mode</code>.</p>
        </div>

        <div id="description">
          <p>The rich text editor is WYSIWYG ("what you see is what you get") editor that is used to create and edit content, and return valid HTML markup. The editor provides a standard toolbar to format content using its commands. The toolbar contains commands to align the text, insert link, insert image,
            insert list, undo/redo the operation, HTML view, and more.</p>
          <p><b>Injecting Module</b></p>
          <p>RichTextEditor component features are segregated into individual feature-wise modules. To use richtexteditor feature, we need to inject <code>Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar</code> modules into the services.</p>
        </div>
      </div>);
    }
}
