/**
 * Rich Text Editor Auto Save sample
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RichTextEditorComponent, HtmlEditor, Inject, Toolbar, Image, Link, QuickToolbar, ToolbarSettingsModel, PasteCleanup, Table, Video, Audio } from '@syncfusion/ej2-react-richtexteditor';
import { updateSampleSection } from '../common/sample-base';
import './auto-save.css';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import {isNullOrUndefined } from '@syncfusion/ej2-base';
import { PropertyPane } from '../common/property-pane';
function AutoSave() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let savingEle: HTMLDivElement;
    let savingRef: React.Ref<HTMLDivElement> = (element) => {
        savingEle = element;
    };
    let savedELe: HTMLDivElement;
    let savedRef: React.Ref<HTMLDivElement> = (element) => {
        savedELe = element;
    };
    let rteObj: RichTextEditorComponent;
    let switchObj: SwitchComponent;
    // Rich Text Editor items list
    const items: string[] = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'Blockquote',
        'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'Undo', 'Redo'];
    //Rich Text Editor ToolbarSettings
    const toolbarSettings: ToolbarSettingsModel = {
        items: items
    };
    function updateStatus() {
        savingEle.style.display = 'block';
        savedELe.style.display = 'none';
        setTimeout(() => {
            if (!isNullOrUndefined(savingEle) && !isNullOrUndefined(savedELe)) {
                savingEle.style.display = 'none';
                savedELe.style.display = 'block';
            }
        }, 500);
    }
    function onChange(e) {
        if (e.checked) {
            rteObj.saveInterval = 5000;
        } else {
            rteObj.saveInterval = 0;
            setTimeout(() => {
                savingEle.style.display = 'none';
                savedELe.style.display = 'none';
            }, 500);

        }
    }
    return (
        <div className='control-pane'>
            <div className='col-lg-8'>
                <div className='control-section' id="rteAPI">
                    <div className='rte-control-section'>
                        <RichTextEditorComponent id="autoSaveRTE" ref={(richtexteditor) => { rteObj = richtexteditor }}
                            enablePersistence={true} placeholder={'Start to type a content to save'} saveInterval={5000} toolbarSettings={toolbarSettings} change={updateStatus.bind(this)} >
                            <h2>Welcome to the Rich Text Editor Demo!📝</h2>
                                <p style={{ textAlign: 'start' }}>Experience the power of modern content editing with advanced formatting, media embedding, and many other features. You can explore this demo for yourself.</p>
                                <h5>Explore the Possibilities! 🚀</h5>
                                <ul>
                                    <li><b>Highly customizable</b> - You can configure the toolbar, enable/disable features, and fine-tune the editing experience to match your needs.</li>
                                    <li><b>Seamless content pasting</b> - Copy and paste from Microsoft Word, Outlook, or other editors or sources while preserving formatting, styles, and structure.</li>
                                    <li><b>Import Word documents</b> - Convert <b>DOCX</b><b> files</b> into editable HTML content inside the editor using the Import from Word feature.</li>
                                    <li><b>One-click Export</b> - Save your document as <b>PDF</b> 📄 or <b>Word (DOCX)</b> 📝 with just a single click.</li>
                                    <li><b>@Mentions</b> - Type <span className="e-mention-chip"><a href="mailto:albert@gmail.com" title="albert@gmail.com">@Albert</a></span> to see available suggestions and tag users in your content.</li>
                                    <li><b>Image Management</b> - Use the File Manager to browse, upload, and manage images within the editor.</li>
                                </ul>
                                <p><br /></p>
                                <h5>Powerful Features!</h5>
                                <p>A quick overview of the essential features of the Rich Text Editor.<br /></p>
                                <table className="e-rte-table" style={{ width: '61.0405%', minWidth: '0px', height: '82px' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '29.9807%' }}>Feature<br /></th>
                                            <th style={{ width: '70.0193%' }}>Description<br /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '29.981%' }}>Text Formatting<br /></td>
                                            <td style={{ width: '70.0193%' }}>Bold, Italic, Underline, Strikethrough, and more.<br /></td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '29.9807%' }}>Lists &amp; Indentation<br /></td>
                                            <td style={{ width: '70.019%' }}>Ordered, unordered, nested lists.<br /></td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '29.9807%' }}>Tables<br /></td>
                                            <td style={{ width: '70.019%' }}>Insert and edit tables with styling.<br /></td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '29.9807%' }}>Media Embedding<br /></td>
                                            <td style={{ width: '70.019%' }}>Images, videos, and iframes.<br /></td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '29.9807%' }}>Mentions<br /></td>
                                            <td style={{ width: '70.019%' }}>Tag users and add comments<br /></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p><br /></p>
                                <h5>Effortless Image Handling!</h5>
                                <p>Insert, resize, align, and manage images seamlessly within the editor.<br /></p>
                                <p style={{ textAlign: 'center' }}>
                                    <img alt="Sky with sun" src="https://cdn.syncfusion.com/ej2/richtexteditor-resources/RTE-Overview.png" width="400" height="200" className="e-rte-image e-imgcenter" />
                                </p>
                                <p><br /></p>
                                <p style={{ textAlign: 'center' }}><b>"Great writing begins with a great editor."</b><b> ✍️</b> <br /></p>
                            <Inject services={[Link, Image, HtmlEditor, Toolbar, QuickToolbar, PasteCleanup, Table, Video, Audio]} />
                        </RichTextEditorComponent>
                        <div id='statusEle' className='current-status'>
                            <div id='saving' ref={savingRef} style={{ display: 'none' }}>
                                <div className="e-icons e-icon-refresh"> </div>
                                <p className='status-text'> Saving changes</p>
                            </div>
                            <div id='saved' ref={savedRef} style={{ display: 'none' }}>
                                <span className="e-icons e-icon-tick"> </span>
                                <p className='status-text'>Changes saved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-lg-4 property-section' id="rteAPIProperty">
                <PropertyPane title='Properties'>
                    <label htmlFor="checked" style={{ padding: "10px 72px 10px 0" }}> Auto Save </label>
                    <SwitchComponent id="checked" ref={(scope) => { switchObj = scope }} change={onChange.bind(this)} checked={true} ></SwitchComponent>
                </PropertyPane>

            </div>
            <div id="action-description">
                <p>Demonstrates how to save the Rich Text Editor’s content automatically with periodic interval. When you type or
                    edit the content, it will be saved automatically by every 5 seconds. </p>
            </div>

            <div id="description">
                <p>The Rich Text Editor provides options to save its content automatically using the ‘saveInterval’ property. By
                    default, the save interval time has 10 seconds from built-in support, but it can be customizable as per the
                    application needs. The interval is calculated based on editing the content and does not considered on idle
                    state.</p>
                <p>We have configured save interval as 5 seconds in this example. You can save the content in server also using this
                    ‘auto save’ option.</p>
                <p>When you disable this 'Auto Save' option in a sample, the value will be saved on focus-out from the editor.</p>
                <p>Rich Text Editor content will be automatically saved when you focus out the editor.</p>
            </div>
        </div>

    );
}
export default AutoSave;
