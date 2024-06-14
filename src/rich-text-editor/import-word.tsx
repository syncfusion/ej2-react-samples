/**
 * Rich Text Editor import-word sample
 */
import * as React from 'react';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { RichTextEditorComponent, Toolbar, Image, Inject, Link, HtmlEditor, Count, QuickToolbar, Table, PasteCleanup } from '@syncfusion/ej2-react-richtexteditor';
import { ToolbarSettingsModel } from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import './import-word.css';

export class ImportWord extends SampleBase<{}, {}> {
    private editor: RichTextEditorComponent;
    private uploadObj: UploaderComponent;
    private hostUrl: string = 'https://services.syncfusion.com/react/production/';
    private items: any = [
        'Undo', 'Redo', '|',
        {
            tooltipText: "Import from Word",
            template:
                `<button class="e-tbar-btn e-control e-btn e-lib e-icon-btn" tabindex="-1" id="custom_tbarbtn_1" style="width:100%">
          <span class="e-icons e-rte-import-doc e-btn-icon"></span></button>`,
            click: this.importContentFromWord.bind(this)
        }, '|',
        'Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
        'LowerCase', 'UpperCase', '|',
        'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList', '|',
        'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'FileManager', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
        '|', 'EmojiPicker', 'Print', '|',
        'SourceCode', 'FullScreen'];
    private rteValue: string = `<h2 style="text-align: center;">Invitation to Microsoft Webinar Meet-Up</h2><p>
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
    private insertImageSettings: any = {
        saveUrl: this.hostUrl + 'api/RichTextEditor/SaveFile',
        removeUrl: this.hostUrl + 'api/RichTextEditor/DeleteFile',
        path: this.hostUrl + 'RichTextEditor/'
    }
    private uploadAsyncSettings: any = {
        saveUrl: this.hostUrl + 'api/RichTextEditor/ImportFromWord',
    }
    private toolbarSettings: ToolbarSettingsModel = {
        items: this.items
    };
    private importContentFromWord(): void {
        this.uploadObj.element.click();
    }
    private onUploadSuccess(args: any): void {
        this.editor.executeCommand('insertHTML', args.e.currentTarget.response, { undo: true });
    }
    private actionCompleteHandler(e: any): void {
        if (e.requestType === 'SourceCode') {
            this.editor.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.add('e-overlay');
        } else if (e.requestType === 'Preview') {
            this.editor.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.remove('e-overlay');
        }
    }
    private quickToolbarOpenHandler(args: any): void {
        if (!isNullOrUndefined(args.targetElement) && args.targetElement.nodeName === 'IMG') {
            this.editor.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.add('e-overlay');
        }
    }
    private quickToolbarClosehandler(args: any): void {
        if (!isNullOrUndefined(args.element) && args.element.classList.contains('e-rte-image-popup')) {
            this.editor.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.remove('e-overlay');
        }
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section' id="rteTools">
                    <div className='rte-control-section'>
                        <RichTextEditorComponent id="toolsRTE" ref={(richtexteditor: RichTextEditorComponent) => { this.editor = richtexteditor }} toolbarSettings={this.toolbarSettings} actionComplete={this.actionCompleteHandler.bind(this)} beforeQuickToolbarOpen={this.quickToolbarOpenHandler.bind(this)} quickToolbarClose={this.quickToolbarClosehandler.bind(this)}
                            value={this.rteValue} enableXhtml={true} insertImageSettings={this.insertImageSettings}><Inject services={[Toolbar, Image, Link, HtmlEditor, Count, QuickToolbar, Table, PasteCleanup]} /></RichTextEditorComponent>
                        <UploaderComponent id='rteCustomWordUpload' name='UploadFiles' ref={(upload: UploaderComponent) => { this.uploadObj = upload; }} type='file' asyncSettings={this.uploadAsyncSettings} success={this.onUploadSuccess.bind(this)} allowedExtensions='.docx,.doc,.rtf'></UploaderComponent>
                    </div>
                </div>
            </div>
        );
    }
}