/**
 * RichTextEditor markdown overview sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RichTextEditorComponent, MarkdownEditor, Inject, Toolbar, Image, Link, IToolbarItems, QuickToolbar, Table } from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';
import { createElement, KeyboardEventArgs } from '@syncfusion/ej2-base';
import * as Marked from 'marked';
import './markdown-editor.css';

export class MarkDown extends SampleBase<{}, {}> {

    private rteObj: RichTextEditorComponent;

    // set the value to RichTextEditor
    private template: string = `The sample is added to showcase **markdown editing**.

Type or edit the content and apply formatting to view markdown formatted content.
    
We can add our own custom formation syntax for the Markdown formation, [sample link](https://ej2.syncfusion.com/home/).
    
The third-party library <b>Marked</b> is used in this sample to convert markdown into HTML content`;

    // RichTextEditor items list
    private items: (string | IToolbarItems)[] = ['Bold', 'Italic', 'StrikeThrough', '|',
    'Formats', 'OrderedList', 'UnorderedList', '|',
    'CreateLink', 'Image', 'CreateTable', '|',
    {
        tooltipText: 'Preview',
        template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn">' +
        '<span class="e-btn-icon e-md-preview e-icons"></span></button>'
    }, '|', 'Undo', 'Redo'];

    private textArea: HTMLTextAreaElement;
    private mdsource: HTMLElement;
    private mdPreview: HTMLElement;

    //RichTextEditor ToolbarSettings
    private toolbarSettings: object = {
        items: this.items
    };

    public markDownConversion(): void {
        if (this.mdsource.classList.contains('e-active')) {
            let id: string = this.rteObj.getID() + 'html-view';
            let htmlPreview: HTMLElement = this.rteObj.element.querySelector('#' + id);
            htmlPreview.innerHTML = Marked((this.rteObj.contentModule.getEditPanel() as HTMLTextAreaElement).value);
        }
    }
    public fullPreview(): void {
        let id: string = this.rteObj.getID() + 'html-preview';
        let htmlPreview: HTMLElement = this.rteObj.element.querySelector('#' + id);
        let previewTextArea: HTMLElement = this.rteObj.element.querySelector('.e-rte-content') as HTMLElement;
        if (this.mdsource.classList.contains('e-active')) {
            this.mdsource.classList.remove('e-active');
            this.mdsource.parentElement.title = 'Preview';
            this.textArea.style.display = 'block';
            htmlPreview.style.display = 'none';
            previewTextArea.style.overflow = 'hidden';
        } else {
            this.mdsource.classList.add('e-active');
            if (!htmlPreview) {
                htmlPreview = createElement('div', { className: 'e-content e-pre-source' });
                htmlPreview.id = id;
                this.textArea.parentNode.appendChild(htmlPreview);
                previewTextArea.style.overflow = 'auto';
            }
            if(previewTextArea.style.overflow === 'hidden') {
                previewTextArea.style.overflow = 'auto';
            }
            this.textArea.style.display = 'none';
            htmlPreview.style.display = 'block';
            htmlPreview.innerHTML = Marked((this.rteObj.contentModule.getEditPanel() as HTMLTextAreaElement).value);
            this.mdsource.parentElement.title = 'Code View';
        }
    }
    public rendereComplete(): void {
        this.textArea = this.rteObj.contentModule.getEditPanel() as HTMLTextAreaElement;
        this.textArea.addEventListener('keyup', (e: KeyboardEventArgs) => {
            this.markDownConversion();
        });
        this.mdsource = document.getElementById('preview-code');
        this.mdsource.addEventListener('click', (e: MouseEvent) => {
            this.fullPreview();
            if ((e.currentTarget as HTMLElement).classList.contains('e-active')) {
                this.rteObj.disableToolbarItem(['Bold', 'Italic', 'StrikeThrough', 'OrderedList',
                'UnorderedList', 'CreateLink', 'Image', 'CreateTable', 'Formats', 'Undo', 'Redo']);
            } else {
                this.rteObj.enableToolbarItem(['Bold', 'Italic', 'StrikeThrough', 'OrderedList',
                'UnorderedList', 'CreateLink', 'Image', 'CreateTable', 'Formats', 'Undo', 'Redo']);
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
                            height='250px' valueTemplate={this.template} toolbarSettings={this.toolbarSettings} >
                            <Inject services={[MarkdownEditor, Toolbar, Image, Link, QuickToolbar, Table]} />
                        </RichTextEditorComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates markdown editing in the rich text editor with complete features.</p>
                </div>
        
                <div id="description">
                    <p>The rich text editor supports markdown editing when the <code>editorMode</code> is set to mode property of the RichTextEditor</p>
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
                    <p>RichTextEditor component features are segregated into individual feature-wise modules. To use richtexteditor feature, we need to inject <code>Toolbar, Link, Image, MarkdownEditor</code> modules into the services.</p>

                    <p>The third-party library <code>Marked</code> is used in this sample to convert markdown into HTML content.</p>
                </div>
            </div>
        );
    }
}
