/**
 * Rich Text Editor overview sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { addClass, removeClass, Browser, getComponent } from '@syncfusion/ej2-base';
import { RichTextEditorComponent, Toolbar, Inject, Image, Link, HtmlEditor, Count, QuickToolbar, Table, EmojiPicker, Video, Audio, FormatPainter, PasteCleanup, ImportExport, SlashMenu, CodeBlock, ClipBoardCleanup, AutoFormat } from '@syncfusion/ej2-react-richtexteditor';
import { ToolbarSettingsModel, ActionBeginEventArgs, FileManager, FileManagerSettingsModel, QuickToolbarSettingsModel, SlashMenuSettingsModel, ImportWordModel, ExportWordModel, ExportPdfModel } from '@syncfusion/ej2-react-richtexteditor';
import { createElement } from '@syncfusion/ej2-base';
import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import * as CodeMirror from 'codemirror';
import { Editor as ICodeMirror } from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import './tools.css';
import { Sidebar } from '@syncfusion/ej2-navigations';

function Overview() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let editor: RichTextEditorComponent;
    let mention: MentionComponent;
    let codeMirror: ICodeMirror;

    const hostUrl: string = 'https://services.syncfusion.com/react/production/';

    // Rich Text Editor items list
    const items: any = [
        'Undo', 'Redo', '|', 'ImportWord', 'ExportWord', 'ExportPdf', '|',
        'Bold', 'Italic', 'Underline', 'StrikeThrough', 'InlineCode', '|', 'CreateLink', 'Image', 'CreateTable', 'CodeBlock',
        'HorizontalLine', 'Blockquote', '|', 'LineHeight', 'Formats', 'Alignments', '|', 'BulletFormatList', 'NumberFormatList', 'Checklist', '|', 'Outdent', 'Indent', '|',
        'FontColor', 'BackgroundColor', 'FontName', 'FontSize', '|', 'LowerCase', 'UpperCase', '|', 'SuperScript', 'SubScript', '|',
        'EmojiPicker', 'FileManager', 'Video', 'Audio', '|', 'FormatPainter', 'ClearFormat',
        '|', 'Print', 'FullScreen', '|', 'SourceCode']
        const rteValue: string = '<h2>Welcome to the Syncfusion<sup>®</sup> Rich Text Editor</h2> <p> The Rich Text Editor, a WYSIWYG (what you see is what you get) editor, is a user interface that allows you to create, edit, and format rich text content. You can try out a demo of this editor here. </p> <h3>Do you know the key features of the editor?</h3> <ul> <li> Basic features include headings, block quotes, numbered lists, bullet lists, and support to insert images, tables, audio, and video. </li> <li> Inline styles include <b>bold</b>, <em>italic</em>, <span style="text-decoration: underline">underline</span>, <span style="text-decoration: line-through">strikethrough</span>, <a class="e-rte-anchor" href="https://ej2.syncfusion.com/demos/#/material/rich-text-editor/tools.html" title="https://ej2.syncfusion.com/demos/#/material/rich-text-editor/tools.html" aria-label="Open in new window">hyperlinks</a>,<code>InlineCode</code>, 😀 and more. </li> <li> The toolbar has multi-row, expandable, and scrollable modes. The Editor supports an inline toolbar, a floating toolbar, and custom toolbar items. </li> <li> Integration with Syncfusion<sup>®</sup> Mention control lets users tag other users. To learn more, check out the <a class="e-rte-anchor" href="https://ej2.syncfusion.com/documentation/rich-text-editor/mention-integration" title="Mention Documentation" aria-label="Open in new window">documentation</a> and <a class="e-rte-anchor" href="https://ej2.syncfusion.com/demos/#/material/rich-text-editor/mention-integration.html" title="Mention Demos" aria-label="Open in new window">demos</a>. </li> <li><b>Paste from MS Word</b> - helps to reduce the effort while converting the Microsoft Word content to HTML format with format and styles. To learn more, check out the documentation <a class="e-rte-anchor" href="https://ej2.syncfusion.com/documentation/rich-text-editor/paste-cleanup" title="Paste from MS Word Documentation" aria-label="Open in new window">here</a>. </li> <li> Other features: placeholder text, character count, form validation, enter key configuration, resizable editor, IFrame rendering, tooltip, source code view, RTL mode, persistence, HTML Sanitizer, autosave, and <a class="e-rte-anchor" href="https://ej2.syncfusion.com/documentation/api/rich-text-editor/" title="Rich Text Editor API" aria-label="Open in new window">more</a>. </li> </ul> <h3>Auto Formatting – Write Faster, Format Smarter</h3> <p> Boost your productivity with Auto Formatting, a powerful feature that lets you style content instantly using simple, familiar Markdown-style shortcuts. No need to reach for the toolbar — just type and watch your content transform in real time. </p> <h4>Effortless Formatting Shortcuts</h4> <table class="e-rte-table"> <thead> <tr> <th>Action</th> <th>Shortcut</th> </tr> </thead> <tbody> <tr> <td>Bulleted List</td> <td> Start a line with <code>*</code> or <code>-</code> followed by a space </td> </tr> <tr> <td>Numbered List</td> <td> Start a line with <code>1.</code> or <code>i.</code> followed by a space </td> </tr> <tr> <td>Checklist / To-do</td> <td> Start a line with <code>[ ]</code> or <code>[x]</code> followed by a space </td> </tr> <tr> <td>Headings (H1 to H6)</td> <td> Use <code>#</code>, <code>##</code>, <code>###</code>, <code>####</code>, <code>#####</code>, or <code>######</code> followed by a space </td> </tr> <tr> <td>Block Quote</td> <td> Start a line with <code>></code> followed by a space </td> </tr> <tr> <td>Code Block</td> <td> Start a line with <code>```</code> followed by a space </td> </tr> <tr> <td>Horizontal Line</td> <td> Start a line with <code>---</code> followed by a space </td> </tr> <tr> <td>Bold Text</td> <td>Type <code>**text**</code> or <code>__text__</code></td> </tr> <tr> <td>Italic Text</td> <td>Type <code>*text*</code> or <code>_text_</code></td> </tr> <tr> <td>Inline Code</td> <td>Type <code>`text`</code></td> </tr> <tr> <td>Strikethrough</td> <td>Type <code>~~text~~</code></td> </tr> </tbody> </table> <h3>Elevating Your Content with Images</h3> <p> Images can be added to the editor by pasting or dragging into the editing area, using the toolbar to insert one as a URL, or uploading directly from the File Browser. Easily manage your images on the server by configuring the <a class="e-rte-anchor" href="https://ej2.syncfusion.com/documentation/api/rich-text-editor/#insertimagesettings" title="Insert Image Settings API" aria-label="Open in new window">insertImageSettings</a> to upload, save, or remove them. </p> <p> The Editor can integrate with the Syncfusion<sup>®</sup> Image Editor to crop, rotate, annotate, and apply filters to images. Check out the demos <a class="e-rte-anchor" href="https://ej2.syncfusion.com/demos/#/material/rich-text-editor/image-editor-integration.html" title="Image Editor Demo" aria-label="Open in new window">here</a>. </p> <p><img alt="Sky with sun" src="https://cdn.syncfusion.com/ej2/richtexteditor-resources/RTE-Overview.png" style="width: 440px" class="e-rte-image e-imginline"/></p> <blockquote> <p><em>Easily access Audio, Image, Link, Video, and Table operations through the quick toolbar by right-clicking on the corresponding element with your mouse.</em></p> </blockquote>';

    const emailData: { [key: string]: string; }[] = [
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


    const fileManagerSettings: FileManagerSettingsModel = {
        enable: true,
        path: '/Pictures/Food',
        ajaxSettings: {
            url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
            getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage',
            uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload',
            downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download'
        }
    }

    const quickToolbarSettings: QuickToolbarSettingsModel = {
        table: ['Tableheader', 'TableRemove', '|', 'TableRows', 'TableColumns', 'TableCell', '|', 'TableEditProperties', 'Styles', 'BackgroundColor', 'Alignments', 'TableCellVerticalAlign'],
        text: ['Formats', '|', 'Bold', 'Italic', 'Fontcolor', 'BackgroundColor', '|', 'CreateLink', 'Image', 'CreateTable', 'Blockquote', '|' , 'Unorderedlist', 'Orderedlist', 'Indent', 'Outdent'],
        showOnRightClick: true,
    }
    const insertImageSettings: any = {
        saveUrl: hostUrl + 'api/RichTextEditor/SaveFile',
        removeUrl: hostUrl + 'api/RichTextEditor/DeleteFile',
        path: hostUrl + 'RichTextEditor/'
    }

    //Rich Text Editor ToolbarSettings
    const toolbarSettings: ToolbarSettingsModel = {
        items: items
    };

    const slashMenuSettings: SlashMenuSettingsModel = {
        enable: true,
        items: ['Paragraph', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'OrderedList', 'UnorderedList',
            'CodeBlock', 'Blockquote', 'Link', 'Image', 'Video', 'Audio', 'Table', 'Emojipicker',
        ]
    };

    const importWord: ImportWordModel = {
        serviceUrl: hostUrl + 'api/RichTextEditor/ImportFromWord',
    };
    const exportWord: ExportWordModel = {
        serviceUrl: hostUrl + 'api/RichTextEditor/ExportToDocx',
        fileName: 'RichTextEditor.docx',
        stylesheet: `
        .e-rte-content {
            font-size: 1em;
            font-weight: 400;
            margin: 0;
        }
    `
    };
    const exportPdf: ExportPdfModel = {
        serviceUrl: hostUrl + 'api/RichTextEditor/ExportToPdf',
        fileName: 'RichTextEditor.pdf',
        stylesheet: `
        .e-rte-content{
            font-size: 1em;
            font-weight: 400;
            margin: 0;
        }
    `
    };

    function mirrorConversion(e?: any): void {
        const id: string = editor.getID() + 'mirror-view';
        const rteContainer: HTMLElement = editor.element.querySelector('.e-rte-container') as HTMLElement;
        let mirrorView: HTMLElement = editor.element.querySelector('#' + id) as HTMLElement;
        if (e.targetItem === 'Preview') {
            editor.value = codeMirror.getValue();
            editor.dataBind();
            rteContainer.classList.remove('e-rte-code-mirror-enabled');
            editor.focusIn();
        } else {
            rteContainer.classList.add('e-rte-code-mirror-enabled');
            rteContainer.classList.remove('e-source-code-enabled');
            const editorVlaue: string = (editor.element.querySelector('.e-rte-srctextarea') as HTMLTextAreaElement).value;
            if (!mirrorView) {
                mirrorView = createElement('div', { className: 'rte-code-mirror', id: id, styles: 'display: none;' });
                rteContainer.appendChild(mirrorView);
                renderCodeMirror(mirrorView, editorVlaue === null ? '' : editorVlaue);
            }
            else {
                codeMirror.setValue(editorVlaue);
            }
            codeMirror.focus();
        }
    }
    function renderCodeMirror(mirrorView: HTMLElement, content: string): void {
        codeMirror = CodeMirror(mirrorView, {
            value: content,
            lineNumbers: true,
            mode: 'text/html',
            lineWrapping: true,
        });
    }
    function actionCompleteHandler(e: any): void {
        if (e.targetItem && (e.targetItem === 'SourceCode' || e.targetItem === 'Preview')) {
            mirrorConversion(e);
        }
    }

    function actionBeginHandler(e: ActionBeginEventArgs): void {
        if (e.requestType === 'EnterAction' && mention && mention.element.classList.contains('e-popup-open')) {
            e.cancel = true;
        }
        if (e.requestType === 'Maximize' || e.requestType === 'Minimize') {
            handleFullScreen(e);
        }
    }

    function handleFullScreen(e: any): void {
        let sbCntEle: HTMLElement = document.querySelector('.sb-content.e-view') as HTMLElement;
        let sbHdrEle: HTMLElement = document.querySelector('.sb-header.e-view') as HTMLElement;
        const sideBarElem: HTMLElement = document.body.querySelector('#left-sidebar');
        const sideBar: Sidebar = getComponent(sideBarElem, 'sidebar');
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
            sideBar.hide();
            if (!Browser.isDevice) { transformElement.style.marginLeft = '0px'; }
            transformElement.style.transform = 'inherit';
        } else if (e.targetItem === 'Minimize') {
            if (Browser.isDevice && Browser.isIos) { removeClass([sbCntEle, sbHdrEle], ['hide-header']); }
            sideBar.show();
            if (!Browser.isDevice) {
                addClass([leftBar], ['e-open']);
                transformElement.style.marginLeft = leftBar.offsetWidth + 'px';
            }
            transformElement.style.transform = 'translateX(0px)';
        }
    }

    function itemTemplate(data: any): React.JSX.Element {
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

    function displayTemplate(data: any): React.JSX.Element {
        return (
            <a href={"mailto:" + data.email} title={data.email}>@{data.name}</a>
        );
    }
    return (
        <div className='control-pane'>
            <div className='control-section' id="rteTools">
                <div className='rte-control-section'>
                    <RichTextEditorComponent id="toolsRTE" ref={(richtexteditor: RichTextEditorComponent) => { editor = richtexteditor }}
                        value={rteValue} showCharCount={true} actionBegin={actionBeginHandler.bind(this)}
                        actionComplete={actionCompleteHandler.bind(this)} toolbarSettings={toolbarSettings}
                        fileManagerSettings={fileManagerSettings} quickToolbarSettings={quickToolbarSettings} enableTabKey={true}
                        insertImageSettings={insertImageSettings} enableXhtml={true} placeholder='Type something or use @ to tag a user...'
                        importWord={importWord} exportPdf={exportPdf} exportWord={exportWord} slashMenuSettings={slashMenuSettings}>
                        <Inject services={[Toolbar, Image, Link, HtmlEditor, Count, QuickToolbar, Table, FileManager, EmojiPicker, Video, Audio, FormatPainter, PasteCleanup, SlashMenu, ImportExport, CodeBlock, ClipBoardCleanup, AutoFormat]} />
                    </RichTextEditorComponent>
                    <MentionComponent id='editorMention' ref={(mention: MentionComponent) => { mention = mention }} dataSource={emailData} displayTemplate={displayTemplate} itemTemplate={itemTemplate} target="#toolsRTE_rte-edit-view" fields={{ text: 'name' }} popupWidth='250px' popupHeight='200px' sortOrder='Ascending' allowSpaces={true}></MentionComponent>
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
                    <li><code>Links</code> - A hyperlink can be inserted into the editor for quick access to related information.</li>
                    <li><code>Image</code> - Inserts and manages images.</li>
                    <li><code>Table</code> - Inserts and manages Tables.</li>
                    <li><code>Alignment</code> - Aligns the content with left, center, and right margins.</li>
                    <li><code>Line Height</code> - Adjusts the vertical spacing between lines of text.</li>
                    <li><code>Undo/Redo</code> - Allows undo/redo operations.</li>
                    <li><code>Indent/ Outdent</code> - Increases/decreases the indent level of the content.</li>
                    <li><code>Font</code> - Able to do styling on text like font family, size, fore color and background color.</li>
                    <li><code>Lower / Upper case</code> – Changes the casing of the selected text.</li>
                    <li><code>SubScript / SuperScript</code> - Makes the selected text as subscript (lower)/superscript(upper).</li>
                    <li><code>FullScreen</code> - Stretches the editor to the maximum width and height of the browser window.</li>
                    <li><code>Format</code> – Formats the sentence in different ways such as heading level, quotation, and code snippet</li>
                    <li><code>Styles</code> – Allows you to apply inline styles to the selected content like bold, italic, and more.</li>
                    <li><code>Insert Code</code> - Allows you to apply code format to the selected parent nodes. In the above sample, the style for the code format ('pre' tag) is applied by adding the background color.</li>
                    <li><code>Insert Emoticon</code> - Inserts the emoticon to the editor</li>
                    <li><code>Audio</code> - Inserts and manages audios.</li>
                    <li><code>Video</code> - Inserts and manages videos.</li>
                    <li><code>Format Painter</code> - The Format Painter feature allows you to copy the formats and apply them to content without formatting thus saving time to reformat the content.</li>
                    <li><code>Slash Menu</code> - The Slash Menu feature lets users apply formats, open dialogs by typing "/" in the
                        editor.</li>
                    <li><code>Import / Export</code> - The Import/Export feature enables users to import content from Word documents
                        into the editor and export the editor's content into Word and PDF files.</li>
                    <li><code>InlineCode</code> - Formats selected text as inline code, highlighting code snippets within the text.</li>
                    <li><code>Code Block</code> - The Code Block feature allows you to insert and display blocks of code with preserved formatting and syntax highlighting, making it ideal for sharing code snippets clearly and accurately.</li>
                    <li><code>HorizontalLine</code> - A horizontal line can be inserted into the editor to visually separate sections of content.</li>
                    <li><code>Checklist</code> - Creates interactive lists with checkable items that users can mark as complete or incomplete.</li>
                </ul>
                <p><b>Injecting Module</b></p>
                <p>Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject <code>Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, Table, EmojiPicker, Video, Audio, FormatPainter, PasteCleanup, SlashMenu, ImportExport, CodeBlock</code> modules into the services.</p>
            </div>
        </div>
    );
}
export default Overview;
