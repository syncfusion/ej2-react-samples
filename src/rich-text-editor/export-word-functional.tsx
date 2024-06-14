/**
 * Rich Text Editor export-word sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RichTextEditorComponent, Toolbar, Inject, Image, Link, HtmlEditor, Count, QuickToolbar, Table, PasteCleanup } from '@syncfusion/ej2-react-richtexteditor';
import { ToolbarSettingsModel, FileManager } from '@syncfusion/ej2-react-richtexteditor';
import { updateSampleSection } from '../common/sample-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import './export-word.css';
function ExportWord() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let editor: RichTextEditorComponent;

    const hostUrl: string = 'https://services.syncfusion.com/react/production/';

    // Rich Text Editor items list
    const items: any = [
        'Undo', 'Redo', '|',
        {
            tooltipText: "Export to Word",
            template:
                `<button class="e-tbar-btn e-control e-btn e-lib e-icon-btn" tabindex="-1" id="custom_tbarbtn_2" style="width:100%">
          <span class="e-icons e-rte-export-doc e-btn-icon"></span></button>`,
            click: exportContentToWord.bind(this)
        },
        {
            tooltipText: "Export to PDF",
            template:
                `<button class="e-tbar-btn e-control e-btn e-lib e-icon-btn" tabindex="-1" id="custom_tbarbtn_3" style="width:100%">
          <span class="e-icons e-rte-export-pdf e-btn-icon"></span></button>`,
            click: exportContentToPDF.bind(this)
        }, '|',
        'Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
        'LowerCase', 'UpperCase', '|',
        'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList', '|',
        'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'FileManager', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
        '|', 'EmojiPicker', 'Print', '|',
        'SourceCode', 'FullScreen']
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

    //Rich Text Editor ToolbarSettings
    const toolbarSettings: ToolbarSettingsModel = {
        items: items
    };
    function actionCompleteHandler(e: any): void {
        if (e.requestType === 'SourceCode') {
            editor.getToolbar().querySelector('#custom_tbarbtn_2').parentElement.classList.add('e-overlay');
            editor.getToolbar().querySelector('#custom_tbarbtn_3').parentElement.classList.add('e-overlay');
        } else if (e.requestType === 'Preview') {
            editor.getToolbar().querySelector('#custom_tbarbtn_2').parentElement.classList.remove('e-overlay');
            editor.getToolbar().querySelector('#custom_tbarbtn_3').parentElement.classList.remove('e-overlay');
        }
    }
    function quickToolbarOpenHandler(args: any): void {
        if (!isNullOrUndefined(args.targetElement) && args.targetElement.nodeName === 'IMG') {
            editor.getToolbar().querySelector('#custom_tbarbtn_2').parentElement.classList.add('e-overlay');
            editor.getToolbar().querySelector('#custom_tbarbtn_3').parentElement.classList.add('e-overlay');
        }

    }
    function quickToolbarClosehandler(args: any): void {
        if (!isNullOrUndefined(args.element) && args.element.classList.contains('e-rte-image-popup')) {
            editor.getToolbar().querySelector('#custom_tbarbtn_2').parentElement.classList.remove('e-overlay');
            editor.getToolbar().querySelector('#custom_tbarbtn_3').parentElement.classList.remove('e-overlay');
        }

    }

    function exportContentToWord(): void {
        const rteHtmlData = editor.getHtml();
        const html = `<html><head></head><body>${rteHtmlData}</body></html>`;
        fetch(hostUrl + 'api/RichTextEditor/ExportToDocx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ html: html }) // Wrap HTML in a JSON object
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const filename: string = 'Result.docx';
                // Create a Blob from the response and initiate the download
                return response.blob().then(blob => ({ blob, filename }));
            })
            .then(({ blob, filename }) => {
                const url = window.URL.createObjectURL(blob);       // Create a Blob URL from the response and initiate the download    
                const a = document.createElement('a');              // Create an anchor element
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);                       // Append the anchor element to the document
                a.click();                                          // Trigger a click on the anchor element to initiate the download
                document.body.removeChild(a);                       // Remove the anchor element from the document
                window.URL.revokeObjectURL(url);                    // Revoke the object URL to free up resources
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }
    function exportContentToPDF(): void {
        const rteHtmlData = editor.getHtml();
        const html = `<html><head></head><body>${rteHtmlData}</body></html>`;
        fetch(hostUrl + 'api/RichTextEditor/ExportToPdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ html: html }) // Wrap HTML in a JSON object
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.blob();
            })
            .then(blob => {
                const url: string = window.URL.createObjectURL(blob);       // Create a Blob URL from the response and initiate the download
                const a: HTMLAnchorElement = document.createElement('a');   // Create an anchor element
                a.href = url;
                a.download = 'Sample.pdf';
                document.body.appendChild(a);             // Append the anchor element to the document
                a.click();                                // Trigger a click on the anchor element to initiate the download
                document.body.removeChild(a);             // Remove the anchor element from the document
                window.URL.revokeObjectURL(url);          // Revoke the object URL to free up resources
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    return (
        <div className='control-pane'>
            <div className='control-section' id="rteTools">
                <div className='rte-control-section'>
                    <RichTextEditorComponent id="toolsRTE" ref={(richtexteditor: RichTextEditorComponent) => { editor = richtexteditor }} actionComplete={actionCompleteHandler.bind(this)} beforeQuickToolbarOpen={quickToolbarOpenHandler.bind(this)} quickToolbarClose={quickToolbarClosehandler.bind(this)}
                        value={rteValue} toolbarSettings={toolbarSettings} enableXhtml={true} insertImageSettings={insertImageSettings}>
                        <Inject services={[Toolbar, Image, Link, HtmlEditor, Count, QuickToolbar, Table, PasteCleanup]} />
                    </RichTextEditorComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This example illustrates how to efficiently export content in the Rich Text Editor. You can seamlessly convert your content into a PDF or Word document.</p>
            </div>

            <div id="description">
                <p>In this demo, the Rich Text Editor content can be exported using the service side,</p>
                <ol>
                    <li>Clicking the export to PDF icon will export the content of the Rich Text Editor to a PDF document.</li>
                    <li>Clicking the export to Word icon will export the content of the Rich Text Editor to a Word document.</li>
                </ol>
            </div>
        </div>
    );
}
export default ExportWord;