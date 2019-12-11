/**
 * RichTextEditor markdown preview sample
 */
import { addClass, Browser, createElement, isNullOrUndefined, removeClass } from '@syncfusion/ej2-base';
import { Image, Inject, Link, MarkdownEditor, QuickToolbar, RichTextEditorComponent, Table, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import * as Marked from 'marked';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import './markdown-editor-preview.css';
export class Preview extends SampleBase {
    constructor() {
        super(...arguments);
        // set the value to RichTextEditor
        this.value = `In RichTextEditor , you click the toolbar buttons to format the words and the changes are visible immediately. 
Markdown is not like that. When you format the word in Markdown format, you need to add Markdown syntax to the word to indicate which words 
and phrases should look different from each other
    
RichTextEditor supports markdown editing when the editorMode set as **markdown** and using both *keyboard interaction* and *toolbar action*, you can apply the formatting to text.
    
We can add our own custom formation syntax for the Markdown formation, [sample link](https://ej2.syncfusion.com/home/).
    
The third-party library <b>Marked</b> is used in this sample to convert markdown into HTML content`;
        // RichTextEditor items list
        this.items = ['Bold', 'Italic', 'StrikeThrough', '|', 'Formats', 'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', 'CreateTable', '|',
            {
                tooltipText: 'Preview', template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn">' +
                    '<span class="e-btn-icon e-md-preview e-icons"></span></button>'
            },
            {
                tooltipText: 'Split Editor', template: '<button id="MD_Preview" class="e-tbar-btn e-control e-btn e-icon-btn">' +
                    '<span class="e-btn-icon e-view-side e-icons"></span></button>'
            }, 'FullScreen', '|', 'Undo', 'Redo'];
        //RichTextEditor ToolbarSettings
        this.toolbarSettings = {
            items: this.items
        };
    }
    markdownConversion() {
        if (this.mdSplit.classList.contains('e-active')) {
            let id = this.rteObj.getID() + 'html-view';
            let htmlPreview = this.rteObj.element.querySelector('#' + id);
            this.htmlPreview.innerHTML = Marked(this.rteObj.contentModule.getEditPanel().value);
        }
    }
    fullPreview(e) {
        let id = this.rteObj.getID() + 'html-preview';
        this.htmlPreview = this.rteObj.element.querySelector('#' + id);
        if ((this.mdsource.classList.contains('e-active') || this.mdSplit.classList.contains('e-active')) && e.mode) {
            this.mdsource.classList.remove('e-active');
            this.mdSplit.classList.remove('e-active');
            this.mdsource.parentElement.title = 'Preview';
            this.textArea.style.display = 'block';
            this.textArea.style.width = '100%';
            this.htmlPreview.style.display = 'none';
        }
        else {
            this.mdsource.classList.add('e-active');
            this.mdSplit.classList.add('e-active');
            if (!this.htmlPreview) {
                this.htmlPreview = createElement('div', { className: 'e-content' });
                this.htmlPreview.id = id;
                this.textArea.parentNode.appendChild(this.htmlPreview);
            }
            if (e.type === 'preview') {
                this.textArea.style.display = 'none';
                this.htmlPreview.classList.add('e-pre-source');
            }
            else {
                this.htmlPreview.classList.remove('e-pre-source');
                this.textArea.style.width = '50%';
            }
            this.htmlPreview.style.display = 'block';
            this.htmlPreview.innerHTML = Marked(this.rteObj.contentModule.getEditPanel().value);
            this.mdsource.parentElement.title = 'Code View';
        }
    }
    rendereComplete() {
        this.textArea = this.rteObj.contentModule.getEditPanel();
        this.textArea.addEventListener('keyup', (e) => { this.markdownConversion(); });
        let rteObj = this.rteObj;
        this.mdsource = document.getElementById('preview-code');
        this.mdsource.addEventListener('click', (e) => {
            this.fullPreview({ mode: true, type: 'preview' });
            if (e.currentTarget.classList.contains('e-active')) {
                rteObj.disableToolbarItem(['Bold', 'Italic', 'StrikeThrough', '|',
                    'Formats', 'OrderedList', 'UnorderedList', '|',
                    'CreateLink', 'Image', 'CreateTable', 'Undo', 'Redo']);
                e.currentTarget.parentElement.nextElementSibling.classList.add('e-overlay');
            }
            else {
                rteObj.enableToolbarItem(['Bold', 'Italic', 'StrikeThrough', '|',
                    'Formats', 'OrderedList', 'UnorderedList', '|',
                    'CreateLink', 'Image', 'CreateTable', 'Undo', 'Redo']);
                e.currentTarget.parentElement.nextElementSibling.classList.remove('e-overlay');
            }
        });
        this.mdSplit = document.getElementById('MD_Preview');
        this.mdSplit.addEventListener('click', (e) => {
            if (rteObj.element.classList.contains('e-rte-full-screen')) {
                this.fullPreview({ mode: true, type: '' });
            }
            this.mdsource.classList.remove('e-active');
            if (!rteObj.element.classList.contains('e-rte-full-screen')) {
                rteObj.showFullScreen();
            }
        });
    }
    actionComplete(e) {
        if (e.targetItem === 'Maximize' && isNullOrUndefined(e.args)) {
            this.fullPreview({ mode: true, type: '' });
        }
        else if (!this.mdSplit.parentElement.classList.contains('e-overlay')) {
            if (e.targetItem === 'Minimize') {
                this.textArea.style.display = 'block';
                this.textArea.style.width = '100%';
                if (this.htmlPreview) {
                    this.htmlPreview.style.display = 'none';
                }
                this.mdSplit.classList.remove('e-active');
                this.mdsource.classList.remove('e-active');
            }
            this.markdownConversion();
        }
        this.rteObj.toolbarModule.refreshToolbarOverflow();
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
    render() {
        return (<div className='control-pane'>
                <div className='control-section' id="rtePreview">
                    <div className="content-wrapper">
                        <RichTextEditorComponent id="markdownPreview" actionBegin={this.handleFullScreen.bind(this)} actionComplete={this.actionComplete.bind(this)} editorMode='Markdown' height='300px' ref={(richtexteditor) => { this.rteObj = richtexteditor; }} value={this.value} toolbarSettings={this.toolbarSettings}>
                            <Inject services={[MarkdownEditor, Toolbar, Image, Link, QuickToolbar, Table]}/>
                        </RichTextEditorComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates how to preview markdown changes in rich text editor.
        Type or edit the display text, and apply format to view the preview of markdown.
        You can preview the markdown changes immediately in the preview area.</p>
                </div>
                <div id="description">
                    <p>The rich text editor allows you to preview markdown changes immediately using <code>preview</code>.
                The third-party library <code>Marked</code> is used in this sample to convert markdown into HTML content.</p>
                </div>
            </div>);
    }
}
