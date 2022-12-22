/**
 * Rich Text Editor markdown preview sample
 */
import { addClass, Browser, createElement, isNullOrUndefined, KeyboardEventArgs, removeClass } from '@syncfusion/ej2-base';
import { Image, Inject, IToolbarItems, Link, MarkdownEditor, QuickToolbar, RichTextEditor, RichTextEditorComponent, Table, Toolbar, ToolbarSettingsModel, ActionCompleteEventArgs } from '@syncfusion/ej2-react-richtexteditor';
import * as Marked from 'marked';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { updateSampleSection } from '../common/sample-base';
import './markdown-editor-preview.css';
function Preview() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let rteObj: RichTextEditorComponent;
    // set the value to Rich Text Editor
    const value: string = `In Rich Text Editor , you click the toolbar buttons to format the words and the changes are visible immediately. 
  Markdown is not like that. When you format the word in Markdown format, you need to add Markdown syntax to the word to indicate which words 
  and phrases should look different from each other
      
  Rich Text Editor supports markdown editing when the editorMode set as **markdown** and using both *keyboard interaction* and *toolbar action*, you can apply the formatting to text.
      
  We can add our own custom formation syntax for the Markdown formation, [sample link](https://ej2.syncfusion.com/home/).
      
  The third-party library <b>Marked</b> is used in this sample to convert markdown into HTML content`;
    // Rich Text Editor items list
    const items: (string | IToolbarItems)[] = ['Bold', 'Italic', 'StrikeThrough', '|', 'Formats', 'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', 'CreateTable', '|',
        {
            tooltipText: 'Preview', template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn">' +
                '<span class="e-btn-icon e-md-preview e-icons"></span></button>'
        },
        {
            tooltipText: 'Split Editor', template: '<button id="MD_Preview" class="e-tbar-btn e-control e-btn e-icon-btn">' +
                '<span class="e-btn-icon e-view-side e-icons"></span></button>'
        }, 'FullScreen', '|', 'Undo', 'Redo'];
    let textArea: HTMLTextAreaElement;
    let mdsource: HTMLElement;
    let mdSplit: HTMLElement;
    let htmlPreview: HTMLElement;
    //Rich Text Editor ToolbarSettings
    const toolbarSettings: ToolbarSettingsModel = {
        items: items
    };
    function markdownConversion(): void {
        if (mdSplit.classList.contains('e-active')) {
            let id: string = rteObj.getID() + 'html-view';
            let htmlPreview: HTMLElement = rteObj.element.querySelector('#' + id);
            htmlPreview.innerHTML = Marked((rteObj.contentModule.getEditPanel() as HTMLTextAreaElement).value);
        }
    }
    function fullPreview(e: { [key: string]: string | boolean }): void {
        let id: string = rteObj.getID() + 'html-preview';
        htmlPreview = rteObj.element.querySelector('#' + id);
        if ((mdsource.classList.contains('e-active') || mdSplit.classList.contains('e-active')) && e.mode) {
            mdsource.classList.remove('e-active');
            mdSplit.classList.remove('e-active');
            mdsource.parentElement.title = 'Preview';
            textArea.style.display = 'block';
            textArea.style.width = '100%';
            htmlPreview.style.display = 'none';
        } else {
            mdsource.classList.add('e-active');
            mdSplit.classList.add('e-active');
            if (!htmlPreview) {
                htmlPreview = createElement('div', { className: 'e-content' });
                htmlPreview.id = id;
                textArea.parentNode.appendChild(htmlPreview);
            }
            if (e.type === 'preview') {
                textArea.style.display = 'none'; htmlPreview.classList.add('e-pre-source');
            } else {
                htmlPreview.classList.remove('e-pre-source');
                textArea.style.width = '50%';
            }
            htmlPreview.style.display = 'block';
            htmlPreview.innerHTML = Marked((rteObj.contentModule.getEditPanel() as HTMLTextAreaElement).value);
            mdsource.parentElement.title = 'Code View';
        }
    }
    function rendereComplete(): void {
        textArea = rteObj.contentModule.getEditPanel() as HTMLTextAreaElement;
        textArea.addEventListener('keyup', (e: KeyboardEventArgs) => { markdownConversion(); });
        mdsource = document.getElementById('preview-code');
        mdsource.addEventListener('click', (e: MouseEvent) => {
            fullPreview({ mode: true, type: 'preview' });
            if ((e.currentTarget as HTMLElement).classList.contains('e-active')) {
                rteObj.disableToolbarItem(['Bold', 'Italic', 'StrikeThrough', '|',
                    'Formats', 'OrderedList', 'UnorderedList', '|',
                    'CreateLink', 'Image', 'CreateTable', 'Undo', 'Redo']);
                (e.currentTarget as HTMLElement).parentElement.nextElementSibling.classList.add('e-overlay');
            } else {
                rteObj.enableToolbarItem(['Bold', 'Italic', 'StrikeThrough', '|',
                    'Formats', 'OrderedList', 'UnorderedList', '|',
                    'CreateLink', 'Image', 'CreateTable', 'Undo', 'Redo']);
                (e.currentTarget as HTMLElement).parentElement.nextElementSibling.classList.remove('e-overlay');
            }
        });
        mdSplit = document.getElementById('MD_Preview');
        mdSplit.addEventListener('click', (e: MouseEvent) => {
            if (rteObj.element.classList.contains('e-rte-full-screen')) { fullPreview({ mode: true, type: '' }); }
            mdsource.classList.remove('e-active');
            if (!rteObj.element.classList.contains('e-rte-full-screen')) {
                rteObj.showFullScreen();
            }
        });
    }
    function actionComplete(e: any): void {
        if (e.targetItem === 'Maximize' && isNullOrUndefined(e.args)) {
            fullPreview({ mode: true, type: '' })
        }
        else if (!mdSplit.parentElement.classList.contains('e-overlay')) {
            if (e.targetItem === 'Minimize') {
                textArea.style.display = 'block';
                textArea.style.width = '100%';
                if (htmlPreview) {
                    htmlPreview.style.display = 'none';
                }
                mdSplit.classList.remove('e-active');
                mdsource.classList.remove('e-active');
            }
            markdownConversion();
        }
        rteObj.toolbarModule.refreshToolbarOverflow();
    }
    function handleFullScreen(e: any): void {
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
            addClass([leftBar], ['e-close']); removeClass([leftBar], ['e-open']);
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
    return (
        <div className='control-pane'>
            <div className='control-section' id="rtePreview">
                <div className="content-wrapper">
                    <RichTextEditorComponent id="markdownPreview"
                        actionBegin={handleFullScreen.bind(this)}
                        actionComplete={actionComplete.bind(this)}
                        created={rendereComplete}
                        editorMode='Markdown' height='300px'
                        ref={(richtexteditor) => { rteObj = richtexteditor }}
                        value={value} toolbarSettings={toolbarSettings} >
                        <Inject services={[MarkdownEditor, Toolbar, Image, Link, QuickToolbar, Table]} />
                    </RichTextEditorComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates how to preview markdown changes in Rich Text Editor.
                    Type or edit the display text, and apply format to view the preview of markdown.
                    You can preview the markdown changes immediately in the preview area.</p>
            </div>
            <div id="description">
                <p>The Rich Text Editor allows you to preview markdown changes immediately using <code>preview</code>.
                    The third-party library <code>Marked</code> is used in this sample to convert markdown into HTML content.</p>
            </div>
        </div>
    );
}
export default Preview;

