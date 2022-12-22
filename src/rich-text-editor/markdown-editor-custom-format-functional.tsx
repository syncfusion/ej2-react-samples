/**
 * Rich Text Editor custom format sample
 */
import { createElement, KeyboardEventArgs } from '@syncfusion/ej2-base';
import { Image, Inject, ToolbarSettingsModel, IToolbarItems, Link, MarkdownEditor, MarkdownFormatter, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import * as Marked from 'marked';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { updateSampleSection } from '../common/sample-base';
import './markdown-editor-custom-format.css';
function CustomFormat() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let rteObj: RichTextEditorComponent;
    // set the value to Rich Text Editor
    const template: string = `The sample is configured with customized markdown syntax using the __formatter__ property. Type the content and click the toolbar item to view customized markdown syntax. For unordered list, you need to add a plus sign before the word (e.g., + list1). Or To make a phrase bold, you need to add two underscores before and after the phrase (e.g., __this text is bold__).`;
    // Rich Text Editor items list
    const items: (string | IToolbarItems)[] = ['Bold', 'Italic', 'StrikeThrough', '|',
        'Formats', 'OrderedList', 'UnorderedList', '|',
        'CreateLink', 'Image', '|',
        {
            tooltipText: 'Preview',
            template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn">' +
                '<span class="e-btn-icon e-icons e-md-preview"></span></button>'
        }, 'Undo', 'Redo'];
    let textArea: HTMLTextAreaElement;
    let mdsource: HTMLElement;
    let mdPreview: HTMLElement;
    //Rich Text Editor ToolbarSettings
    const toolbarSettings: ToolbarSettingsModel = {
        items: items
    };
    const formatter = new MarkdownFormatter({
        listTags: { 'OL': '2. ', 'UL': '+ ' },
        formatTags: {
            'Blockquote': '> '
        },
        selectionTags: { 'Bold': '__', 'Italic': '_' }
    });
    function markdownConversion(): void {
        if (mdsource.classList.contains('e-active')) {
            let id: string = rteObj.getID() + 'html-view';
            let htmlPreview: HTMLElement = rteObj.element.querySelector('#' + id);
            htmlPreview.innerHTML = Marked((rteObj.contentModule.getEditPanel() as HTMLTextAreaElement).value);
        }
    }
    function fullPreview(): void {
        let id: string = rteObj.getID() + 'html-preview';
        let htmlPreview: HTMLElement = rteObj.element.querySelector('#' + id);
        if (mdsource.classList.contains('e-active')) {
            mdsource.classList.remove('e-active');
            mdsource.parentElement.title = 'Preview';
            rteObj.enableToolbarItem(rteObj.toolbarSettings.items as string[]);
            textArea.style.display = 'block';
            htmlPreview.style.display = 'none';
        } else {
            mdsource.classList.add('e-active');
            rteObj.disableToolbarItem(rteObj.toolbarSettings.items as string[]);
            if (!htmlPreview) {
                htmlPreview = createElement('div', { className: 'e-content e-pre-source' });
                htmlPreview.id = id;
                textArea.parentNode.appendChild(htmlPreview);
            }
            textArea.style.display = 'none';
            htmlPreview.style.display = 'block';
            htmlPreview.innerHTML = Marked((rteObj.contentModule.getEditPanel() as HTMLTextAreaElement).value);
            mdsource.parentElement.title = 'Code View';
        }
    }
    function rendereComplete(): void {
        mdPreview = document.getElementById('MD_Preview');
        textArea = rteObj.contentModule.getEditPanel() as HTMLTextAreaElement;
        textArea.addEventListener('keyup', (e: KeyboardEventArgs) => {
            markdownConversion();
        });
        mdsource = document.getElementById('preview-code');
        mdsource.addEventListener('click', (e: MouseEvent) => {
            fullPreview();
        });
    }
    return (
        <div className='control-pane'>
            <div className='control-section' id="rteCustomFormat">
                <div className="content-wrapper">
                    <RichTextEditorComponent id="markdownRTE"
                        ref={(richtexteditor) => { rteObj = richtexteditor }}
                        height='260px' editorMode='Markdown'
                        formatter={formatter}
                        valueTemplate={template} created={rendereComplete} toolbarSettings={toolbarSettings} >
                        <Inject services={[MarkdownEditor, Toolbar, Image, Link, QuickToolbar]} />
                    </RichTextEditorComponent>
                </div>
            </div>
            <div id="action-description">
                <p> This sample demonstrates how to customize tags of markdown formatting. Type or edit the text and apply the format to
                    view customized markdown syntax. For example, apply “+” to Unordered list. </p>
            </div>

            <div id="description">
                The Rich Text Editor allows you to customize the markdown syntax by overriding its default syntax. Configure the customized
                markdown syntax using the <code>formatter</code>property
                <p><b>Injecting Module</b></p>
                <p>Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject <code>Toolbar, Link, Image, MarkdownEditor, QuickToolbar</code> modules into the services.</p>
                <p>The third-party library <code>Marked</code> is used in this sample to convert markdown into HTML content.</p>
            </div>
        </div>
    );
}
export default CustomFormat;

