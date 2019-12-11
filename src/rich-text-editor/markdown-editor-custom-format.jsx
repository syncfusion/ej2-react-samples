/**
 * RichTextEditor custom format sample
 */
import { createElement } from '@syncfusion/ej2-base';
import { Image, Inject, Link, MarkdownEditor, MarkdownFormatter, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import * as Marked from 'marked';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import './markdown-editor-custom-format.css';
export class CustomFormat extends SampleBase {
    constructor() {
        super(...arguments);
        // set the value to RichTextEditor
        this.template = `The sample is configured with customized markdown syntax using the __formatter__ property. Type the content and click the toolbar item to view customized markdown syntax. For unordered list, you need to add a plus sign before the word (e.g., + list1). Or To make a phrase bold, you need to add two underscores before and after the phrase (e.g., __this text is bold__).`;
        // RichTextEditor items list
        this.items = ['Bold', 'Italic', 'StrikeThrough', '|',
            'Formats', 'OrderedList', 'UnorderedList', '|',
            'CreateLink', 'Image', '|',
            {
                tooltipText: 'Preview',
                template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn">' +
                    '<span class="e-btn-icon e-icons e-md-preview"></span></button>'
            }, 'Undo', 'Redo'];
        //RichTextEditor ToolbarSettings
        this.toolbarSettings = {
            items: this.items
        };
        this.formatter = new MarkdownFormatter({
            listTags: { 'OL': '2. ', 'UL': '+ ' },
            formatTags: {
                'Blockquote': '> '
            },
            selectionTags: { 'Bold': '__', 'Italic': '_' }
        });
    }
    markdownConversion() {
        if (this.mdsource.classList.contains('e-active')) {
            let id = this.rteObj.getID() + 'html-view';
            let htmlPreview = this.rteObj.element.querySelector('#' + id);
            htmlPreview.innerHTML = Marked(this.rteObj.contentModule.getEditPanel().value);
        }
    }
    fullPreview() {
        let id = this.rteObj.getID() + 'html-preview';
        let htmlPreview = this.rteObj.element.querySelector('#' + id);
        if (this.mdsource.classList.contains('e-active')) {
            this.mdsource.classList.remove('e-active');
            this.mdsource.parentElement.title = 'Preview';
            this.rteObj.enableToolbarItem(this.rteObj.toolbarSettings.items);
            this.textArea.style.display = 'block';
            htmlPreview.style.display = 'none';
        }
        else {
            this.mdsource.classList.add('e-active');
            this.rteObj.disableToolbarItem(this.rteObj.toolbarSettings.items);
            if (!htmlPreview) {
                htmlPreview = createElement('div', { className: 'e-content e-pre-source' });
                htmlPreview.id = id;
                this.textArea.parentNode.appendChild(htmlPreview);
            }
            this.textArea.style.display = 'none';
            htmlPreview.style.display = 'block';
            htmlPreview.innerHTML = Marked(this.rteObj.contentModule.getEditPanel().value);
            this.mdsource.parentElement.title = 'Code View';
        }
    }
    rendereComplete() {
        this.mdPreview = document.getElementById('MD_Preview');
        this.textArea = this.rteObj.contentModule.getEditPanel();
        this.textArea.addEventListener('keyup', (e) => {
            this.markdownConversion();
        });
        this.mdsource = document.getElementById('preview-code');
        this.mdsource.addEventListener('click', (e) => {
            this.fullPreview();
        });
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section' id="rteCustomFormat">
                    <div className="content-wrapper">
                        <RichTextEditorComponent id="markdownRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor; }} height='260px' editorMode='Markdown' formatter={this.formatter} valueTemplate={this.template} toolbarSettings={this.toolbarSettings}>
                            <Inject services={[MarkdownEditor, Toolbar, Image, Link, QuickToolbar]}/>
                        </RichTextEditorComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p> This sample demonstrates how to customize tags of markdown formatting. Type or edit the text and apply the format to
                        view customized markdown syntax. For example, apply “+” to Unordered list. </p>
                </div>

                <div id="description">
                    The rich text editor allows you to customize the markdown syntax by overriding its default syntax. Configure the customized
                    markdown syntax using the <code>formatter</code>property
                    <p><b>Injecting Module</b></p>
                    <p>RichTextEditor component features are segregated into individual feature-wise modules. To use richtexteditor feature, we need to inject <code>Toolbar, Link, Image, MarkdownEditor, QuickToolbar</code> modules into the services.</p>
                    <p>The third-party library <code>Marked</code> is used in this sample to convert markdown into HTML content.</p>
                </div>
            </div>);
    }
}
