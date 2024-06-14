/**
 * Rich Text Editor import-word sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { RichTextEditorComponent, Toolbar, Image, Inject, Link, HtmlEditor, Count, QuickToolbar, Table, PasteCleanup } from '@syncfusion/ej2-react-richtexteditor';
import { ToolbarSettingsModel } from '@syncfusion/ej2-react-richtexteditor';
import { updateSampleSection } from '../common/sample-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import './import-word.css';

function ImportWord() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let editor: RichTextEditorComponent;
    let uploadObj: UploaderComponent;
    const hostUrl: string = 'https://services.syncfusion.com/react/production/';
    const items: any = [
        'Undo', 'Redo', '|',
        {
            tooltipText: "Import from Word",
            template:
                `<button class="e-tbar-btn e-control e-btn e-lib e-icon-btn" tabindex="-1" id="custom_tbarbtn_1" style="width:100%">
          <span class="e-icons e-rte-import-doc e-btn-icon"></span></button>`,
            click: importContentFromWord.bind(this)
        }, '|',
        'Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
        'LowerCase', 'UpperCase', '|',
        'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList', '|',
        'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'FileManager', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
        '|', 'EmojiPicker', 'Print', '|',
        'SourceCode', 'FullScreen'];

    const rteValue: string = `<h2 style="text-align: center;">Invitation to Microsoft Webinar Meet-Up</h2><p>
                    Dear Guest,
                </p><p>
                    We're thrilled to extend a special invitation to you for an exclusive Microsoft webinar meet-up, where we'll explore the latest innovations and insights driving the future of technology. As a valued member of our community, we believe this event will offer invaluable knowledge and networking opportunities.
                </p><h2>Event Details:</h2><table class="e-rte-table" style="width: 100%; height: 125px;">
                    <tbody>
                    <tr style="height: 20%;">
                        <th class="">Time:</th>
                        <td>10:00 AM - 12:00 PM</td>
                    </tr>
                    <tr style="height: 20%;">
                        <th>Duration:</th>
                        <td>2 hours</td>
                    </tr>
                    <tr style="height: 20%;">
                        <th>Platform:</th>
                        <td>Microsoft Teams</td>
                    </tr>
                </tbody></table><p><br></p><h2>Agenda:</h2><ul>
                    <li>Introduction to Cutting-Edge Microsoft Technologies</li>
                    <li>Deep Dive into AI in Business: Leveraging Microsoft Azure Solutions</li>
                    <li>Live Q&amp;A Session with Industry Experts</li>
                    <li>Networking Opportunities with Peers and Professionals</li>
                </ul><h2>Why Attend?</h2><ul>
                    <li>Gain insights into the latest trends and advancements in technology.</li>
                    <li>Interact with industry experts and expand your professional network.</li>
                    <li>Get your questions answered in real-time during the live Q&amp;A session.</li>
                    <li>Access exclusive resources and offers available only to webinar attendees.</li>
                </ul><p>
                    Feel free to invite your colleagues and peers who might benefit from this enriching experience. Simply forward this email to them or share the event details.
                </p><p>
                    We're looking forward to your participation and to exploring the exciting world of Microsoft technology together. Should you have any questions or require further information, please don't hesitate to contact us at <a href="mailto:webinar@company.com">webinar@company.com</a>.</p><p>
                <br></p><p>Warm regards,</p><p>John Doe<br>Event Coordinator<br>ABC Company</p>`;
    const insertImageSettings: any = {
        saveUrl: hostUrl + 'api/RichTextEditor/SaveFile',
        removeUrl: hostUrl + 'api/RichTextEditor/DeleteFile',
        path: hostUrl + 'RichTextEditor/'
    }
    const uploadAsyncSettings: any = {
        saveUrl: hostUrl + 'api/RichTextEditor/ImportFromWord',
    }
    const toolbarSettings: ToolbarSettingsModel = {
        items: items
    };
    function importContentFromWord(): void {
        uploadObj.element.click();
    }
    function onUploadSuccess(args: any): void {
        editor.executeCommand('insertHTML', args.e.currentTarget.response, { undo: true });
    }
    function actionCompleteHandler(e: any): void {
        if (e.requestType === 'SourceCode') {
            editor.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.add('e-overlay');
        } else if (e.requestType === 'Preview') {
            editor.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.remove('e-overlay');
        }
    }
    function quickToolbarOpenHandler(args: any): void {
        if (!isNullOrUndefined(args.targetElement) && args.targetElement.nodeName === 'IMG') {
            editor.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.add('e-overlay');
        }

    }
    function quickToolbarClosehandler(args: any): void {
        if (!isNullOrUndefined(args.element) && args.element.classList.contains('e-rte-image-popup')) {
            editor.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.remove('e-overlay');
        }

    }

    return (
        <div className='control-pane'>
            <div className='control-section' id="rteTools">
                <div className='rte-control-section'>
                    <RichTextEditorComponent id="toolsRTE" ref={(richtexteditor: RichTextEditorComponent) => { editor = richtexteditor }} toolbarSettings={toolbarSettings} actionComplete={actionCompleteHandler.bind(this)} beforeQuickToolbarOpen={quickToolbarOpenHandler.bind(this)} quickToolbarClose={quickToolbarClosehandler.bind(this)}
                        insertImageSettings={insertImageSettings} value={rteValue} enableXhtml={true}><Inject services={[Toolbar, Image, Link, HtmlEditor, Count, QuickToolbar, Table, PasteCleanup]} /></RichTextEditorComponent>
                    <UploaderComponent id='rteCustomWordUpload' name='UploadFiles' ref={(upload: UploaderComponent) => { uploadObj = upload; }} type='file' asyncSettings={uploadAsyncSettings} success={onUploadSuccess.bind(this)} allowedExtensions='.docx,.doc,.rtf'></UploaderComponent>
                </div>
            </div>
        </div>
    );
}
export default ImportWord;
