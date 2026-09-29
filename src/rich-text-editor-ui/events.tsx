import * as React from 'react';
import { ToolbarItemClickedEventArgs } from '@syncfusion/ej2-richtexteditor-ui/src/richtexteditor-ui/model/toolbar-settings';
import './events.css';
import {
    RichTextEditorUIComponent,
    Inject,
    SlashCommand,
    BeforeDialogCloseEventArgs,
    BeforeDialogOpenEventArgs,
    BeforeFileDropEventArgs,
    BeforeFileUploadEventArgs,
    BlurEventArgs,
    ChangeEventArgs,
    FocusEventArgs,
    SlashCommandItemSelectArgs
} from '@syncfusion/ej2-react-richtexteditor-ui';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

interface ActionBeginEventArgs {
    action?: string;
    cancel?: boolean;
    [key: string]: unknown;
}

interface ActionCompleteEventArgs {
    action?: string;
    [key: string]: unknown;
}

export class Events extends SampleBase<{}, {}> {
    private rteObj: RichTextEditorUIComponent | null = null;

    private setRteObj = (obj: RichTextEditorUIComponent | null): void => {
        this.rteObj = obj;
    };

    private appendElement = (html: string): void => {
        if (typeof document === 'undefined') { return; }
        const log = document.getElementById('EventLog');
        if (!log) { return; }
        const span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        log.insertBefore(span, log.firstChild);
    };

    private onCreated = (): void => {
        this.appendElement('Rich Text Editor UI <b>create</b> event called<hr>');
    };
    private onDestroyed = (): void => {
        this.appendElement('Rich Text Editor UI <b>destroyed</b> event called<hr>');
    };
    private onFocus = (_args: FocusEventArgs): void => {
        this.appendElement('Rich Text Editor UI <b>focus</b> event called<hr>');
    };
    private onBlur = (_args: BlurEventArgs): void => {
        this.appendElement('Rich Text Editor UI <b>blur</b> event called<hr>');
    };
    private onActionBegin = (args: ActionBeginEventArgs): void => {
        this.appendElement('<b>' + (args.action || '') + '</b> action is called<hr>');
    };
    private onActionComplete = (args: ActionCompleteEventArgs): void => {
        this.appendElement('<b>' + (args.action || '') + '</b> action is completed<hr>');
    };
    private onChange = (_args: ChangeEventArgs): void => {
        this.appendElement('Rich Text Editor UI <b>change</b> event called<hr>');
    };
    private onItemClick = (args: ToolbarItemClickedEventArgs): void => {
        this.appendElement('Rich Text Editor UI <b>toolbar click</b> event called (itemId: ' + (args.item?.id || '') + ')<hr>');
    };
    private onBeforeDialogOpen = (_args: BeforeDialogOpenEventArgs): void => {
        this.appendElement('Rich Text Editor UI <b>beforeDialogOpen</b> event called <hr>');
    };
    private onBeforeDialogClose = (_args: BeforeDialogCloseEventArgs): void => {
        this.appendElement('Rich Text Editor UI <b>beforeDialogClose</b> event called <hr>');
    };
    private onBeforeFileUpload = (_args: BeforeFileUploadEventArgs): void => {
        this.appendElement('Rich Text Editor UI <b>beforeFileUpload</b> event called<hr>');
    };
    private onBeforeFileDrop = (_args: BeforeFileDropEventArgs): void => {
        this.appendElement('Rich Text Editor UI <b>beforeFileDrop</b> event called<hr>');
    };
    private onSlashCommandItemSelect = (_args: SlashCommandItemSelectArgs): void => {
        this.appendElement('Rich Text Editor UI <b>slashCommanditemSelect</b> event called<hr>');
    };

    private onClearClick = (): void => {
        const log = document.getElementById('EventLog');
        if (log) { log.innerHTML = ''; }
    };

    render() {
        return (
            <div className="control-pane">
                <div className="control-section">
                    <div className="col-lg-9">
                        <RichTextEditorUIComponent
                            id="defaultRTE"
                            ref={this.setRteObj}
                            toolbarSettings={{
                                items: [
                                    'Bold', 'Italic', 'Underline', '|',
                                    'FontColor', 'BackgroundColor', '|',
                                    'FontName', 'FontSize', '|',
                                    'Table', 'Image', 'Link', '|',
                                    'Formats', 'Alignment',
                                    'NumberFormatList', 'BulletFormatList', '|',
                                    'Undo', 'Redo'
                                ],
                                itemClicked: this.onItemClick as any
                            }}
                            slashCommandSettings={{ enable: true, itemSelect: this.onSlashCommandItemSelect as any }}
                            created={this.onCreated}
                            destroyed={this.onDestroyed}
                            focus={this.onFocus}
                            blur={this.onBlur}
                            actionBegin={this.onActionBegin as any}
                            actionComplete={this.onActionComplete as any}
                            change={this.onChange}
                            beforeDialogOpen={this.onBeforeDialogOpen}
                            beforeDialogClose={this.onBeforeDialogClose}
                            beforeFileUpload={this.onBeforeFileUpload}
                            beforeFileDrop={this.onBeforeFileDrop}
                        >
                            <Inject services={[SlashCommand]} />
                        </RichTextEditorUIComponent>
                    </div>
                </div>

                <div className="col-lg-3 property-section">
                    <PropertyPane title="Event Trace">
                        <table
                            id="property"
                            title="Event Trace"
                            style={{
                                width: '100%',
                                margin: '10px'
                            }}
                        >
                            <tbody>
                                <tr>
                                    <td>
                                        <div
                                            className="eventarea"
                                            style={{
                                                height: '245px',
                                                overflow: 'auto'
                                            }}
                                        >
                                            <span
                                                className="EventLog"
                                                id="EventLog"
                                                style={{
                                                    wordBreak: 'normal'
                                                }}
                                            ></span>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="evtbtn">
                                            <ButtonComponent
                                                id="clear"
                                                cssClass="e-primary"
                                                onClick={this.onClearClick}
                                            >
                                                Clear
                                            </ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the events that trigger on every action of the Rich Text Editor. The event details are
                        showcased in the event trace panel.
                    </p>
                </div>
                <div id="description">
                    <p>The Rich Text Editor triggers the events based on its actions.
                        The events can be used as an extension point to perform custom operations.</p>
                    <ul>
                        <li><code>change</code> - Triggers when the editor gets blurred and changes are made to the content.</li>
                        <li><code>focus</code> - Triggers when the editor is in focus.</li>
                        <li><code>blur</code> - Triggers when focused out of the editor.</li>
                        <li><code>actionBegin</code> - Triggers before the execution of command.</li>
                        <li><code>actionComplete</code> - Triggers after the execution of command.</li>
                        <li><code>created</code> - Triggers when the control is created.</li>
                        <li><code>beforeDialogOpen</code> &ndash; Event triggers when the dialog is being opened..</li>
                        <li><code>dialogOpen</code> &ndash; Event triggers when a dialog is opened.</li>
                        <li><code>dialogClose</code> &ndash; Event triggers after the dialog has been closed.</li>
                        <li><code>beforeQuickToolbarOpen</code> &ndash; Event triggers when the quick toolbar is being opened.</li>
                        <li><code>quickToolbarOpen</code> &ndash; Event triggers when a quick toolbar is opened.</li>
                        <li><code>quickToolbarClose</code> &ndash; Event triggers after the quick toolbar has been closed.</li>
                        <li><code>imageSelected</code> &ndash; Event triggers when the image is selected or dragged into the insert image
                            dialog</li>
                        <li><code>imageUploading</code> &ndash; Event triggers when the selected image begins to upload in the insert image
                            dialog</li>
                        <li><code>imageUploadSuccess</code> &ndash; Event triggers when the image is successfully uploaded to the server side
                        </li>
                        <li><code>imageUploadFailed</code> &ndash; Event triggers when there is an error in the image upload</li>
                        <li><code>imageRemoving</code> &ndash; Event triggers when the selected image is cleared from the insert image dialog
                        </li>
                        <li><code>destroyed</code> &ndash; Triggers when the control is destroyed.</li>
                        <li><code>beforeSanitizeHtml</code> &ndash; Event triggers before sanitize the value. It's only applicable to
                            editorMode as `HTML`</li>
                        <li><code>resizing</code> &ndash; Triggers only when resizing the image</li>
                        <li><code>resizeStart</code> &ndash;Triggers only when start resize the image</li>
                        <li><code>resizeStop</code> &ndash; Triggers only when stop resize the image</li>
                        <li><code>selectionChanged</code> &ndash; Triggers only when the selection within the editor is modified.</li>
                    </ul>
                    <p><b>Injecting Module</b></p>
                    <p>The above features built as modules have to be included in your application. For example, to use image and link,
                        inject the specific module using
                        <code>RichTextEditor.Inject (Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, EmojiPicker, PasteCleanup, Audio ,Video, FormatPainter, FileManager)</code>.
                    </p>
                </div>
            </div>
        );
    }
}
