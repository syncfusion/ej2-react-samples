/**
 * Rich Text Editor markdown overview sample
 */
import { createElement, KeyboardEventArgs } from '@syncfusion/ej2-base';
import { Image, Inject, IToolbarItems, Link, MarkdownEditor, MarkdownFormatter, RichTextEditorComponent, Table, Toolbar, ToolbarSettingsModel } from '@syncfusion/ej2-react-richtexteditor';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SampleBase } from '../common/sample-base';
import './default-functionalities.css';

export class MarkDown extends SampleBase<{}, {}> {

    private rteObj: RichTextEditorComponent;

    // set the value to Rich Text Editor
    private template: string = `# 🚀 My Project
A simple yet powerful project that does amazing things.  
**Bold text** for emphasis, *italic* for subtlety, ~~strikethrough~~ for corrections, and <u>underline</u> for highlights.

## ✨ Features
- Fast and efficient  
- Easy to use  
- Fully customizable  

## 🛠️ How to Use
1. Download the file  
2. Open it directly  
3. Start using immediately  

## 🤝 Contributing
Check out our **Contributing Guide** for details.

## 📄 License
This project is licensed under the **MIT License** – see the LICENSE file for details.`;
    private placeholder: string = 'Enter your text here...';
    // Rich Text Editor items list
    private items: (string | IToolbarItems)[] = ['Bold', 'Italic', 'StrikeThrough', '|',
        'Formats', 'Blockquote', 'OrderedList', 'UnorderedList', 'SuperScript', 'SubScript', '|',
        'CreateLink', 'Image', 'CreateTable', '|',
        {
            tooltipText: 'Preview',
            template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn" aria-label="Preview Code">' +
                '<span class="e-btn-icon e-md-preview e-icons"></span></button>'
        }, '|', 'Undo', 'Redo'];


    private textArea: HTMLTextAreaElement;
    private mdsource: HTMLElement;
    private mdPreview: HTMLElement;

    //Rich Text Editor ToolbarSettings
    private toolbarSettings: ToolbarSettingsModel = {
        items: this.items
    };

    private formatter: MarkdownFormatter = new MarkdownFormatter({ listTags: { 'OL': '1., 2., 3.' } });

    public markdownConversion(): void {
        if (this.mdsource.classList.contains('e-active')) {
            let id: string = this.rteObj.getID() + 'html-view';
            let htmlPreview: HTMLElement = this.rteObj.element.querySelector('#' + id);
            htmlPreview.innerHTML = MarkdownConverter.toHtml((this.rteObj.contentModule.getEditPanel() as HTMLTextAreaElement).value) as string;
        }
    }
    public fullPreview(): void {
        let id: string = this.rteObj.getID() + 'html-preview';
        let htmlPreview: HTMLElement = this.rteObj.element.querySelector('#' + id);
        if (this.mdsource.classList.contains('e-active')) {
            this.mdsource.classList.remove('e-active');
            this.mdsource.parentElement.title = 'Preview';
            this.textArea.style.display = 'block';
            htmlPreview.style.display = 'none';
        } else {
            this.mdsource.classList.add('e-active');
            if (!htmlPreview) {
                htmlPreview = createElement('div', { className: 'e-content e-pre-source' });
                htmlPreview.id = id;
                this.textArea.parentNode.appendChild(htmlPreview);
            }
            this.textArea.style.display = 'none';
            htmlPreview.style.display = 'block';
            htmlPreview.innerHTML = MarkdownConverter.toHtml((this.rteObj.contentModule.getEditPanel() as HTMLTextAreaElement).value) as string;
            this.mdsource.parentElement.title = 'Code View';
        }
    }
    public rendereComplete(): void {
        this.textArea = this.rteObj.contentModule.getEditPanel() as HTMLTextAreaElement;
        this.textArea.addEventListener('keyup', (e: KeyboardEventArgs) => {
            this.markdownConversion();
        });
        this.mdsource = document.getElementById('preview-code');
        this.mdsource.addEventListener('click', (e: MouseEvent) => {
            this.fullPreview();
            if ((e.currentTarget as HTMLElement).classList.contains('e-active')) {
                this.rteObj.disableToolbarItem(['Bold', 'Italic', 'StrikeThrough', 'OrderedList',
                    'UnorderedList', 'SuperScript', 'SubScript', 'CreateLink', 'Image', 'CreateTable', 'Formats', 'Blockquote', 'Undo', 'Redo']);
            } else {
                this.rteObj.enableToolbarItem(['Bold', 'Italic', 'StrikeThrough', 'OrderedList',
                    'UnorderedList', 'SuperScript', 'SubScript', 'CreateLink', 'Image', 'CreateTable', 'Formats', 'Blockquote', 'Undo', 'Redo']);
            }
        });
    }
    render() {
        return (
            <div id="markdownSample" className='control-pane'>
                <div className='control-section' id="rteMarkdown">
                    <div className="content-wrapper">
                        <RichTextEditorComponent id="markdownRTE"
                            ref={(richtexteditor) => { this.rteObj = richtexteditor }} editorMode='Markdown'
                            height='520px' valueTemplate={this.template} formatter={this.formatter} toolbarSettings={this.toolbarSettings} >
                            <Inject services={[MarkdownEditor, Toolbar, Image, Link, Table]} />
                        </RichTextEditorComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates markdown editing in the Rich Text Editor with complete features.</p>
                </div>

                <div id="description">
                    <p>The Rich Text Editor supports markdown editing when the <code>editorMode</code> is set to mode property of the Rich Text Editor</p>
                    <p>The editor’s toolbar contains commands to format the markdown content. The toolbar consists of:</p>
                    <ul>
                        <li><code>Lists</code> - Ordered and unordered list types.</li>
                        <li><code>Links</code> - A hyperlink can be inserted into the editor for quick access to related information.</li>
                        <li><code>Image</code> - Inserts and manages images.</li>
                        <li><code>Alignment</code> - Aligns the content with left, center, and right margins.</li>
                        <li><code>Format</code> – Formats the sentence in different ways such as heading level, quotation, and code snippet</li>
                        <li><code>Styles</code> – Allows you to apply inline styles to the selected content like bold, italic, and more.</li>
                        <li><code>Tables</code> – Allows you to insert a table with header.</li>
                    </ul>
                    <p><b>Injecting Module</b></p>
                    <p>Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject <code>Toolbar, Link, Image, MarkdownEditor, Table</code> modules into the services.</p>
                    <p>Syncfusion's <code>Markdown Converter</code> is used in this sample to convert markdown into HTML content.</p>
                </div>
            </div>
        );
    }
}
