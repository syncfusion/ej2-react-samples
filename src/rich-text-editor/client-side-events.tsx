/**
 * RichTextEditor events sample
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { RichTextEditorComponent, HtmlEditor, Table, Inject, Toolbar, Link, Image, QuickToolbar } from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';
import { ActionBeginEventArgs, ActionCompleteEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-richtexteditor';
import { PropertyPane } from '../common/property-pane';
import './rte-events.css';

export class RTEEvents extends SampleBase<{}, {}> {

    private rteObj: RichTextEditorComponent;
    private clear: ButtonComponent;
    private EventLogEle: HTMLSpanElement;
    private EventLogRef: React.Ref<HTMLSpanElement>;

    constructor(props) {
        super(props);
        this.EventLogRef = element => {
            this.EventLogEle = element;
        };
    }

    // RichTextEditor items list
    private items: string[] = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
        'LowerCase', 'UpperCase', '|',
        'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
        'Outdent', 'Indent', '|', 'CreateTable',
        'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
        'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'];

    //RichTextEditor ToolbarSettings
    private toolbarSettings: ToolbarSettingsModel = {
        items: this.items
    };

    public ClearClick(): void {
        this.EventLogEle.innerHTML = '';
    }
    private create(): void {
        this.appendElement('RichTextEditor <b>create</b> event called<hr>');
    }
    private actionBegin(args: ActionBeginEventArgs): void {
        this.appendElement('<b>' + args.requestType + '</b> action is called<hr>');
        this.handleFullScreen(args);
    }
    private actionComplete(args: ActionCompleteEventArgs): void {
        this.appendElement('<b>' + args.requestType + '</b> action is completed<hr>');
        this.actionCompleteHandler();
    }
    private focus(): void {
        this.appendElement('RichTextEditor <b>focus</b> event called<hr>');
    }
    private blur(): void {
        this.appendElement('RichTextEditor <b>blur</b> event called<hr>');
    }
    private change(): void {
        this.appendElement('RichTextEditor <b>change</b> event called<hr>');
    }
    private toolbarClick(): void {
        this.appendElement('RichTextEditor <b>toolbar click</b> event called<hr>');
    }
    private beforeDialogOpen(): void {
        this.appendElement('RichTextEditor <b>beforeDialogOpen</b> event called<hr>');
    }

    private dialogOpen(): void {
        this.appendElement('RichTextEditor <b>dialogOpen</b> event called<hr>');
    }

    private dialogClose(): void {
        this.appendElement('RichTextEditor <b>dialogClose</b> event called<hr>');
    }

    private beforeQuickToolbarOpen(): void {
        this.appendElement('RichTextEditor <b>beforeQuickToolbarOpen</b> event called<hr>');
    }

    private quickToolbarOpen(): void {
        this.appendElement('RichTextEditor <b>quickToolbarOpen</b> event called<hr>');
    }

    private quickToolbarClose(): void {
        this.appendElement('RichTextEditor <b>quickToolbarClose</b> event called<hr>');
    }

    private imageSelected(): void {
        this.appendElement('RichTextEditor <b>imageSelected</b> event called<hr>');
    }

    private imageUploading(): void {
        this.appendElement('RichTextEditor <b>imageUploading</b> event called<hr>');
    }

    private imageUploadSuccess(): void {
        this.appendElement('RichTextEditor <b>imageUploadSuccess</b> event called<hr>');
    }

    private imageUploadFailed(): void {
        this.appendElement('RichTextEditor <b>imageUploadFailed</b> event called<hr>');
    }

    private imageRemoving(): void {
        this.appendElement('RichTextEditor <b>imageRemoving</b> event called<hr>');
    }

    private destroyed(): void {
        this.appendElement('RichTextEditor <b>destroyed</b> event called<hr>');
    }

    private beforeSanitizeHtml(): void {
        this.appendElement('RichTextEditor <b>beforeSanitizeHtml</b> event called<hr>');
    }

    private resizing(): void {
        this.appendElement('RichTextEditor <b>resizing</b> event called<hr>');
    }

    private resizeStart(): void {
        this.appendElement('RichTextEditor <b>resizeStart</b> event called<hr>');
    }

    private resizeStop(): void {
        this.appendElement('RichTextEditor <b>resizeStop</b> event called<hr>');
    }
    private appendElement(html: string): void {
        let span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        this.EventLogEle.insertBefore(span, this.EventLogEle.firstChild);
    }
    public handleFullScreen(e: any): void {
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
    public actionCompleteHandler(): void {
        setTimeout(() => {
            this.rteObj.toolbarModule.refreshToolbarOverflow();
        }, 400);
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='col-lg-8 control-section' id='rteEvent'>
                    <div className='rte-control-section'>
                        <RichTextEditorComponent id="clientsideRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor }}
                            toolbarSettings={this.toolbarSettings}
                            created={this.create.bind(this)}
                            actionBegin={this.actionBegin.bind(this)}
                            actionComplete={this.actionComplete.bind(this)}
                            focus={this.focus.bind(this)}
                            blur={this.blur.bind(this)}
                            change={this.change.bind(this)}
                            toolbarClick={this.toolbarClick.bind(this)}
                            beforeDialogOpen={this.beforeDialogOpen.bind(this)}
                            dialogOpen={this.dialogOpen.bind(this)}
                            dialogClose={this.dialogClose.bind(this)}
                            beforeQuickToolbarOpen={this.beforeQuickToolbarOpen.bind(this)}
                            quickToolbarOpen={this.quickToolbarOpen.bind(this)}
                            quickToolbarClose={this.quickToolbarClose.bind(this)}
                            imageSelected={this.imageSelected.bind(this)}
                            imageUploading={this.imageUploading.bind(this)}
                            imageUploadSuccess={this.imageUploadSuccess.bind(this)}
                            imageUploadFailed={this.imageUploadFailed.bind(this)}
                            imageRemoving={this.imageRemoving.bind(this)}
                            destroyed={this.destroyed.bind(this)}
                            beforeSanitizeHtml={this.beforeSanitizeHtml.bind(this)}
                            resizing={this.resizing.bind(this)}
                            resizeStart={this.resizeStart.bind(this)}
                            resizeStop={this.resizeStop.bind(this)}>
                            <p>The rich text editor component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content.
  Users can format their content using standard toolbar commands.</p>
                            <p><b>Key features:</b></p>
                            <ul>
                                <li>
                                    <p>Provides &lt;IFRAME&gt; and &lt;DIV&gt; modes</p>
                                </li>
                                <li>
                                    <p>Capable of handling markdown editing.</p>
                                </li>
                                <li>
                                    <p>Contains a modular library to load the necessary functionality on demand.</p>
                                </li>
                                <li>
                                    <p>Provides a fully customizable toolbar.</p>
                                </li>
                                <li>
                                    <p>Provides HTML view to edit the source directly for developers.</p>
                                </li>
                                <li>
                                    <p>Supports third-party library integration.</p>
                                </li>
                                <li>
                                    <p>Allows preview of modified content before saving it.</p>
                                </li>
                                <li>
                                    <p>Handles images, hyperlinks, video, hyperlinks, uploads, etc.</p>
                                </li>
                                <li>
                                    <p>Contains undo/redo manager.</p>
                                </li>
                                <li>
                                    <p>Creates bulleted and numbered lists.</p>
                                </li>
                            </ul>
                            <Inject services={[HtmlEditor, Toolbar, Link, Table, Image, QuickToolbar]} />
                        </RichTextEditorComponent>
                    </div>
                </div>
                <div className='col-lg-4 property-section' id="rteEventProperty">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Event Trace" className='property-panel-table rte-event-panel'>
                            <tbody><tr>
                                <td>
                                    <div className="eventarea" style={{ height: '245px', overflow: 'auto' }}>
                                        <span className="EventLog" ref={this.EventLogRef} id="EventLog" style={{ wordBreak: 'normal' }}></span>
                                    </div>
                                </td>
                            </tr>
                                <tr>
                                    <td>
                                        <div className="evtbtn" style={{ paddingBottom: '10px' }}>
                                            <ButtonComponent id="clear" ref={(btn) => { this.clear = btn }} onClick={this.ClearClick.bind(this)} >Clear</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the events that trigger on every action of the rich text editor. The event details are showcased in the event trace panel.</p>
                </div>

                <div id="description">
                    <p>The rich text editor triggers the events based on its actions.
                The events can be used as an extension point to perform custom operations.</p>
                    <ul>
                        <li><code>change</code> - Triggers when the editor gets blurred and changes are made to the content.</li>
                        <li><code>focus</code> - Triggers when the editor is in focus.</li>
                        <li><code>blur</code> - Triggers when focused out of the editor.</li>
                        <li><code>actionBegin</code> - Triggers before the execution of command.</li>
                        <li><code>actionComplete</code> - Triggers after the execution of command.</li>
                        <li><code>created</code> - Triggers when the component is created.</li>
                        <li><code>beforeDialogOpen</code> – Event triggers when the dialog is being opened..</li>
                        <li><code>dialogOpen</code> – Event triggers when a dialog is opened.</li>
                        <li><code>dialogClose</code> – Event triggers after the dialog has been closed.</li>
                        <li><code>beforeQuickToolbarOpen</code> – Event triggers when the quick toolbar is being opened.</li>
                        <li><code>quickToolbarOpen</code> – Event triggers when a quick toolbar is opened.</li>
                        <li><code>quickToolbarClose</code> – Event triggers after the quick toolbar has been closed.</li>
                        <li><code>imageSelected</code> – Event triggers when the image is selected or dragged into the insert image dialog</li>
                        <li><code>imageUploading</code> – Event triggers when the selected image begins to upload in the insert image dialog</li>
                        <li><code>imageUploadSuccess</code> – Event triggers when the image is successfully uploaded to the server side</li>
                        <li><code>imageUploadFailed</code> – Event triggers when there is an error in the image upload</li>
                        <li><code>imageRemoving</code> – Event triggers when the selected image is cleared from the insert image dialog</li>
                        <li><code>destroyed</code> – Triggers when the component is destroyed.</li>
                        <li><code>beforeSanitizeHtml</code> – Event triggers before sanitize the value. It's only applicable to editorMode as `HTML`</li>
                        <li><code>resizing</code> – Triggers only when resizing the image</li>
                        <li><code>resizeStart</code> –Triggers only when start resize the image</li>
                        <li><code>resizeStop</code> – Triggers only when stop resize the image</li>
                    </ul>
                    <p><b>Injecting Module</b></p>
                    <p>RichTextEditor component features are segregated into individual feature-wise modules. To use richtexteditor feature, we need to inject <code>Toolbar, Link, Image, HtmlEditor, QuickToolbar</code> modules into the services.</p>
                </div>
            </div>
        );
    }
}
