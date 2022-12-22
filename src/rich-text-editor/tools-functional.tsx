/**
 * Rich Text Editor overview sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { RichTextEditorComponent, Toolbar, Inject, Image, Link, HtmlEditor, Count, QuickToolbar, Table } from '@syncfusion/ej2-react-richtexteditor';
import { ToolbarSettingsModel, FileManager, FileManagerSettingsModel, QuickToolbarSettingsModel } from '@syncfusion/ej2-react-richtexteditor';
import { createElement } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import './tools.css';
function Overview() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let rteObj: RichTextEditorComponent;
    const hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';

    // Rich Text Editor items list
    const items: string[] = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
        'LowerCase', 'UpperCase', '|',
        'Formats', 'Alignments', 'NumberFormatList', 'BulletFormatList',
        'Outdent', 'Indent', 'SuperScript', 'SubScript', '|',
        'CreateTable', 'CreateLink', 'Image', 'FileManager', '|', 'ClearFormat', 'Print',
        'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'
    ];
    const fileManagerSettings: FileManagerSettingsModel = {
        enable: true,
        path: '/Pictures/Food',
        ajaxSettings: {
            url: hostUrl + 'api/FileManager/FileOperations',
            getImageUrl: hostUrl + 'api/FileManager/GetImage',
            uploadUrl: hostUrl + 'api/FileManager/Upload',
            downloadUrl: hostUrl + 'api/FileManager/Download'
        }
    }
    const quickToolbarSettings: QuickToolbarSettingsModel = {
        table: ['TableHeader', 'TableRows', 'TableColumns', 'TableCell', '-', 'BackgroundColor', 'TableRemove', 'TableCellVerticalAlign', 'Styles']
    }
    //Rich Text Editor ToolbarSettings
    const toolbarSettings: ToolbarSettingsModel = {
        items: items
    };
    let textArea: HTMLTextAreaElement;
    let myCodeMirror;
    function mirrorConversion(e?: any): void {
        const textArea = rteObj.contentModule.getEditPanel() as HTMLTextAreaElement;
        let id: string = (rteObj as any).getID() + 'mirror-view';
        let mirrorView: HTMLElement = rteObj.element.querySelector('#' + id) as HTMLElement;
        let charCount: HTMLElement = rteObj.element.querySelector('.e-rte-character-count') as HTMLElement;
        if (e.targetItem === 'Preview') {
            textArea.style.display = 'block';
            mirrorView.style.display = 'none';
            textArea.innerHTML = myCodeMirror.getValue();
            charCount.style.display = 'block';
        } else {
            if (!mirrorView) {
                mirrorView = createElement('div', { className: 'e-content' });
                mirrorView.id = id;
                textArea.parentNode.appendChild(mirrorView);
            } else {
                mirrorView.innerHTML = '';
            }
            textArea.style.display = 'none';
            mirrorView.style.display = 'block';
            renderCodeMirror(mirrorView, (rteObj as any).value);
            charCount.style.display = 'none';
        }
    }
    function renderCodeMirror(mirrorView: HTMLElement, content: string): void {
        const myCodeMirror = CodeMirror(mirrorView, {
            value: content,
            lineNumbers: true,
            mode: 'text/html',
            lineWrapping: true,

        });
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
    function actionCompleteHandler(e: any): void {
        if (e.targetItem && (e.targetItem === 'SourceCode' || e.targetItem === 'Preview')) {
            (rteObj.sourceCodeModule.getPanel() as HTMLTextAreaElement).style.display = 'none';
            mirrorConversion(e);
        } else {
            setTimeout(() => { (rteObj as any).toolbarModule.refreshToolbarOverflow(); }, 1000);
        }
    }
    return (
        <div className='control-pane'>
            <div className='control-section' id="rteTools">
                <div className='rte-control-section'>
                    <RichTextEditorComponent id="toolsRTE" ref={(richtexteditor) => { rteObj = richtexteditor }}
                        showCharCount={true} actionBegin={handleFullScreen.bind(this)}
                        actionComplete={actionCompleteHandler.bind(this)} toolbarSettings={toolbarSettings}
                        fileManagerSettings={fileManagerSettings} quickToolbarSettings={quickToolbarSettings}>
                        <div>
                            <p>The Rich Text Editor is a WYSIWYG ("what you see is what you get") editor useful to create and edit content, and return the valid <a href='https://ej2.syncfusion.com/home/' target='_blank'>HTML markup</a> or <a href='https://ej2.syncfusion.com/home/' target='_blank'>markdown</a> of the content</p> <p><b>Toolbar</b></p><ol><li> <p>The Toolbar contains commands to align the text, insert a link, insert an image, insert list, undo/redo operations, HTML view, etc </p></li><li><p>The Toolbar is fully customizable </p></li></ol> <p><b>Links</b></p><ol><li><p>You can insert a hyperlink with its corresponding dialog </p></li><li><p>Attach a hyperlink to the displayed text. </p></li><li><p>Customize the quick toolbar based on the hyperlink </p> </li></ol><p><b>Image.</b></p><ol><li><p>Allows you to insert images from an online source as well as the local computer </p> </li><li><p>You can upload an image</p></li><li><p>Provides an option to customize the quick toolbar for an image </p></li></ol><img alt="Logo" src="./src/rich-text-editor/images/RTEImage-Feather.png" style={{ width: '300px' }} />
                        </div>
                        <Inject services={[Toolbar, Image, Link, HtmlEditor, Count, QuickToolbar, Table, FileManager]} />
                    </RichTextEditorComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the full features of Rich Text Editor that includes all the tools and functionalities.</p>
            </div>

            <div id="description">
                <p>This sample used <code>Code mirror</code> plugins helps to highlight the HTML content and when changes happens in code view, the same has been reflected in preview mode. </p>
                <p>The editor’s toolbar contains commands to format the content. The toolbar consists of:</p>
                <ul>
                    <li><code>Lists</code> - NumberFormat list and BulletFormat list types.</li>
                    <li><code>Links</code> - A hyperlink can be inserted into the editor for quick access to related information.</li>
                    <li><code>Image</code> - Inserts and manages images.</li>
                    <li><code>Table</code> - Inserts and manages Tables.</li>
                    <li><code>Alignment</code> - Aligns the content with left, center, and right margins.</li>
                    <li><code>Undo/Redo</code> - Allows undo/redo operations.</li>
                    <li><code>Indent/ Outdent</code> - Increases/decreases the indent level of the content.</li>
                    <li><code>Font</code> - Able to do styling on text like font family, size, fore color and background color.</li>
                    <li><code>Lower / Upper case</code> – Changes the casing of the selected text.</li>
                    <li><code>SubScript / SuperScript</code> - Makes the selected text as subscript (lower)/superscript(upper).</li>
                    <li><code>FullScreen</code> - Stretches the editor to the maximum width and height of the browser window.</li>
                    <li><code>Format</code> – Formats the sentence in different ways such as heading level, quotation, and code snippet</li>
                    <li><code>Styles</code> – Allows you to apply inline styles to the selected content like bold, italic, and more.</li>
                    <li><code>Insert Code</code> - Allows you to apply code format to the selected parent nodes. In the above sample, the style for the code format ('pre' tag) is applied by adding the background color.</li>
                </ul>
                <p><b>Injecting Module</b></p>
                <p>Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject <code>Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, Table</code> modules into the services.</p>
            </div>
        </div>
    );
}
export default Overview;