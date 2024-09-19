/**
 * Rich Text Editor import-word sample
 */
import * as React from 'react';
import { RichTextEditorComponent, Toolbar, Inject, Image, Link, HtmlEditor, QuickToolbar, Table, PasteCleanup, ImportExport } from '@syncfusion/ej2-react-richtexteditor';
import { ToolbarSettingsModel, ImportWordModel } from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';

export class ImportWord extends SampleBase<{}, {}> {
    private hostUrl: string = 'https://services.syncfusion.com/react/production/';
    private items: any = [
        'Undo', 'Redo', '|', 'ImportWord', '|',
        'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
        'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList',
        '|', 'CreateLink', 'Image', 'CreateTable', '|', 'ClearFormat', 'SourceCode']

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
    private toolbarSettings: ToolbarSettingsModel = {
        items: this.items
    };
    private importWord: ImportWordModel = {
        serviceUrl: this.hostUrl + 'api/RichTextEditor/ImportFromWord',
    };
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section' id="rteTools">
                    <div className='rte-control-section'>
                        <RichTextEditorComponent id="importDocument" importWord={this.importWord} toolbarSettings={this.toolbarSettings} insertImageSettings={this.insertImageSettings} value={this.rteValue} enableXhtml={true}>
                            <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table, PasteCleanup, ImportExport]} />
                        </RichTextEditorComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>This example illustrates how to use the import/export feature of the Rich Text Editor to convert the editor
                        content into a PDF or Word document.</p>
                </div>

                <div id="description">
                    <p>This sample demonstrates the <code>Import/Export</code> feature of the Rich Text Editor, which allows users to
                        import the Word document into the editor. The word document can be imported as Rich Text Editor content by clicking the
                        import to Word icon, browsing for the document, and uploading it to the server, where it is converted to HTML
                        and then sent to the Rich Text Editor as its value.</p>
                    <p><b>Injecting Module</b></p>
                    <p>Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject <code>HtmlEditor, Toolbar, Link, Image, Count, QuickToolbar, Table, PasteCleanup, ImportExport</code> modules into the services.</p>
                </div>
            </div>
        );
    }
}